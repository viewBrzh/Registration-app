import Main from "../layouts/main";
import React, { useState, useEffect } from "react";
import apiUrl from "../api/apiConfig";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Notification(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [notiCourse, setNotiCourse] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(null);
  const [enroll_id, setEnroll_id] = useState(null);

  const navigate = useNavigate();

  const noti = JSON.parse(localStorage.getItem("noti"));

  const handleReview = (courseId, coursename, enroll_id) => {
    setModalName(coursename);
    setCourseId(courseId);
    setEnroll_id(enroll_id);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${apiUrl}/feedback/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
          date: new Date().toISOString().slice(0, 10), // Format the current date as YYYY-MM-DD
          enroll_id: enroll_id,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add feedback");
      }
      setShowModal(false); // Close the modal after successful submission
      setComment("");
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const cancel = () => {
    setShowModal(false);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const formatDate = (date) => {
    const thaiYear = (new Date(date).getFullYear() + 543).toString();
    return new Date(date)
      .toLocaleDateString("en-GB")
      .replace(new Date(date).getFullYear(), thaiYear);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const courses = [];
      for (const key in noti) {
        const data = noti[key];
        if (Array.isArray(data)) {
          courses.push(...data);
        } else {
          courses.push(data);
        }
      }
      setNotiCourse(courses);
    };
    fetchData();
  }, [noti]);

  return (
    <Main>
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
        data-aos="fade-up"
      />

      <div className="card-container-notification" data-aos="fade-up">
        <h4>
          Notification{" "}
          <span style={{ color: "gray" }}>({notiCourse.length})</span>
        </h4>
        <br />
        {notiCourse.map((course, index) => (
          <div className="card-notification" key={index} data-aos="fade-up">
            <div className="card-body-notification">
              <div className="row">
                <div
                  className="col-10"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/detail/${course.train_course_id}`)}
                >
                  <h5 className="card-title">
                    {course.start_date
                      ? "Reminder!"
                      : "Training Course Completion"}
                  </h5>
                  <p className="card-text">
                    {course.start_date
                      ? `You have enrolled in the course titled "${
                          course.course_detail_name
                        }", scheduled to start on ${formatDate(
                          course.start_date
                        )}, at the "${
                          course.train_place
                        }" venue. Don't forget to prepare for this upcoming session. We look forward to your participation!`
                      : `Congratulations! You have completed the training course "${course.course_detail_name}". Please give us a rating.`}
                  </p>
                  <span className="card-date">
                    {course.finish_date
                      ? formatDate(course.finish_date)
                      : `${formatDate(course.start_date)} at "${
                          course.train_place
                        }" venue.`}
                  </span>
                </div>
                <div className="col-2 justify-content-end d-flex">
                  {course.start_date ? null : (
                    <button
                      className="btn btn-primary review"
                      onClick={() =>
                        handleReview(
                          course.train_course_id,
                          course.course_detail_name,
                          course.enroll_id
                        )
                      }
                    >
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
            data-aos="fade-up"
          >
            <h3 style={{ margin: "0 auto" }}>Course review</h3>
            <p style={{ margin: "0 auto" }}>{modalName}</p>
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
              <label>Comment</label>
              <textarea
                id="position"
                className="input-field"
                style={{ height: 200 }}
                rows={4}
                value={comment}
                onChange={handleCommentChange}
              />
            </form>
            <button className="btn btn-cancel" onClick={() => cancel()}>
              Cancel
            </button>
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
