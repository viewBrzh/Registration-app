import Main from "../layouts/main";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import apiUrl from "../api/apiConfig";
import RatingStar from "../components/ratingStar";

function Notification(props) {
  const storedUserData = localStorage.getItem("userData");
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState(null);
  const [modalName, setModalName] = useState(null);
  const [courseId, setCourseId] = useState(null);

  const handleReview = (courseId, coursename) => {
    setModalName(coursename);
    setCourseId(courseId);
    // Handle confirmation logic here
    setShowModal(true); // Close the modal
  }
  const handleConfirm = () => {
    // Handle confirmation logic here
    setShowModal(false); // Close the modal
  };

  let userData = null;
  try {
    userData = JSON.parse(storedUserData);
  } catch (error) {
    console.error("Failed to parse user data from localStorage");
  }
  const [userDatas, setUserDatas] = useState(
    userData || {
      username: "",
      email: "",
      phone: "",
      image: "",
    }
  );

  useEffect(() => {
    fetch(`${apiUrl}/enroll/getUserHistory/${userDatas.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses); // Update state with courses data
      });
  }, [userDatas.user_id]);



  return (
    <Main>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">Notification</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">Home</Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page" style={{ fontWeight: "bold" }}>
                Notification
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="card-container-notification">
        {/* Card Body */}
        {courses?.map((course) => (
          <div className="card-notification">
            <div className="card-body-notification">
              <div className="row">
                <div className="col"><h5 className="card-title">Training Course Completion</h5>
                  <p className="card-text">Congratulations! You have completed the training course "{course.course_detail_name}"</p>
                </div>
                <div className="col justify-content-end d-flex">
                  <button className="btn btn-primary" style={{ margin: 20 }} onClick={() => handleReview(course.train_course_id, course.course_detail_name)}>Review</button>
                </div>
              </div>
            </div>
          </div>
        ))
        }
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
              width: "600px",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <h3 style={{ margin: '0 auto' }}>Course review</h3>
            <p style={{ margin: '0 auto' }}>{modalName}</p>
            <form>
              <RatingStar></RatingStar>
              <label>
                Comment
              </label>
              <textarea
                id="position"
                className="input-field"
                style={{ height: 200 }}
                rows={4} // กำหนดจำนวนบรรทัดที่ต้องการให้เป็น input หลายบรรทัด
              />
            </form>
            <button className="btn btn-primary justify-self-end" onClick={handleConfirm}>
              Send
            </button>
          </div>
        </div>
      )}
    </Main>
  );
}

export default Notification;
