import React, { useState, useEffect, useRef } from "react";
import Main from "../layouts/main";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "../api/apiConfig";

function Course(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [courses, setCourses] = useState([]);
  const [basicCourses, setBasicCourses] = useState([]);
  const [retreatCourses, setRetreatCourses] = useState([]);
  const navigate = useNavigate();

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

  const [hasCompletedBasic, setHasCompletedBasic] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const currentYearBE = new Date().getFullYear() + 543;
      const response = await fetch(`${apiUrl}/course/courseByYear/${currentYearBE}`); // Fetch courses for the current year in the Buddhist calendar
      const data = await response.json();
      setCourses(data);
      console.log(data)

      const basicCoursesData = data?.filter((course) => course.course_id === 1 && course.isPublish === 1);
      setBasicCourses(basicCoursesData);

      const retreatCoursesData = data?.filter((course) => course.course_id === 2 && course.isPublish === 1);
      setRetreatCourses(retreatCoursesData);

      // Fetch enrollment counts for basic courses
      const basicCounts = await Promise.all(
        basicCoursesData.map(async (course) => {
          const enrollResponse = await fetch(`${apiUrl}/enroll/getEnrollCount/${course.train_course_id}`);
          const enrollData = await enrollResponse.json();
          return { courseId: course.train_course_id, count: enrollData.count };
        })
      );

      // Fetch enrollment counts for retreat courses
      const retreatCounts = await Promise.all(
        retreatCoursesData.map(async (course) => {
          const enrollResponse = await fetch(`${apiUrl}/enroll/getEnrollCount/${course.train_course_id}`);
          const enrollData = await enrollResponse.json();
          return { courseId: course.train_course_id, count: enrollData.count };
        })
      );

      setBasicCourses((prevCourses) =>
        prevCourses.map((course) => {
          const countObj = basicCounts.find((count) => count.courseId === course.train_course_id);
          return { ...course, count: countObj ? countObj.count : 0 };
        })
      );

      setRetreatCourses((prevCourses) =>
        prevCourses.map((course) => {
          const countObj = retreatCounts.find((count) => count.courseId === course.train_course_id);
          return { ...course, count: countObj ? countObj.count : 0 };
        })
      );

      // Check for basic course enrollment status
      fetch(`${apiUrl}/enroll/getUserHistory/${userData.user_id}`)
        .then((response) => response.json())
        .then((data) => {
          setCourses(data.courses);

          // Check if the user has completed at least one basic course
          const hasCompleted = data.courses?.some(
            (enrollment) => enrollment.course_id === 1 && enrollment.status === 1
          );
          setHasCompletedBasic(hasCompleted);
        })
    };

    fetchCourses();
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

  const handleCardClick = (courseId) => {
    navigate(`/detail/${courseId}`);
  }

  return (
    <Main>
      {/* Hero Section */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn hero-section" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">Courses</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">Home</Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page" style={{ fontWeight: 'bold' }}>
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
              <div className="properties properties2 mb-30 center-div" style={{ marginBottom: "20px", position: "relative" }}>
                <div className="properties__card" onClick={() => handleCardClick(course.train_course_id)} style={{ height: "440px", border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                  {/* Card content */}
                  <div className="properties__img overlay1" style={{ position: "relative" }}>
                    <Link to={`/detail/${course.train_course_id}`}>
                      <img src={`${apiUrl}/images/${course.image}`} alt="" />
                    </Link>
                    {/* People icon and number text */}
                    <div className="people-icon">
                      <i className="bi bi-people"></i>
                      <span className="people-count">{course.count} / {course.limit}</span>
                    </div>
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
                    <div className="properties__skill" >
                      <span>{course.skills.length > 50
                        ? `${course.skills.substring(0, 50)}...`
                        : course.skills}</span>
                    </div>

                    <div className="properties__footer">
                      <div className="date" style={{ color: "gray" }}>
                        <span>
                          <p>Enroll {formatDate(course.start_enroll_date, course.end_enroll_date)}</p>
                        </span>
                      </div>
                    </div>

                    <div className="properties__footer">
                      <div className="date" style={{ color: "gray" }}>
                        <p> Training {formatDate(course.start_date, course.finish_date)}</p>
                      </div>
                    </div>
                    <div className="location">
                      <span>
                        <p>
                          {course.train_place.length > 50
                            ? `${course.train_place.substring(0, 50)}...`
                            : course.train_place}</p>
                      </span>
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
      <div id="retreat" className="container section">
        {hasCompletedBasic ? (
          <>
            <div className="row justify-content-center mb-4">
              <h2 className="text-center">Retreat Courses</h2>
            </div>
            <div className="row justify-content-center section">
              {filteredRetreatCourses?.map((course) => (
                <div className="col-lg-3" key={course.train_course_id}>
                  <div className="properties properties2 mb-30 center-div" style={{ marginBottom: "20px", position: "relative" }}>
                    <div className="properties__card" onClick={() => handleCardClick(course.train_course_id)} style={{ height: "440px", border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                      {/* Card content */}
                      <div className="properties__img overlay1" style={{ position: "relative" }}>
                        <Link to={`/detail/${course.train_course_id}`}>
                          <img src={`${apiUrl}/images/${course.image}`} alt="" />
                        </Link>
                        {/* People icon and number text */}
                        <div className="people-icon">
                          <i className="bi bi-people"></i>
                          <span className="people-count">{course.count} / {course.limit}</span>
                        </div>
                      </div>
                      <div className="properties__caption">
                        <h5>
                          <Link to={`/detail/${course.train_course_id}`}>{course.course_detail_name.length > 63 ? `${course.course_detail_name.substring(0, 63)}...` : course.course_detail_name}</Link>
                        </h5>
                        <p>{course.train_detail}</p>
                        <div className="properties__skill">
                          <span>{course.skills.length > 50 ? `${course.skills.substring(0, 50)}...` : course.skills}</span>
                        </div>
                        <div className="properties__footer">
                          <div className="date" style={{ color: "gray" }}>
                            <span>
                              <p>Enroll {formatDate(course.start_enroll_date, course.end_enroll_date)}</p>
                            </span>
                          </div>
                        </div>
                        <div className="properties__footer">
                          <div className="date" style={{ color: "gray" }}>
                            <p>Training {formatDate(course.start_date, course.finish_date)}</p>
                          </div>
                        </div>
                        <div className="location">
                          <span>
                            <p>{course.train_place.length > 50 ? `${course.train_place.substring(0, 50)}...` : course.train_place}</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="row justify-content-center mb-4">
            <h2 className="text-center">You need to complete Basic Counseling courses first</h2>
          </div>
        )}
      </div>

      {/* Retreat Courses Section End */}

      <a>
        <div ref={searchWrapperRef} className={`search-wrapper ${isActive ? "active" : ""}`}>
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
    </Main >
  );
}

export default Course;
