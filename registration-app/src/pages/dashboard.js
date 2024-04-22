import React, { useState, useEffect, useRef } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Dashboard(props) {
  const [courses, setCourses] = useState([]);
  const [basicCourses, setBasicCourses] = useState([]);
  const [retreatCourses, setRetreatCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const searchWrapperRef = useRef(null);
  const [filteredBasicCourses, setFilteredBasicCourses] = useState([]);
  const [filteredRetreatCourses, setFilteredRetreatCourses] = useState([]);

  const toggleSearch = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleInputChange = (evt) => {
    setSearchQuery(evt.target.value);
    // Implement your search logic here
  };

  const handleClickOutside = (evt) => {
    if (searchWrapperRef.current && !searchWrapperRef.current.contains(evt.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:11230/course/get-all")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setBasicCourses(data.filter((course) => course.course_id === 1 && course.isPublish === 1));
        setRetreatCourses(data.filter((course) => course.course_id === 2 && course.isPublish === 1));
      });
  }, []);

  useEffect(() => {
    setFilteredBasicCourses(
      basicCourses.filter((course) =>
        course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredRetreatCourses(
      retreatCourses.filter((course) =>
        course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, basicCourses, retreatCourses]);

  return (
    <Main>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">Dashboard</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}


      {/* Recommend Course Start */}
      <div id="basic" className="container section">
        <br></br>
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Recommend Course</h2>
        </div>
        <div className="row">
          {filteredBasicCourses.slice(0, 3).map((course) => (
            <div className="col-lg-4" key={course.train_course_id}>
              <div
                className="properties properties2 mb-30"
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
                      <img src="/img/ranking.jpg" alt="" />
                    </Link>
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
                      <div className="date">
                        <span>
                          {course.start_date} - {course.finish_date}
                        </span>
                      </div>
                      <div className="location">
                        <span>{course.train_place}</span>
                      </div>
                    </div>
                    <Link to={`/detail/${course.train_course_id}`}>
                      <a href="#" className="border-btn border-btn2">
                        More Detail
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recommend Course End */}

      
      <br></br>
      {/* Courses that are not yet registered start */}
      <div id="basic" className="container section">
        <br></br>
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Courses that are not yet registered</h2>
        </div>
        <div className="row">
          {filteredBasicCourses.map((course) => (
            <div className="col-lg-4" key={course.train_course_id}>
              <div
                className="properties properties2 mb-30"
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
                      <img src="/img/ranking.jpg" alt="" />
                    </Link>
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
                      <div className="date">
                        <span>
                          {course.start_date} - {course.finish_date}
                        </span>
                      </div>
                      <div className="location">
                        <span>{course.train_place}</span>
                      </div>
                    </div>
                    <Link to={`/detail/${course.train_course_id}`}>
                      <a href="#" className="border-btn border-btn2">
                        More Detail
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Courses that are not yet registered End */}
    </Main>
  );
}

export default Dashboard;
