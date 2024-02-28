import React from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:11230/course')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const sortedCourses = data.sort((a, b) => {
          const dateA = new Date(a.start_date);
          const dateB = new Date(b.start_date);
          return dateA - dateB;
        });
        setCourses(sortedCourses);
      })
      .catch(error => console.error('Error fetching data:', error));

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
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img className="w-100" src="/img/hero_bg.jpg" alt="Course Image" />
                <div className="carousel-caption">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 text-center">
                        <p className="fs-4 text-white animated zoomIn">
                          Welcome to <strong className="text-dark">WU</strong>
                        </p>
                        <h1 className="display-1 text-dark mb-4 animated zoomIn">
                        {course.course_detail_name.length > 38 ? `${course.course_detail_name.substring(0, 38)}...` : course.course_detail_name}
                        </h1>
                        <p className="text-white fs-5 animated zoomIn">
                          {course.train_detail}
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
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <h2 className="text-dark mb-4">Course Types</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Basic Course</h3>
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
      {/* Course Types End */}
      <div className="container mt-5">
        <h2 className="text-dark mb-4">Information</h2>
        <div style={{ padding: "5%" }}>
          <div className="d-flex">
            <div style={{ width: "70%" }}>
              <p className="text-dark pr-4 indented">
                The Student Development and Welfare Office, under the
                administration of Walailak University, is responsible for
                providing quality services and welfare to students to prepare
                them for learning and life. This includes accommodation
                assistance, counseling and consultation services, scholarship
                services, care for students with disabilities, accident
                insurance, military service deferment, and military studies. The
                development of student potential focuses on four aspects:
                knowledge, discipline, volunteering, and leadership development.
                Additionally, the office promotes alumni networking and
                cooperation with the alumni association of Walailak University.
                It also encourages physical exercise and sports participation to
                ensure students have good health and a sportsmanlike spirit.
              </p>
            </div>
            <div style={{ width: "30%", marginLeft: "5%" }}>
              <img
                src="img/about-6.jpg"
                className="img-fluid"
                alt="Explanation"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>

        <h2 className="text-dark mb-4 mt-5">Student Development Center</h2>
        <div style={{ padding: "5%" }}>
          <div className="d-flex align-items-start">
            <div style={{ width: "40%" }}>
              <img
                src="img/about-5.jpg"
                className="img-fluid"
                alt="Student Development Center"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div style={{ width: "60%" }}>
              <p className="text-dark pr-4 indented">
                The Student Development and Welfare Office has established
                sub-units to fulfill various missions, one of which is the
                establishment of the Smart Center to drive the student
                development and enhancement system of Walailak University to be
                "smart, good, and happy". The center's main tasks include
                providing counseling by qualified personnel, such as
                psychologists, psychiatric nurses, and psychiatrists, to help
                students who are stressed and anxious understand themselves, set
                goals, and find solutions together. It also promotes the
                development of academic advisors' skills and readiness to
                provide counseling to students under their supervision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default App;
