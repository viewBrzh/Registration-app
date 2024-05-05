import React, { useState, useEffect, useRef } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import apiUrl from "../api/apiConfig";

function Course(props) {
  const [courses, setCourses] = useState([]);
  const [basicCourses, setBasicCourses] = useState([]);
  const [retreatCourses, setRetreatCourses] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const searchWrapperRef = useRef(null);

  const toggleSearch = () => {
    setIsActive((prevState) => !prevState);
    if (!isActive) {
      setSearchQuery("");
    }
    console.log(basicCourses)
  };

  const handleInputChange = (evt) => {
    setSearchQuery(evt.target.value);
    // Implement your search logic here
  };

  const handleClickOutside = (evt) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(evt.target)
    ) {
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
    fetch(`${apiUrl}/course/get-all`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setBasicCourses(
          data?.filter(
            (course) => course.course_id === 1 && course.isPublish === 1
          )
        );
        setRetreatCourses(
          data?.filter(
            (course) => course.course_id === 2 && course.isPublish === 1
          )
        );
      });
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
        return `${formatBEYear(new Date(start_date))} - ${formatBEYear(new Date(finish_date))}`;
    }
};



  const filteredBasicCourses = basicCourses.filter((course) =>
    course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRetreatCourses = retreatCourses.filter((course) =>
    course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Main>
      {/* Hero Section */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn hero-section"
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
              <li className="breadcrumb-item text-dark" aria-current="page" style={{ fontWeight: 'bold'}}>
                Courses
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div id="basic" className="container section">
        <br></br>
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Basic Counseling</h2>
        </div>
        <div className="row justify-content-center section">
          {filteredBasicCourses?.map((course) => (
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
                    <h5>
                      <Link to={`/detail/${course.train_course_id}`}>
                        {course.course_detail_name.length > 63
                          ? `${course.course_detail_name.substring(0, 63)}...`
                          : course.course_detail_name}
                      </Link>
                    </h5>
                    <p>{course.train_detail}</p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="date" style={{ color: "blue" }}>
                        <span>
                          {formatDate(course.start_date, course.finish_date)}
                        </span>
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
          ))}
        </div>
      </div>
      {/* Basic Courses Section End */}
      <hr></hr>
      <br></br>
      {/* Retreat Courses Section */}
      <div id="retreat" className="container section">
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Retreat Courses</h2>
        </div>
        <div className="row justify-content-center section">
          {filteredRetreatCourses?.map((course) => (
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
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  {/* Card content */}
                  <div className="properties__img overlay1">
                    <Link to={`/detail/${course.train_course_id}`}>
                      <img src={`${apiUrl}/images/${course.image}`} alt="" />
                    </Link>
                  </div>
                  <div className="properties__caption">
                    <p>{course.category}</p>
                    <h5>
                      <Link to={`/detail/${course.train_course_id}`}>
                        {course.course_detail_name.length > 63
                          ? `${course.course_detail_name.substring(0, 63)}...`
                          : course.course_detail_name}
                      </Link>
                    </h5>
                    <p style={{ padding: 5 }}>{course.train_detail}</p>
                    <div className="properties__footer d-flex justify-content-between align-items-center">
                      <div className="date" style={{ color: "blue" }}>
                        <span>
                          {formatDate(course.start_date, course.finish_date)}
                        </span>
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
          ))}
        </div>
      </div>
      {/* Retreat Courses Section End */}

      <a>
        <div
          ref={searchWrapperRef}
          className={`search-wrapper ${isActive ? "active" : ""}`}
        >
          <div className="input-holder">
            <input
              type="text"
              className="search-input"
              placeholder="Type to search"
              value={searchQuery}
              onChange={handleInputChange}
              autoFocus={isActive}
            />
            <button className="search-icon" onClick={toggleSearch}>
              <span></span>
            </button>
          </div>
          <span className="close" onClick={toggleSearch}></span>
        </div>
      </a>
    </Main>
  );
}
export default Course;
