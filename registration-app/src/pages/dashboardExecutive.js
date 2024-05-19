import React, { useRef, useEffect, useState } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto"; // Added ChartAuto import
import CourseTable from "../components/courseTable";
import apiUrl from "../api/apiConfig";
import { Modal, Button, Form } from "react-bootstrap";
import UserTableEx from "../components/userTableEx";

function DashboardExecutive() {
  // Ref for the chart canvas
  const chartRef1 = useRef(null);
  const enrollmentsChartRef = useRef(null); // Added useRef for enrollment chart
  const [courseData, setCourseData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [criteria, setCriteria] = useState();
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
  const [enrollmentData, setEnrollmentData] = useState([]); // Define enrollmentData state
  const userdata = JSON.parse(localStorage.getItem("userData"));
  const [usersub, setusersub] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const department = userdata.department;
        const subordinateResponse = await fetch(
          `${apiUrl}/enroll/getUser/${department}/${storedYear}`
        );
        if (!subordinateResponse.ok) {
          throw new Error("Failed to fetch departments");
        }
        const subordinatedata = await subordinateResponse.json();
        setusersub(subordinatedata);

        // Filter usersub where status is "enrolled"
        const enrolledUsers = subordinatedata.filter(
          (user) => user.status === "Enrolled" || user.status === "Pass"
        );
        setEnrolled(enrolledUsers);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef1.current) {
      const ctx1 = chartRef1.current.getContext("2d");
      if (chartRef1.current.chart) {
        chartRef1.current.chart.destroy();
      }
      const enrolledCount = enrolled.length; // จำนวนที่ลงทะเบียนแล้ว
      const notEnrolledCount = usersub.length - enrolledCount; // จำนวนที่ยังไม่ได้ลงทะเบียน

      // ตรวจสอบค่าตัวแปรก่อนนำมาใช้ในการคำนวณ
      // หากค่าไม่ใช่ตัวเลขหรือเป็น NaN ให้กำหนดค่าเริ่มต้นเป็น 0
      const departmentsWithCriteriaCount = Number.isNaN(enrolledCount)
        ? 0
        : enrolledCount;
      const totalDepartments = Number.isNaN(usersub.length)
        ? 0
        : usersub.length;

      // คำนวณเปอร์เซ็นต์ของนักศึกษาที่ผ่านเกณฑ์
      const passPercentage = Math.round(
        (departmentsWithCriteriaCount / totalDepartments) * 100
      );

      const data1 = {
        labels: ["Enrolled", "Not enrolled yet"],
        datasets: [
          {
            label: "Department Criteria",
            data: [enrolledCount, usersub.length - enrolledCount],
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
  }, [enrolled.length, usersub.length]); // เพิ่ม enrolled.length เข้าไปใน dependency array เพื่อให้ useEffect ถูกเรียกใหม่เมื่อค่าเปลี่ยน

  // Chart data
  const data = {
    labels: ["Quantity", "subordinate"],
    datasets: [
      {
        label: "Course Status",
        data: [53, 47], // Sample data for demonstration
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow resizing
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Course Status",
          color: "#333",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Quantity",
          color: "#333",
          font: {
            weight: "bold",
          },
        },
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

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
            label: "Basic",
            data: months.map((month) => {
              const enrollments = enrollmentData.filter(
                (enrollment) =>
                  new Date(enrollment.enroll_date).getMonth() ===
                    months.indexOf(month) && enrollment.course_id === 1 // เพิ่มเงื่อนไข course_id = 1
              );
              return enrollments.length;
            }),
            borderColor: "#3e95cd",
            fill: false,
          },
          // New dataset for the new line of data
          {
            label: "Retreat",
            data: months.map((month) => {
              const enrollments = enrollmentData.filter(
                (enrollment) =>
                  new Date(enrollment.enroll_date).getMonth() ===
                    months.indexOf(month) && enrollment.course_id === 2 // เพิ่มเงื่อนไข course_id = 2
              );
              return enrollments.length;
            }),
            borderColor: "#ff0000", // Red color for the new line
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

  const handleCloseModal = () => setShowModal(false);
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
                Dashboard Executive
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="cardBox">
        <div className="carddash" onClick={() => setShowUser(true)}>
          <div>
            <div className="cardName">Subordinate</div>
            <div className="numbers">{usersub.length}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="people-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">Enrolled</div>
            <div className="numbers">{enrolled.length}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">Not enrolled yet</div>
            <div className="numbers">{usersub.length - enrolled.length}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash" onClick={handleShowModal}>
          <div>
            <div className="cardName">Enrolled</div>
            <div className="numbers">
              {((enrolled.length * 100) / usersub.length).toFixed(2)}%
            </div>
            <div className="cardName">percentage</div>
          </div>
          <div className="iconBx">
            <ion-icon name="pie-chart-outline"></ion-icon>
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
                  <h2>Quantity Chart</h2>
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

      <div className="container-fluid wow fadeIn">
        <div className="details d-flex">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Enrollment Chart</h2>
            </div>
            <br></br>
            <div className="chart-container">
              <canvas
                style={{
                  maxHeight: 400,
                  overflowX: "auto",
                  margin: "0 auto",
                }}
                ref={enrollmentsChartRef}
                id="enrollmentsChart"
              ></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        backdrop="static"
        onHide={handleCloseModal}
        style={{ zIndex: 9999 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Set Criteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

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
            <UserTableEx />
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

export default DashboardExecutive;
