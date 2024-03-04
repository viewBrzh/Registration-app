import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Course(props) {
  const [courses, setCourses] = useState([]);
  const [basicCourses, setBasicCourses] = useState([]);
  const [retreatCourses, setRetreatCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:11230/course")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setBasicCourses(data.filter((course) => course.course_id === 1));
        setRetreatCourses(data.filter((course) => course.course_id === 2));
      });
  }, []);

  return (
    <Main>
      {/* Basic Courses Section */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Courses
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Courses
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container">
        <br></br>
        {/* serach */}
        <div className="-center">
          <div className="-search">
            <div className="-search-box">
              <input
                type="search"
                id="gsearch"
                name="gsearch"
                className="-search-input"
                placeholder="Search"
              />
            </div>
            <button type="submit" className="-btn-search">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        {/* serach */}
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Basic Counseling</h2>
        </div>
        <div className="row">
          {basicCourses.map((course) => (
            <div className="col-lg-4" key={course.train_course_id}>
              <div
                className="properties properties2 mb-30"
                style={{ height: "570px" }}
              >
                <div className="properties__card">
                  <div className="properties__img overlay1">
<<<<<<< HEAD
                    <Link to={`/profile/${course.train_course_id}`}>
=======
                    <Link to={`/detail/${course.train_course_id}`}>
>>>>>>> view
                      <img src="/img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>{course.category}</p>
                    <h3>
<<<<<<< HEAD
                      <Link to={`/profile/${course.id}`}>
=======
                      <Link to={`/detail/${course.train_course_id}`}>
>>>>>>> view
                        {course.course_detail_name}
                      </Link>
                    </h3>
                    <p>{course.train_detail}</p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="date">
                        <span>
                          {course.start_date} - {course.finish_date}
                        </span>
                      </div>
                      <div className="location">
                        <span>{course.train_place}</span>
                      </div>
                    </div>
<<<<<<< HEAD
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
=======
                    <Link to={`/detail/${course.train_course_id}`}>
                        <a href="#" className="border-btn border-btn2">
                        Find out more
                        </a>
                    </Link>
                    
>>>>>>> view
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Basic Courses Section End */}
      <hr></hr>
      <br></br>
      {/* Retreat Courses Section */}
      <div className="container">
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Retreat Courses</h2>
        </div>
        <div className="row">
          {retreatCourses.map((course) => (
            <div className="col-lg-4" key={course.train_course_id}>
              <div
                className="properties properties2 mb-30"
                style={{ height: "570px" }}
              >
                <div className="properties__card">
                  <div className="properties__img overlay1">
<<<<<<< HEAD
                    <Link to={`/profile/${course.train_course_id}`}>
=======
                    <Link to={`/detail/${course.train_course_id}`}>
>>>>>>> view
                      <img src="/img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>{course.category}</p>
                    <h3>
<<<<<<< HEAD
                      <Link to={`/profile/${course.id}`}>
=======
                      <Link to={`/detail/${course.train_course_id}`}>
>>>>>>> view
                        {course.course_detail_name}
                      </Link>
                    </h3>
                    <p>{course.train_detail}</p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="date">
                        <span>
                          {course.start_date} - {course.finish_date}
                        </span>
                      </div>
                    </div>
<<<<<<< HEAD
                    <a href="#" className="border-btn border-btn2">
                      Find out more
                    </a>
=======
                    <Link to={`/detail/${course.train_course_id}`}>
                        <a href="#" className="border-btn border-btn2">
                        Find out more
                        </a>
                    </Link>
>>>>>>> view
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Retreat Courses Section End */}
    </Main>
  );
}
export default Course;
