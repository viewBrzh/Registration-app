import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useParams, useNavigate } from "react-router-dom";
import apiUrl from "../api/apiConfig";

function Detail(props) {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  const userData = localStorage.getItem("userData");
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/course/get-data/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data[0]);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const handleConfirm = () => {
    setSuccess(false);
    navigate("/course", { replace: true });
    window.location.reload();
  };

  const handleFConfirm = () => {
    setFailed(false);
  };

  const handleEnroll = () => {
    // Check if user data exists
    if (!userData) {
      console.error("User data not found in local storage");
      return;
    }

    // Parse user data to get user ID
    const userId = JSON.parse(userData).user_id;

    // Create request body
    const body = {
      userId: userId,
    };

    // Send POST request to enroll user in course
    fetch(`${apiUrl}/enroll/create/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
        } else {
          return response.json().then((data) => {
            setMessage(data.message);
            setFailed(true);
          });
        }
      })
      .then((data) => {
        console.log("Enrollment successful:", data);
        // Handle enrollment success, such as showing a success message
      })
      .catch((error) => {
        console.error("Error enrolling user:", error);
        // Handle enrollment error, such as showing an error message
      });
  };

  return (
    <Main>
      <div className="detail-container-wrapper" >
        <div className="detail-container">
          <div className="left-column">
            <img
              src={`${apiUrl}/images/${course.image}`}
              alt="Course Image"
              className="active left-column"
            />
          </div>
          <div className="right-column">
            <h1>{course.course_detail_name}</h1>
            <div className="product-description">
              <span>Description</span>
              <p>{course.train_detail}</p>
              <span>Place : {course.train_place}</span>
            </div>
            <div className="cable-config">
              <span>Skills </span>
              <div className="cable-choose">
                {course.skills.split(", ").map((skill, index) => (
                  <button key={index}>{skill}</button>
                ))}
              </div>
              <span>
                Date: {new Date(course.start_date).toLocaleDateString("en-GB")}{" "}
                to {new Date(course.finish_date).toLocaleDateString("en-GB")}
              </span>
            </div>
            <button className="cart-btn" onClick={handleEnroll}>
              Enroll
            </button>
          </div>
        </div>
      </div>
      <br/>

      <hr style={{ margin: "10px" }} />
      <br/>
      <div id="basic" className="container section">
        <br />
        <div className="row mb-4">
          <h2>Comparable courses</h2>
        </div>
        <div className="row justify-content-center section">
          <div className="col-lg-3" key={course.train_course_id}>
            <div
              className="properties properties2 mb-30 center-div"
              style={{
                height: "auto",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <div
                className="properties__card"
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Card content */}
                <div className="properties__img overlay1">
                  <Link to={`/detail/${course.train_course_id}`}>
                    <img src={`${apiUrl}/images/${course.image}`} alt="" />
                  </Link>
                  {/* Add bookmark button here */}
                </div>
                <div className="properties__caption">
                  <p>{course.category}</p>
                  <h3>
                    <Link to={`/detail/${course.train_course_id}`}>
                      {course.course_detail_name.length > 63
                        ? `${course.course_detail_name.substring(0, 63)}...`
                        : course.course_detail_name}
                    </Link>
                  </h3>
                  <p>{course.train_detail}</p>
                  <div className="properties__footer d-flex justify-content-between align-items-center">
                    <div className="date" style={{ color: "blue" }}>
                      <span>{(course.start_date, course.finish_date)}</span>
                    </div>
                    <div className="location">
                      <span>
                        {course.train_place.length > 20
                          ? `${course.train_place.substring(0, 20)}...`
                          : course.train_place}
                      </span>
                    </div>
                  </div>
                  <Link to={`/detail/${course.train_course_id}`}>
                    <a href="#" className="btn card-btn">
                      More Detail
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3" key={course.train_course_id}>
            <div
              className="properties properties2 mb-30 center-div"
              style={{
                height: "auto",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <div
                className="properties__card"
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Card content */}
                <div className="properties__img overlay1">
                  <Link to={`/detail/${course.train_course_id}`}>
                    <img src={`${apiUrl}/images/${course.image}`} alt="" />
                  </Link>
                  {/* Add bookmark button here */}
                </div>
                <div className="properties__caption">
                  <p>{course.category}</p>
                  <h3>
                    <Link to={`/detail/${course.train_course_id}`}>
                      {course.course_detail_name.length > 63
                        ? `${course.course_detail_name.substring(0, 63)}...`
                        : course.course_detail_name}
                    </Link>
                  </h3>
                  <p>{course.train_detail}</p>
                  <div className="properties__footer d-flex justify-content-between align-items-center">
                    <div className="date" style={{ color: "blue" }}>
                      <span>{(course.start_date, course.finish_date)}</span>
                    </div>
                    <div className="location">
                      <span>
                        {course.train_place.length > 20
                          ? `${course.train_place.substring(0, 20)}...`
                          : course.train_place}
                      </span>
                    </div>
                  </div>
                  <Link to={`/detail/${course.train_course_id}`}>
                    <a href="#" className="btn card-btn">
                      More Detail
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3" key={course.train_course_id}>
            <div
              className="properties properties2 mb-30 center-div"
              style={{
                height: "auto",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <div
                className="properties__card"
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Card content */}
                <div className="properties__img overlay1">
                  <Link to={`/detail/${course.train_course_id}`}>
                    <img src={`${apiUrl}/images/${course.image}`} alt="" />
                  </Link>
                  {/* Add bookmark button here */}
                </div>
                <div className="properties__caption">
                  <p>{course.category}</p>
                  <h3>
                    <Link to={`/detail/${course.train_course_id}`}>
                      {course.course_detail_name.length > 63
                        ? `${course.course_detail_name.substring(0, 63)}...`
                        : course.course_detail_name}
                    </Link>
                  </h3>
                  <p>{course.train_detail}</p>
                  <div className="properties__footer d-flex justify-content-between align-items-center">
                    <div className="date" style={{ color: "blue" }}>
                      <span>{(course.start_date, course.finish_date)}</span>
                    </div>
                    <div className="location">
                      <span>
                        {course.train_place.length > 20
                          ? `${course.train_place.substring(0, 20)}...`
                          : course.train_place}
                      </span>
                    </div>
                  </div>
                  <Link to={`/detail/${course.train_course_id}`}>
                    <a href="#" className="btn card-btn">
                      More Detail
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3" key={course.train_course_id}>
            <div
              className="properties properties2 mb-30 center-div"
              style={{
                height: "auto",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              <div
                className="properties__card"
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Card content */}
                <div className="properties__img overlay1">
                  <Link to={`/detail/${course.train_course_id}`}>
                    <img src={`${apiUrl}/images/${course.image}`} alt="" />
                  </Link>
                  {/* Add bookmark button here */}
                </div>
                <div className="properties__caption">
                  <p>{course.category}</p>
                  <h3>
                    <Link to={`/detail/${course.train_course_id}`}>
                      {course.course_detail_name.length > 63
                        ? `${course.course_detail_name.substring(0, 63)}...`
                        : course.course_detail_name}
                    </Link>
                  </h3>
                  <p>{course.train_detail}</p>
                  <div className="properties__footer d-flex justify-content-between align-items-center">
                    <div className="date" style={{ color: "blue" }}>
                      <span>{(course.start_date, course.finish_date)}</span>
                    </div>
                    <div className="location">
                      <span>
                        {course.train_place.length > 20
                          ? `${course.train_place.substring(0, 20)}...`
                          : course.train_place}
                      </span>
                    </div>
                  </div>
                  <Link to={`/detail/${course.train_course_id}`}>
                    <a href="#" className="btn card-btn">
                      More Detail
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {success && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "300px",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <h3>Enrollment successfully</h3>
            <hr />
            <p>Course: {course.course_detail_name}</p>
            <p>Date: {course.start_date}</p>
            <p>Place: {course.train_place}</p>
            <button className="btn btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {failed && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "300px",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <h3>Enrollment failed</h3>
            <hr />
            <p>{message}</p>
            <button className="btn btn-primary" onClick={handleFConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </Main>
  );
}

export default Detail;
