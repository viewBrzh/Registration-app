import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import apiUrl from "../api/apiConfig";
import ModalInterest from "../components/modalInterest";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [courses, setCourses] = useState([]);
  const [hasCompletedBasic, setHasCompletedBasic] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const currentYearBE = new Date().getFullYear() + 543;
    if (userData != null) {
      fetch(`${apiUrl}/enroll/getUserHistory/${userData.user_id}`)
        .then((response) => response.json())
        .then((data) => {
          const hasCompleted = data.courses?.some(
            (enrollment) =>
              enrollment.course_id === 1 && enrollment.status === 1
          );
          setHasCompletedBasic(hasCompleted);

          if (!hasCompleted) {
            // If user has not completed a basic course, fetch only basic courses
            fetch(`${apiUrl}/course/courseByYear/${currentYearBE}`)
              .then((response) => response.json())
              .then((data) => {
                const coursesData = data?.filter(
                  (course) => course.course_id === 1 && course.isPublish === 1
                );
                setCourses(coursesData);
              })
              .catch((error) => console.error("Error fetching data:", error));
          } else {
            // If user has completed a basic course, fetch all courses
            fetch(`${apiUrl}/course/courseByYear/${currentYearBE}`)
              .then((response) => response.json())
              .then((data) => {
                setCourses(data);
              })
              .catch((error) => console.error("Error fetching data:", error));
          }
        })
        .catch((error) => console.error("Error fetching user history:", error));
    } else {
      fetch(`${apiUrl}/course/courseByYear/${currentYearBE}`)
        .then((response) => response.json())
        .then((data) => {
          const coursesData = data?.filter(
            (course) => course.course_id === 1 && course.isPublish === 1
          );
          setCourses(coursesData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

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

  const heroCourse = courses.length > 0 ? courses[0] : null;

  return (
    <Main>
      <div className="container-fluid px-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-aos="fade-up"
        >
          <div className="carousel-inner">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-aos="fade-up"
              >
                <img
                  className="w-100"
                  src="/img/hero_bg.jpg"
                  alt="Course Image"
                />
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 text-center">
                        <p className="fs-4 text-white animated zoomIn">
                          Welcome to <strong className="text-dark">WU</strong>
                        </p>
                        <h1
                          className="display-1 text-dark mb-4 animated zoomIn"
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {course.course_detail_name}
                        </h1>
                        <p
                          className="text-white fs-5 animated zoomIn"
                          style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {course.train_detail} <br />
                          {formatDate(
                            course.start_date,
                            course.finish_date
                          )}{" "}
                          <br />
                          {course.train_place}
                        </p>
                        <Link
                          to={`/detail/${course.train_course_id}`}
                          className="btn btn-light rounded-pill py-3 px-5 animated zoomIn"
                        >
                          More info
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <br></br>

      <hr></hr>
      <br></br>
      <div className="container mt-5">
        <div className="row justify-content-center" data-aos="fade-up">
          <div className="col-lg-6 text-center">
            <h2 className="text-dark mb-4">Course Types</h2>
            <div className="row">
              <div className="col-md-6" data-aos="fade-up">
                <Link to={`/course#basic`}>
                  <div
                    className="card mb-4"
                    style={{
                      height: 155,
                      border: "1px solid #e0e0e0",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div className="card-body">
                      <h3 className="card-title" style={{ margin: 5 }}>
                        Basic Counseling
                      </h3>
                      <p className="card-text">
                        Every new teacher in the current year must enroll in the
                        basic course once.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6" data-aos="fade-up">
                <Link to={`/course#retreat`}>
                  <div
                    className="card mb-4"
                    style={{
                      height: 155,
                      border: "1px solid #e0e0e0",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div className="card-body">
                      <h3 className="card-title" style={{ margin: 5 }}>
                        Retreat Course
                      </h3>
                      <p className="card-text">
                        For teachers who have completed the basic course before.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5" data-aos="fade-up">
        <div className="card mb-4">
          <div className="homecard-body">
            <div className="row">
              <div className="col-md-6">
                <h2 className="homecard-title">
                  Center for Learning and Teaching Excellence
                </h2>
                <p className="homecard-text indented">
                  Encourage teachers to follow the guidelines in order to
                  maintain quality control. The standard framework serves as a
                  focus for leadership excellence in teaching (Teaching
                  Excellence), and it may also involve students and the
                  eco-system for teaching and learning. International standards
                  exist, and meeting the Higher Education Qualifications
                  Framework 2022's learning objectives requires ensuring that
                  education meets AUN-QA standards for quality.
                </p>
              </div>
              <div className="col-md-6">
                <img
                  src="img/teaching.jpg"
                  className="homecard-img-top"
                  alt="Explanation"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4" data-aos="fade-up">
          <div
            className="homecard-body"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <img
                  src="img/ranking.jpg"
                  className="homecard-img-top"
                  alt="Student Development Center"
                />
              </div>
              <div className="col-md-6">
                <h2 className="homecard-title">Objective</h2>
                <p className="homecard-text indented">
                  The Center for Teaching and Learning Excellence's operational
                  objectives positioned inside each work's framework Through the
                  work of teaching development Enhancing instructors'
                  effectiveness as teachers is the aim. Work on developing and
                  preparing curricula Supporting the creation of undergraduate
                  curricula is the aim. as well as graduate school, and aid in
                  academic administration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userData && <ModalInterest />}
    </Main>
  );
}

export default Home;
