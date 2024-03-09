import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:11230/course")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedCourses = data.sort((a, b) => {
          const dateA = new Date(a.start_date);
          const dateB = new Date(b.start_date);
          return dateA - dateB;
        });
        setCourses(sortedCourses);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const heroCourse = courses.length > 0 ? courses[0] : null;

  return (
    <Main>
      <div className="container-fluid px-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
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
                          {course.start_date} - {course.finish_date} <br />
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

      <br></br>
      <hr></hr>
      <br></br>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <h2 className="text-dark mb-4">Course Types</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Basic Counseling</h3>
                    <p className="card-text">
                      Every new teacher in the current year must enroll in the
                      basic course once.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Retreat Course</h3>
                    <p className="card-text">
                      For teachers who have completed the basic course before.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h2 className="card-title">
                  Center for Learning and Teaching Excellence
                </h2>
                <p className="card-text indented">
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
                  className="card-img-top1"
                  alt="Explanation"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <img
                  src="img/ranking.jpg"
                  className="card-img-top2"
                  alt="Student Development Center"
                />
              </div>
              <div className="col-md-6">
                <h2 className="card-title">Objective</h2>
                <p className="card-text indented">
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
    </Main>
  );
}

export default App;
