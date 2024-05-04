import React, { useRef, useEffect, useState } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto";
import CourseTable from "../components/courseTable";
import apiUrl from "../api/apiConfig";
import { Modal, Button, Form } from "react-bootstrap";

function DashboardAdmin() {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const [courseData, setCourseData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [criteria, setCriteria] = useState();
  const [user, setuser] = useState(0);
  const [userErolled, setUserEnrolled] = useState(0);
  const [loading, setLoading] = useState(true);
  const [departmentsWithCriteriaCount, setDepartmentsWithCriteriaCount] = useState(0);
  const [departmentscount, setDepartmentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [publishedCoursesCount, setPublishedCoursesCount] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course names
        const coursesResponse = await fetch(`${apiUrl}/course/get-all`);
        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }
        const coursesData = await coursesResponse.json();

        // Fetch enrollment counts for each course
        const enrollmentData = await Promise.all(
          coursesData.map(async (course) => {
            const enrollResponse = await fetch(`${apiUrl}/course/${course.train_course_id}/enrollCount`);
            if (!enrollResponse.ok) {
              throw new Error(`Failed to fetch enroll count for course ${course.train_course_id}`);
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
        const publishedCoursesCount = coursesData.filter(course => course.isPublish).length;
        setPublishedCoursesCount(publishedCoursesCount);

        // Fetch department names and enrollment counts
        const departmentsResponse = await fetch(`${apiUrl}/user/departments`);
        if (!departmentsResponse.ok) {
          throw new Error("Failed to fetch departments");
        }
        const departmentsData = await departmentsResponse.json();

        // Initialize variables to store the counts
        let departmentsCount = 0;
        let departmentsWithCriteriaCount = 0;

        // Fetch enrollment counts for each department
        const departmentEnrollmentData = await Promise.all(
          departmentsData.map(async (department) => {
            const departmentResponse = await fetch(`${apiUrl}/enroll/getCoutByDepartment/${department.department}`);
            if (!departmentResponse.ok) {
              throw new Error(`Failed to fetch enroll count for department ${department.department}`);
            }
            const departmentEnrollData = await departmentResponse.json();

            // Increment the total departments count
            departmentsCount++;

            // Check if the department meets the criteria and increment the count
            if (departmentEnrollData.count >= 12) {
              departmentsWithCriteriaCount++;
            }

            return {
              departmentName: department.department,
              quantity: departmentEnrollData.count,
            };
          })
        );

        // Set the department data and counts in state
        setDepartmentData(departmentEnrollmentData);
        setDepartmentsCount(departmentsCount);
        setDepartmentsWithCriteriaCount(departmentsWithCriteriaCount);

        const userCountResponse = await fetch(`${apiUrl}/user/userCount`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if (!userCountResponse.ok) {
          throw new Error("Failed to fetch user count");
        }
        const userCount = await userCountResponse.json();
        setuser(userCount.userCount);

        const userEnrollResponse = await fetch(`${apiUrl}/enroll/getCount`);
        if (!userEnrollResponse.ok) {
          throw new Error("Failed to fetch user enroll count");
        }
        const userEnroll = await userEnrollResponse.json();
        setUserEnrolled(userEnroll);

        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
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

      const data1 = {
        labels: courseData.map((data) =>
          data.courseName.length > 20
            ? `${data.courseName.substring(0, 20)}...`
            : data.courseName
        ),
        datasets: [
          {
            label: "Course enrollment",
            data: courseData.map((data) => data.quantity),
            backgroundColor: ["rgba(75, 192, 192, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)"],
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
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      chartRef1.current.chart = new ChartAuto(ctx1, {
        type: "bar",
        data: data1,
        options: options1,
      });
    }
  }, [courseData]);

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
            backgroundColor: departmentData.map((data) => data.quantity >= 12 ? "rgba(54, 162, 235, 0.2)" : "rgba(255, 99, 132, 0.2)"),
            borderColor: departmentData.map((data) => data.quantity >= 12 ? "rgba(54, 162, 235, 1)" : "rgba(255, 99, 132, 1)"),
            borderWidth: 1,
          },
        ],
      };

      const options2 = {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                if (context.parsed.y >= 12) {
                  return `Passed the criteria: ${label}`;
                } else {
                  return `Not pass the criteria: ${label}`;
                }
              }
            }
          }
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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Main>
      {/* Page Header */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5 justify-content-center">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">Dashboard</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page" style={{ fontWeight: 'bold' }}>
                Dashboard admin
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="cardBox">
        <div className="carddash">
          <div>
            <div className="cardName">Total number of instructors enrolled</div>
            <div className="numbers">{userErolled} / {user}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="people-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">Participants that reach the requirements</div>
            <div className="numbers">{departmentsWithCriteriaCount} / {departmentscount}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">Total number of publish courses</div>
            <div className="numbers">{publishedCoursesCount} / {coursesCount}</div>
          </div>

          <div className="iconBx">
            <ion-icon name="share-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash" onClick={handleShowModal}>
          <div>
            <div className="cardName">Specified criteria</div>
            <div className="numbers">12</div>
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
          <div className="col-sm-6 d-flex">
            <CourseTable />
          </div>
          {/* Course End */}

          {/* Bar Chart */}
          <div className="col-sm-6 ">
            <div className="details d-flex">
              <div className="recentOrders">
                <div className="cardHeader"><h2>Quantity Chart</h2></div>
                <br></br>
                <div className="chart-container">
                  <canvas style={{ width: 500, overflowX: 'auto' }} ref={chartRef1} id="courseStatusChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 mb-5 wow fadeIn">
        <div className="details d-flex">
          <div className="recentOrders">
            <div className="cardHeader"><h2>Department Chart</h2></div>
            <br></br>
            <div className="chart-container">
              <canvas style={{ width: 500, overflowX: 'auto' }} ref={chartRef2} id="departmentChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 mb-5 wow fadeIn">
        <div className="details d-flex">
          <div className="recentOrders">
            <div className="cardHeader"><h2>Department Chart</h2></div>
            <br></br>
            <div className="chart-container">
              <canvas style={{ width: 500, overflowX: 'auto' }}></canvas>
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
                onChange={(e) =>
                  setCriteria(e.target.value)
                }
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

    </Main>
  );
}

export default DashboardAdmin;
