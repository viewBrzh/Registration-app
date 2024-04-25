import React, { useState, useEffect, useRef } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto'; // Import Chart.js

function DashboardExecutive() {
  const [courses, setCourses] = useState([]);
  const [basicCourses, setBasicCourses] = useState([]);
  const [retreatCourses, setRetreatCourses] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const searchWrapperRef = useRef(null);

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

  const filteredBasicCourses = basicCourses.filter((course) =>
    course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRetreatCourses = retreatCourses.filter((course) =>
    course.course_detail_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    filteredBasicCourses.forEach((course) => {
      const ctx = document.getElementById(`basicPieChart${course.train_course_id}`);
      if (ctx) {
        if (ctx.chart) {
          ctx.chart.destroy();
        }
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Category A', 'Category B', 'Category C'],
            datasets: [{
              label: 'Basic Counseling',
              data: [30, 20, 50],
              backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384'],
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Basic Counseling Pie Chart'
              }
            }
          }
        });
      }
    });
  }, [filteredBasicCourses]);

  useEffect(() => {
    filteredRetreatCourses.forEach((course) => {
      const ctx = document.getElementById(`retreatPieChart${course.train_course_id}`);
      if (ctx) {
        if (ctx.chart) {
          ctx.chart.destroy();
        }
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Category X', 'Category Y', 'Category Z'],
            datasets: [{
              label: 'Retreat Courses',
              data: [10, 30, 60],
              backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384'],
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Retreat Courses Pie Chart'
              }
            }
          }
        });
      }
    });
  }, [filteredRetreatCourses]);

  return (
    <Main>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5 justify-content-center"> {/* Centered content */}
          <h1 className="display-2 text-dark mb-4 animated slideInDown">Dashboard</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">Home</Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">Dashboard Executive</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Content Start */}
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-6">
            {/* Basic Counseling Section */}
            <div id="basic" className="container section">
              <br />
              <div className="row justify-content-center mb-4">
                <h2 className="text-center">Basic Counseling</h2>
              </div>
              <div className="row">
                {filteredBasicCourses.map((course) => (
                  <div className="col-lg-12 mb-4" key={course.train_course_id}>
                    <div className="properties properties2 mb-30" style={{ height: "auto", marginBottom: "20px", position: "relative" }}>
                      <div className="properties__card" style={{ border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
                        <div className="properties__img overlay1">
                          <Link to={`/detail/${course.train_course_id}`}>
                            <img src="/img/ranking.jpg" alt="" style={{ width: "100%", height: "100%" }} />
                          </Link>
                        </div>
                        <div className="properties__caption">
                          <p>{course.category}</p>
                          <h3>
                            <Link to={`/detail/${course.train_course_id}`}>
                              {course.course_detail_name.length > 63 ? `${course.course_detail_name.substring(0, 63)}...` : course.course_detail_name}
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
                      <div className="chart-card">
                      <canvas
  id={`basicPieChart  1${course.train_course_id}`}
  style={{ width: "100%", height: "100%" }}
></canvas>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Basic Counseling Section End */}
          </div>

          {/* Right Column */}
          <div className="col-lg-6">
            {/* Retreat Courses Section */}
            <div id="retreat" className="container section">
              <br />
              <div className="row justify-content-center mb-4">
                <h2 className="text-center">Retreat Courses</h2>
              </div>
              <div className="row">
                {filteredRetreatCourses.map((course) => (
                  <div className="col-lg-12 mb-4" key={course.train_course_id}>
                    <div className="properties properties2 mb-30" style={{ height: "auto", marginBottom: "20px", position: "relative" }}>
                      <div className="properties__card" style={{ border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden" }}>
                        <div className="properties__img overlay1">
                          <Link to={`/detail/${course.train_course_id}`}>
                            <img src="/img/ranking.jpg" alt="" style={{ width: "100%", height: "100%" }} />
                          </Link>
                        </div>
                        <div className="properties__caption">
                          <p>{course.category}</p>
                          <h3>
                            <Link to={`/detail/${course.train_course_id}`}>
                              {course.course_detail_name.length > 63 ? `${course.course_detail_name.substring(0, 63)}...` : course.course_detail_name}
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
                      <div className="chart-card">
                        <canvas
                          id={`retreatPieChart${course.train_course_id}`}
                          style={{ width: "100%", height: "100%" }}
                        ></canvas>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Retreat Courses Section End */}
          </div>
          {/* Right Column End */}
        </div>
        {/* Charts Row End */}
      </div>
      {/* Content End */}
    </Main>
  );
}

export default DashboardExecutive;
