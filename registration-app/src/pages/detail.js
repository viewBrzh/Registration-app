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
  const [skills, setSkills] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [loginAlert, setLoginAlert] = useState(false);

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
        setSkills(data[0].skills.split(', ')); // Use data[0] instead of course
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch(`${apiUrl}/course/get-all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Filter courses based on selected skills
        const filteredCourses = data.filter(course =>
          course.skills.split(', ').some(skill => skills.includes(skill)) &&
          course.train_course_id != courseId
        );
        setFilteredCourse(filteredCourses);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [courseId, skills]); // Add skills to the dependencies array

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
      setLoginAlert(true);
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

  const formatDate = (start_date, finish_date) => {
    const toBuddhistEra = (year) => {
      return year + 543;
    };

    const formatBEYear = (date) => {
      const year = toBuddhistEra(date.getFullYear());
      return date.toLocaleDateString("en-GB").replace(date.getFullYear(), year);
    };

    if (start_date === finish_date) {
      return formatBEYear(new Date(start_date));
    } else {
      return `${formatBEYear(new Date(start_date))} - ${formatBEYear(
        new Date(finish_date)
      )}`;
    }
  };

  const handleCardClick = (courseId) => {
    navigate(`/detail/${courseId}`);
  };

  return (
    <Main>
      <div className="detail-container-wrapper">
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
      <br />
      {/* end detail */}

      {/* start Comparable courses */}
      <br />
      <div id="basic" className="container section">
        <br />
        <div className="row mb-4">
          <h2 className="text-center">Similar courses</h2>
        </div>
        <div className="row justify-content-center section">
          {/* Map over the first 4 courses only */}
          {filteredCourse.length > 0 && filteredCourse.slice(0, 4).map((fcourse) => ( fcourse.train_course_id !== course.train_course_id &&
            (<div className="col-lg-3" key={fcourse.train_course_id}>
              <div
                className="properties properties2 mb-30 center-div"
                style={{ marginBottom: "20px", position: "relative" }}
              >
                <div
                  className="properties__card"
                  onClick={() => handleCardClick(fcourse.train_course_id)}
                  style={{
                    height: "440px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  {/* Card content */}
                  <div className="properties__img overlay1">
                    <Link to={`/detail/${fcourse.train_course_id}`}>
                      <img src={`${apiUrl}/images/${fcourse.image}`} alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <h5>
                      <Link to={`/detail/${fcourse.train_course_id}`}>
                        {fcourse.course_detail_name.length > 63
                          ? `${fcourse.course_detail_name.substring(0, 63)}...`
                          : fcourse.course_detail_name}
                      </Link>
                    </h5>
                    <p>{fcourse.train_detail}</p>
                    <div className="properties__skill">
                      <span>
                        {fcourse.skills.length > 50
                          ? `${fcourse.skills.substring(0, 50)}...`
                          : fcourse.skills}
                      </span>
                    </div>

                    <div className="properties__footer">
                      <div className="date" style={{ color: "gray" }}>
                        <span>
                          <p>
                            Enroll{" "}
                            {formatDate(fcourse.start_date, fcourse.finish_date)}
                          </p>
                        </span>
                      </div>
                    </div>

                    <div className="properties__footer">
                      <div className="date" style={{ color: "gray" }}>
                        <p>
                          {" "}
                          Training{" "}
                          {formatDate(fcourse.start_date, fcourse.finish_date)}
                        </p>
                      </div>
                    </div>
                    <div className="location">
                      <span>
                        <p>
                          {fcourse.train_place.length > 50
                            ? `${fcourse.train_place.substring(0, 50)}...`
                            : fcourse.train_place}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          ))}
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

      {loginAlert && (
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
          <p>Please log in before enrolling.</p>
          <br></br>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Login
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
