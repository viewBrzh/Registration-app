import React, { useRef, useEffect, useState } from "react";
import Main from "../layouts/main";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto"; // Added ChartAuto import
import CourseTableEx from "../components/courseTableEx";
import apiUrl from "../api/apiConfig";
import { Modal, Button, Form } from "react-bootstrap";
import UserTableEx from "../components/userTableEx";
import AOS from "aos";
import "aos/dist/aos.css";
import UserTableExEnroll from "../components/userTableExEnroll";
import UserTableExNotEnroll from "../components/userTableExNotEnroll";

function DashboardExecutive() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  // Ref for the chart canvas
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const enrollmentsChartRef = useRef(null);
  const branchChartRef = useRef(null);
  const [branchData, setBranchData] = useState([]);
  const [branchscount, setBranchsCount] = useState(0);
  const [branchsWithCriteriaCount, setbranchsWithCriteriaCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [criteria, setCriteria] = useState();
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
  const [showUserEnroll, setShowUserEnroll] = useState(false);
  const [showUserNotEnroll, setShowUserNotEnroll] = useState(false);
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const faculty = userdata.faculty;
        const subordinateResponse = await fetch(
          `${apiUrl}/enroll/getUser/${faculty}/${storedYear}`
        );
        if (!subordinateResponse.ok) {
          throw new Error("Failed to fetch facultys");
        }
        const subordinatedata = await subordinateResponse.json();
        setusersub(subordinatedata);

        // Filter usersub where status is "enrolled"
        const enrolledUsers = subordinatedata.filter(
          (user) => user.status === "Enrolled" || user.status === "Pass"
        );
        console.log(enrolledUsers);
        setEnrolled(enrolledUsers);

        // Fetch branch names and enrollment counts
        const branchsResponse = await fetch(
          `${apiUrl}/user/departments/${userdata.faculty}`
        );
        if (!branchsResponse.ok) {
          throw new Error("Failed to fetch departments");
        }
        const branchsData = await branchsResponse.json();
        console.log(branchsData);
        let passCriteriaCount = 0;

        // Fetch enrollment counts for each barnch
        const branchEnrollmentData = await Promise.all(
          branchsData.map(async (department) => {
            const branchResponse = await fetch(
              `${apiUrl}/enroll/countDepartmentByYear/${department.department}/${storedYear}`
            );
            if (!branchResponse.ok) {
              throw new Error(
                `Failed to fetch enroll count for branch ${department.department}`
              );
            }
            const branchEnrollData = await branchResponse.json();
            console.log(branchEnrollData + ": branchEnrollData");
            const enrollPercentage =
              (parseInt(branchEnrollData, 10) / department.userCount) * 100;
            const enrollCount = parseInt(branchEnrollData, 10);
            let pass = enrollPercentage >= criteria;

            // Check if the branch meets the criteria and increment the count
            if (pass) {
              passCriteriaCount++;
            }
            return {
              branchName: department.department,
              userCount: department.userCount,
              quantity: enrollCount,
              pass: pass,
            };
          })
        );

        setBranchData(branchEnrollmentData);
        setBranchsCount(branchEnrollmentData.length);
        console.log(
          passCriteriaCount,
          criteria,
          branchEnrollmentData,
          enrolled
        );
        setbranchsWithCriteriaCount(
          branchEnrollmentData.filter((branch) => branch.pass).length
        );

        const courseTypeRes = await fetch(
          `${apiUrl}/enroll/getCourseType/${userdata.faculty}/${storedYear}`
        );
        const courseTypeData = await courseTypeRes.json();
        setEnrollmentData(courseTypeData);
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
      const departmentsWithCriteriaCount = Number.isNaN(enrolledCount)
        ? 0
        : enrolledCount;
      const totalDepartments = Number.isNaN(usersub.length)
        ? 0
        : usersub.length;

      // คำนวณเปอร์เซ็นต์ของนักศึกษาที่ผ่านเกณฑ์
      const passPercentage = (
        (departmentsWithCriteriaCount / totalDepartments) *
        100
      ).toFixed(2);

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
  }, [enrolled.length, usersub.length]);
  // เพิ่ม enrolled.length เข้าไปใน dependency array เพื่อให้ useEffect ถูกเรียกใหม่เมื่อค่าเปลี่ยน

  useEffect(() => {
    if (branchChartRef.current) {
      const ctx2 = branchChartRef.current.getContext("2d");
      if (branchChartRef.current.chart) {
        branchChartRef.current.chart.destroy();
      }

      const data2 = {
        labels: branchData.map((data) => data.branchName), // เปลี่ยนจาก departmentName เป็น branchName
        datasets: [
          {
            label: "Branch Criteria", // เปลี่ยนชื่อ label ให้เหมาะสม
            data: branchData.map((data) => data.quantity), // ใช้ branchData แทน
            backgroundColor: branchData.map((data) =>
              (data.quantity / data.userCount) * 100 >= criteria
                ? "rgba(54, 162, 235, 0.2)"
                : "rgba(255, 99, 132, 0.2)"
            ),
            borderColor: branchData.map((data) =>
              (data.quantity / data.userCount) * 100 >= criteria
                ? "rgba(54, 162, 235, 1)"
                : "rgba(255, 99, 132, 1)"
            ),
            borderWidth: 1,
          },
        ],
      };

      const options2 = {
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
              stepSize: 1, // Ensure steps are in integers
            },
          },
        },
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
          dataLabels: {
            display: true,
            color: "black",
            font: {
              weight: "bold",
            },
            formatter: (value) => {
              return value;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      branchChartRef.current.chart = new ChartAuto(ctx2, {
        type: "bar",
        data: data2,
        options: options2,
      });
    }
  }, [branchData]);

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

  console.log("Enrolled Data: " + enrolled);
  console.log("Department Data: ");

  const handleLookerPage = () => {
    navigate("/looker");
  };

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const criteriaResponse = await fetch(`${apiUrl}/criteria/get`);
        if (!criteriaResponse.ok) {
          throw new Error("Failed to fetch criteria");
        }
        const CriteriaNumber = await criteriaResponse.json();
        setCriteria(CriteriaNumber);

        const facultyResponse = await fetch(`${apiUrl}/user/faculties`);
        if (!facultyResponse.ok) {
          throw new Error("Failed to fetch departments");
        }
        const facultyData = await facultyResponse.json();

        const departmentEnrollmentData = await Promise.all(
          facultyData.map(async (faculty) => {
            const departmentResponse = await fetch(
              `${apiUrl}/enroll/countFacultyByYear/${faculty.faculty}/${storedYear}`
            );
            if (!departmentResponse.ok) {
              throw new Error(
                `Failed to fetch enroll count for department ${faculty.faculty}`
              );
            }
            const departmentEnrollData = await departmentResponse.json();

            const enrollPercentage =
              (departmentEnrollData / faculty.userCount) * 100;

            let pass = enrollPercentage >= CriteriaNumber;

            return {
              departmentName: faculty.faculty,
              quantity: departmentEnrollData,
              userCount: faculty.userCount,
              pass: pass,
            };
          })
        );

        setDepartmentData(departmentEnrollmentData);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartmentData();
  }, [storedYear]);

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
            label: "Faculty Criteria",
            data: departmentData.map((data) => data.quantity),
            backgroundColor: departmentData.map((data) =>
              (data.quantity / data.userCount) * 100 >= criteria
                ? "rgba(54, 162, 235, 0.2)"
                : "rgba(255, 99, 132, 0.2)"
            ),
            borderColor: departmentData.map((data) =>
              (data.quantity / data.userCount) * 100 >= criteria
                ? "rgba(54, 162, 235, 1)"
                : "rgba(255, 99, 132, 1)"
            ),
            borderWidth: 1,
          },
        ],
      };

      const options2 = {
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
              stepSize: 1, // Ensure steps are in integers
            },
          },
        },
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
            <button onClick={handleLookerPage}>Go to Looker Page</button>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="cardBox" data-aos="fade-up">
        <div className="carddash" onClick={() => setShowUser(true)}>
          <div>
            <div className="cardName">Subordinate</div>
            <div className="numbers">{usersub.length}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="people-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash" onClick={() => setShowUserEnroll(true)}>
          <div>
            <div className="cardName">Enrolled</div>
            <div className="numbers">{enrolled.length}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash" onClick={() => setShowUserNotEnroll(true)}>
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
            <CourseTableEx />
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

      <div className="container-fluid wow fadeIn" data-aos="fade-up">
        <div className="details d-flex">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Branch Chart</h2>
            </div>
            <br></br>
            <div className="chart-container">
              <canvas
                style={{
                  maxHeight: 400,
                  overflowX: "auto",
                  margin: "0 auto",
                }}
                ref={branchChartRef} // เปลี่ยน ref ให้ตรงกับ branchChartRef
                id="branchChart" // เปลี่ยน id ให้เหมาะสม
              ></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 wow fadeIn" data-aos="fade-up">
        <div className="details d-flex justify-content-center">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Faculty Chart</h2>
            </div>
            <br></br>
            <div className="chart-container">
              <canvas
                style={{ maxHeight: 400, overflowX: "auto", margin: "0 auto" }}
                ref={chartRef2}
                id="facultyChart"
              ></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid wow fadeIn" data-aos="fade-up">
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
              maxWidth: "1000px",
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

      {showUserEnroll && (
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
              maxWidth: "1000px",
            }}
          >
            <UserTableExEnroll />
            <br />
            <button
              className="btn btn-cancel"
              onClick={() => setShowUserEnroll(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showUserNotEnroll && (
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
              maxWidth: "1000px",
            }}
          >
            <UserTableExNotEnroll />
            <br />
            <button
              className="btn btn-cancel"
              onClick={() => setShowUserNotEnroll(false)}
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
