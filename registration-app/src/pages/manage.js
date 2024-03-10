import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Manage() {
  const [courses, setCourses] = useState([]);
  const [basicCourses, setBasicCourses] = useState([]);
  const [retreatCourses, setRetreatCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:11230/course")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setBasicCourses(data.filter((course) => course.course_id === 1));
        setRetreatCourses(data.filter((course) => course.course_id === 2));
      });

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const heroSectionBottom = document
      .querySelector(".hero-section")
      .getBoundingClientRect().bottom;
    if (window.scrollY > heroSectionBottom) {
      setIsSearchVisible(true);
    } else {
      setIsSearchVisible(false);
    }
  };

  const handleDelete = (cid) => {
    console.log("Deleting course with ID:", cid);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? This process is permanent."
    );
    if (confirmDelete) {
      fetch(`http://localhost:11230/course/${cid}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Course deleted successfully:", data);
          // Handle success, e.g., remove the deleted course from state
          setCourses(courses.filter((course) => course.train_course_id !== cid));
          setBasicCourses(basicCourses.filter((course) => course.train_course_id !== cid));
          setRetreatCourses(retreatCourses.filter((course) => course.train_course_id !== cid));
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
        });
    } else {
      console.log("Delete operation cancelled.");
    }
  };


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
      {/* Hero Section */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn hero-section"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Courses Management
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Manage
              </li>
            </ol>
            <br></br>
            <div
              className="warning"
              style={{
                color: "warning",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              This page is for Admin
            </div>
          </nav>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchVisible && (
        <div className="fixed-search" style={{ position: "fixed", right: 10 }}>
          <div className="-center">
            <div className="-search">
              <div className="-search-box" style={{ width: "300px" }}>
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
      )}
      <div className="container">
        <div className="row justify-content-start">
          <div className="col-md-3" style={{width: 250}}>
            <Link to={`/insert`}>
              <div className="card mb-4" style={{ height: 70, border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
                <div className="card-body" style={{  justifyContent: "end" }}>
                  <h5 style={{ margin: 5, color: '#E60073' }}>
                    Insert Course
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <br></br>
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Basic Counseling</h2>
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
                    <Link to={`/update/${course.train_course_id}`}>
                      <a href="#" className="border-btn border-btn2">
                        Edit
                      </a>
                    </Link>
                    <Link>
                      <a href="#" className="font-btn" onClick={() => handleDelete(course.train_course_id)}>
                        Delete
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
      <div className="container">
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Retreat Courses</h2>
        </div>
        <div className="row">
          {filteredRetreatCourses.map((course) => (
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
                    borderRadius: "5px",
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
                    <Link to={`/update/${course.train_course_id}`}>
                      <a href="#" className="border-btn border-btn2">
                        Edit
                      </a>
                    </Link>
                    <Link>
                      <a href="#" className="font-btn" onClick={() => handleDelete(course.train_course_id)}>
                        Delete
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
    </Main>
  );
}
export default Manage;
