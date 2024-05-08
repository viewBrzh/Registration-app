import Main from "../layouts/main";
import React, { useState, useEffect } from "react";
import apiUrl from "../api/apiConfig";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

function Notification(props) {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [notiCourse, setNotiCourse] = useState([]);

  const noti = JSON.parse(localStorage.getItem("noti"));

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);
  const [enroll_id, setEnroll_id] = useState(null);

  const navigate = useNavigate();

  const handleReview = (courseId, coursename, enroll_id) => {
    setModalName(coursename);
    setCourseId(courseId);
    setEnroll_id(enroll_id)
    // Handle confirmation logic here
    setShowModal(true); // Close the modal
  };

  const handleConfirm = async () => {
    console.log(enroll_id);
    // Handle confirmation logic here
    try {
      const response = await fetch(`${apiUrl}/feedback/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
          date: new Date().toISOString().slice(0, 10), // Format the current date as YYYY-MM-DD
          enroll_id: enroll_id
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add feedback');
      }
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
    setShowModal(false); // Close the modal
    setComment('');
  };

  const cancel = () => {
    setShowModal(false);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    const fetchNotiCourseData = async () => {
      try {
        const promises = noti.map((notification) =>
          fetch(`${apiUrl}/course/get-data/${notification.train_course_id}`).then((response) => response.json())
        );
        const coursesData = await Promise.all(promises);

        // Add enroll_id to each course data
        const coursesDataWithEnrollId = coursesData.map((course, index) => {
          return {
            ...course,
            enroll_id: noti[index].enroll_id
          };
        });

        setNotiCourse(coursesDataWithEnrollId);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchNotiCourseData();
  }, [noti]);


  const formatDate = (date) => {
    const thaiYear = (new Date(date).getFullYear() + 543).toString(); // Get the last two digits of the Buddhist Era year
    return new Date(date).toLocaleDateString("en-GB").replace(new Date(date).getFullYear(), thaiYear);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Main>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s" />

      {/* Page Header End */}

      <div className="card-container-notification">
        <h4>Notification <span style={{ color: "gray" }}>({notiCourse.length})</span></h4>
        {/* Card Body */}
        {notiCourse.map((course, index) => (
          <div className="card-notification" key={index}>
            <div className="card-body-notification">
              <div className="row">
                <div className="col-10" style={{ cursor: 'pointer' }} onClick={() => navigate(`/detail/${course[0].train_course_id}`)}>
                  <h5 className="card-title">Training Course Completion</h5>
                  <p className="card-text">Congratulations! You have completed the training course "{course[0].course_detail_name}." Please give us a rating</p>
                  <span className="card-date">{formatDate(course[0].finish_date)}</span>
                </div>
                <div className="col-2 justify-content-end d-flex">
                  <button className="btn btn-primary review" onClick={() => handleReview(course[0].train_course_id, course[0].course_detail_name, course.enroll_id)}>Review</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show modal */}
      {showModal && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-content d-flex"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "600px",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <h3 style={{ margin: '0 auto' }}>Course review</h3>
            <p style={{ margin: '0 auto' }}>{modalName}</p>
            <div className="d-flex justify-content-center">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={54}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>

            <form>
              <label>
                Comment
              </label>
              <textarea
                id="position"
                className="input-field"
                style={{ height: 200 }}
                rows={4}
                value={comment}
                onChange={handleCommentChange}
              />
            </form>
            <button className="btn btn-cancel" onClick={() => cancel()}>Cancel</button>
            <button className="btn btn-primary" onClick={handleConfirm}>
              Send
            </button>
          </div>
        </div>
      )}
    </Main>
  );
}

export default Notification;
