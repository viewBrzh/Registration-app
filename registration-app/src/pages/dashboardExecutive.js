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

  // ChartPie component defined here
  const ChartPie = ({ courseId }) => {
    useEffect(() => {
      const ctx = document.getElementById(`chart-${courseId}`).getContext('2d');
      const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Label 1', 'Label 2', 'Label 3'],
          datasets: [{
            data: [30, 20, 50], // Example data, replace with your actual data
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }],
        },
      });
      return () => {
        pieChart.destroy(); // Cleanup chart on unmount
      };
    }, [courseId]);

    return null; // Chart is rendered outside of React, return null
  };

  return (
    <Main>  
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5 justify-content-center"> {/* Centered content */}
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Dashboard
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Dashboard Executive
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div id="basic" className="container section">
        <br></br>
        <div className="row justify-content-center mb-4">
          <h2 className="text-center">Basic Counseling</h2>
        </div>
        {filteredBasicCourses.map((course) => (
          <div key={course.train_course_id} className="row mb-4">
            <div className="col-lg-4">
              <div className="properties properties2 mb-30">
                <div className="properties__card">
                  <div className="properties__img overlay1">
                    <Link to={`/detail/${course.train_course_id}`}>
                      <img src="/img/ranking.jpg" alt="" />
                    </Link>
                    <canvas id={`chart-${course.train_course_id}`} width="100" height="100"></canvas>
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
            {/* Initialize pie chart */}
            <ChartPie courseId={course.train_course_id} />
          </div>
        ))}
      </div>
      {/* Basic Courses Section End */}
    </Main>
  );
}

export default DashboardExecutive;
