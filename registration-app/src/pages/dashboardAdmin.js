import React, { useRef, useEffect, useState } from "react";
import Main from "../layouts/main";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto";
import CourseTable from "../components/courseTable";
import apiUrl from "../api/apiConfig";
import { Form } from "react-bootstrap";
import UserTable from "../components/userTable";

function DashboardAdmin() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const initialCriteria = parseInt(localStorage.getItem("criteria"), 10);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [user, setuser] = useState(0);
  const [userErolled, setUserEnrolled] = useState(0);
  const [loading, setLoading] = useState(true);
  const [departmentsWithCriteriaCount, setDepartmentsWithCriteriaCount] =
    useState(0);
  const [departmentscount, setDepartmentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [publishedCoursesCount, setPublishedCoursesCount] = useState(0);
  const storedYear = localStorage.getItem("selectedYear");
  const initialYear = storedYear
    ? parseInt(storedYear, 10)
    : new Date().getFullYear() + 543;
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const criteriaResponse = await fetch(`${apiUrl}/criteria/get`);
      if (!criteriaResponse.ok) {
        throw new Error("Failed to fetch enrollments");
      }
      const CriteriaNumber = await criteriaResponse.json();
      setCriteria(CriteriaNumber);

      try {
        // Fetch course names
        const coursesResponse = await fetch(
          `${apiUrl}/course/courseByYear/${storedYear}`
        );
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();

        // Fetch enrollment counts for each course
        const enrollmentData = await Promise.all(
          coursesData.map(async (course) => {
            const enrollResponse = await fetch(
              `${apiUrl}/course/${course.train_course_id}/enrollCount`
            );
            if (!enrollResponse.ok) {
              throw new Error(
                `Failed to fetch enroll count for course ${course.train_course_id}`
              );
            }
            const enrollData = await enrollResponse.json();
            return {
              courseName: course.course_detail_name,
              quantity: enrollData.enrollCount,
            };
          })
        );

        setCourseData(enrollmentData);

        // Calculate the total number of courses
        setCoursesCount(coursesData.length);

        // Calculate the number of unpublished courses
        const publishedCoursesCount = coursesData.filter(
          (course) => course.isPublish
        ).length;
        setPublishedCoursesCount(publishedCoursesCount);

        // Fetch department names and enrollment counts
        const departmentsResponse = await fetch(`${apiUrl}/user/departments`);
        if (!departmentsResponse.ok) {
          throw new Error("Failed to fetch departments");
        }
        const departmentsData = await departmentsResponse.json();
        let passCriteriaCount = 0;

        // Fetch enrollment counts for each department
        const departmentEnrollmentData = await Promise.all(
          departmentsData.map(async (department) => {
            const departmentResponse = await fetch(
              `${apiUrl}/enroll/countDepartmentByYear/${department.department}/${storedYear}`
            );
            if (!departmentResponse.ok) {
              throw new Error(
                `Failed to fetch enroll count for department ${department.department}`
              );
            }
            const departmentEnrollData = await departmentResponse.json();
            console.log(departmentEnrollData + ": departmentEnrollData");

            let pass = departmentEnrollData >= criteria;
            // Check if the department meets the criteria and increment the count
            if (pass) {
              passCriteriaCount++;
            }

            return {
              departmentName: department.department,
              quantity: departmentEnrollData,
              pass: pass
            };
          })
        );

        // Set the department data and counts in state
        setDepartmentData(departmentEnrollmentData);
        setDepartmentsCount(departmentEnrollmentData.length);
        console.log(passCriteriaCount , criteria);
        setDepartmentsWithCriteriaCount(
          departmentEnrollmentData.filter(
          (department) => department.pass).length
        );

        const userCountResponse = await fetch(`${apiUrl}/user/userCount`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        if (!userCountResponse.ok) {
          throw new Error("Failed to fetch user count");
        }
        const userCount = await userCountResponse.json();
        setuser(userCount.userCount);

        const userEnrollResponse = await fetch(
          `${apiUrl}/enroll/countByYear/${storedYear}`
        );
        if (!userEnrollResponse.ok) {
          throw new Error("Failed to fetch user enroll count");
        }
        const userEnroll = await userEnrollResponse.json();
        setUserEnrolled(userEnroll);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const enrollmentsResponse = await fetch(
        `${apiUrl}/enroll/byYear/${selectedYear}`
      );
      if (!enrollmentsResponse.ok) {
        throw new Error("Failed to fetch enrollments");
      }
      const enrollmentsData = await enrollmentsResponse.json();
      setEnrollmentData(enrollmentsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef1.current) {
      const ctx1 = chartRef1.current.getContext("2d");
      if (chartRef1.current.chart) {
        chartRef1.current.chart.destroy();
      }

      const totalDepartments = departmentscount;
      const passPercentage = Math.round(
        (departmentsWithCriteriaCount / totalDepartments) * 100
      );

      const data1 = {
        labels: ["Passed Criteria", "Did Not Pass Criteria"],
        datasets: [
          {
            label: "Department Criteria",
            data: [
              departmentsWithCriteriaCount,
              totalDepartments - departmentsWithCriteriaCount,
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      };

      const options1 = {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
          doughnutlabel: {
            labels: [
              {
                text: `${passPercentage}%`,
                font: {
                  size: "40",
                },
              },
            ],
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
      };

      chartRef1.current.chart = new ChartAuto(ctx1, {
        type: "doughnut",
        data: data1,
        options: options1,
        plugins: [
          {
            beforeDraw: function (chart) {
              const width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

              ctx.restore();
              const fontSize = (height / 200).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "middle";

              const text = `${passPercentage}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            },
          },
        ],
      });
    }
  }, [departmentsWithCriteriaCount, departmentscount]);

  useEffect(() => {
    if (chartRef2.current) {
      const ctx2 = chartRef2.current.getContext("2d");
      if (chartRef2.current.chart) {
        chartRef2.current.chart.destroy();
      }

      const data2 = {
        labels: departmentData.map((data) => data.departmentName),
        datasets: [
          {
            label: "Department Criteria",
            data: departmentData.map((data) => data.quantity),
            backgroundColor: departmentData.map((data) =>
              data.quantity >= criteria
                ? "rgba(54, 162, 235, 0.2)"
                : "rgba(255, 99, 132, 0.2)"
            ),
            borderColor: departmentData.map((data) =>
              data.quantity >= criteria
                ? "rgba(54, 162, 235, 1)"
                : "rgba(255, 99, 132, 1)"
            ),
            borderWidth: 1,
          },
        ],
      };

      const options2 = {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                if (context.parsed.y >= criteria) {
                  return `Passed the criteria: ${label}`;
                } else {
                  return `Not pass the criteria: ${label}`;
                }
              },
            },
          },
          // Custom plugin to display the data value on top of each bar
          dataLabels: {
            display: true,
            color: "black",
            font: {
              weight: "bold",
            },
            formatter: (value, context) => {
              return value; // Display the data value
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      // Update the chart creation to include the options
      chartRef2.current.chart = new ChartAuto(ctx2, {
        type: "bar",
        data: data2,
        options: options2,
      });
    }
  }, [departmentData]);

  const enrollmentsChartRef = useRef(null);

  useEffect(() => {
    if (enrollmentsChartRef.current) {
      const ctx = enrollmentsChartRef.current.getContext("2d");
      if (enrollmentsChartRef.current.chart) {
        enrollmentsChartRef.current.chart.destroy();
      }
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const data = {
        labels: months,
        datasets: [
          {
            label: "Enrollments",
            data: months.map((month) => {
              const enrollments = enrollmentData.filter(
                (enrollment) =>
                  new Date(enrollment.enroll_date).getMonth() ===
                  months.indexOf(month)
              );
              return enrollments.length;
            }),
            borderColor: "#3e95cd",
            fill: false,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      enrollmentsChartRef.current.chart = new ChartAuto(ctx, {
        type: "line",
        data: data,
        options: options,
      });
    }
  }, [enrollmentData]);

  const setCriteriaHandler = async (newCriteriaValue) => {
    fetch(`${apiUrl}/criteria/set/${newCriteriaValue}`, { method: "POST" });
    setCriteria(newCriteriaValue);
    localStorage.setItem("criteria", newCriteriaValue);
    handleCloseModal();
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    window.location.reload();
  };
  const handleShowModal = () => setShowModal(true);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    // Store selected year in local storage
    localStorage.setItem("selectedYear", year);
    window.location.reload();
  };

  return (
    <Main>
      {/* Year Filter */}
      <div className="fixed-form">
        <div className="label">
          <label className="label-title" htmlFor="year">
            Year
          </label>
          <input
            id="year"
            type="number"
            placeholder="Enter year"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* Page Header */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5 justify-content-center">
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
              <li
                className="breadcrumb-item text-dark"
                aria-current="page"
                style={{ fontWeight: "bold" }}
              >
                Dashboard admin
              </li>
            </ol>
            <br />
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="cardBox">
        <div className="carddash" onClick={() => setShowUser(true)}>
          <div>
            <div className="cardName">Total number of instructors trained</div>
            <div className="numbers">
              {userErolled} / {user}
            </div>
          </div>

          <div className="iconBx">
            <ion-icon name="people-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">
              Participants that reach the requirements
            </div>
            <div className="numbers">
              {departmentsWithCriteriaCount} / {departmentscount}
            </div>
          </div>

          <div className="iconBx">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash" onClick={() => navigate("/manage")}>
          <div>
            <div className="cardName">Total number of publish courses</div>
            <div className="numbers">
              {publishedCoursesCount} / {coursesCount}
            </div>
          </div>

          <div className="iconBx">
            <ion-icon name="share-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash" onClick={handleShowModal}>
          <div>
            <div className="cardName">Specified criteria</div>
            <div className="numbers">{criteria}</div>
            <div className="cardName">people to pass the criteria</div>
          </div>
          <div className="iconBx">
            <ion-icon name="cog-outline"></ion-icon>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-fluid">
        <div className="row">
          {/*Course */}
          <div className="col-sm-8 d-flex">
            <CourseTable />
          </div>
          {/* Course End */}

          {/* Bar Chart */}
          <div className="col-sm-4 ">
            <div className="details d-flex">
              <div className="recentOrders">
                <div className="cardHeader">
                  <h2>Criteria Chart</h2>
                </div>
                <br></br>
                <div className="chart-container d-flex justify-content-center">
                  <canvas
                    style={{ maxWidth: 300, overflowX: "auto" }}
                    ref={chartRef1}
                    id="courseStatusChart"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 wow fadeIn">
        <div className="details d-flex justify-content-center">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Department Chart</h2>
            </div>
            <br></br>
            <div className="chart-container">
              <canvas
                style={{ maxHeight: 400, overflowX: "auto", margin: "0 auto" }}
                ref={chartRef2}
                id="departmentChart"
              ></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid wow fadeIn">
        <div className="details d-flex">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Enrollment Chart</h2>
            </div>
            <br></br>
            <div className="chart-container">
              <canvas
                style={{ maxHeight: 400, overflowX: "auto", margin: "0 auto" }}
                ref={enrollmentsChartRef}
                id="enrollmentsChart"
              ></canvas>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal d-flex justify-content-center align-items-center"
          style={{
            display: showModal ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "300px",
            }}
          >
            <h3>Set Criteria</h3>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Criteria</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number"
                  value={criteria}
                  onChange={(e) => setCriteria(e.target.value)}
                />
              </Form.Group>
            </Form>
            <br />
            <button
              className="btn btn-primary"
              onClick={() => setCriteriaHandler(criteria)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {showUser && (
        <div
          className="modal d-flex justify-content-center align-items-center"
          style={{
            display: showModal ? "block" : "none",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "900px",
            }}
          >
            <UserTable />
            <br />
            <button
              className="btn btn-cancel"
              onClick={() => setShowUser(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Main>
  );
}

export default DashboardAdmin;
