import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Course(props) {
  const [courses, setCourses] = useState([]);
  const [basicCourses, setBasicCourses] = useState([]);
  const [retreatCourses, setRetreatCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:11230/course")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setBasicCourses(data.filter((course) => course.course_id === 1));
        setRetreatCourses(data.filter((course) => course.course_id === 2));
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBasicCourses = basicCourses.filter((course) =>
    course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRetreatCourses = retreatCourses.filter((course) =>
    course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="row justify-content-end">
          <div className="col-lg-6">
            {/* Search */}
            <div className="fixed-search">
              <div className="-center">
                <div className="-search">
                  <div className="-search-box">
                    <input
                      type="search"
                      id="gsearch"
                      name="gsearch"
                      className="-search-input"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <button type="submit" className="-btn-search">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Search End */}
          </div>
        </div>
        <br></br>
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Basic Counseling</h2>
        </div>
        <div className="row">
          {filteredBasicCourses.map((course) => (
            <div className="col-lg-4" key={course.train_course_id}>
              <div className="properties properties2 mb-30" style={{ height: "570px", marginBottom: "20px", position: "relative" }}>
                <div className="properties__card" style={{ border: "1px solid #e0e0e0", borderRadius: "5px", overflow: "hidden" }}>
                  {/* Card content */}
                  <div className="properties__img overlay1">
                    <Link to={`/detail/${course.train_course_id}`}>
                      <img src="/img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>{course.category}</p>
                    <h3>
                      <Link to={`/detail/${course.train_course_id}`}>
                        {course.course_detail_name.length > 50
                            ? `${course.course_detail_name.substring(0, 50)}...`
                            : course.course_detail_name}
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
                    <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
                      <Link to={`/detail/${course.train_course_id}`}>
                        <a className="border-btn border-btn2" style={{ color: "#E60073" }}>
                          Enroll
                        </a>
                      </Link>
                    </div>
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
          {filteredRetreatCourses.map((course) => (
            <div className="col-lg-4" key={course.train_course_id}>
              <div className="properties properties2 mb-30" style={{ height: "570px", marginBottom: "20px", position: "relative" }}>
                <div className="properties__card" style={{ border: "1px solid #e0e0e0", borderRadius: "5px", overflow: "hidden" }}>
                  {/* Card content */}
                  <div className="properties__img overlay1">
                    <Link to={`/detail/${course.train_course_id}`}>
                      <img src="/img/ranking.jpg" alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>{course.category}</p>
                    <h3>
                      <Link to={`/detail/${course.train_course_id}`}>
                        {course.course_detail_name.length > 50
                            ? `${course.course_detail_name.substring(0, 50)}...`
                            : course.course_detail_name}
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
                    <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}>
                      <Link to={`/detail/${course.train_course_id}`}>
                        <a className="border-btn border-btn2" style={{ color: "#E60073" }}>
                          Enroll
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Retreat Courses Section End */}
    </Main >
  );
}
export default Course;
