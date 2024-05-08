import React, { useRef, useEffect, useState } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto"; // Added ChartAuto import
import apiUrl from "../api/apiConfig";


function DashboardExecutive() {
  // Ref for the chart canvas
  const chartRef = useRef(null);
  const enrollmentsChartRef = useRef(null); // Added useRef for enrollment chart

  const [enrollmentData, setEnrollmentData] = useState([]); // Define enrollmentData state

  // Chart data
  const data = {
    labels: ["Quantity", "subordinate"],
    datasets: [
      {
        label: "Course Status",
        data: [306, 47], // Sample data for demonstration
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

  // Create or update chart on component mount or data change
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Check if chart instance exists, destroy it before creating a new one
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      chartRef.current.chart = new ChartAuto(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    }
  }, [data, options]);

  useEffect(() => {
    if (enrollmentsChartRef.current) {
      const ctx = enrollmentsChartRef.current.getContext("2d");
      if (enrollmentsChartRef.current.chart) {
        enrollmentsChartRef.current.chart.destroy();
      }

      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const data = {
        labels: months,
        datasets: [
          {
            label: "Basic",
            data: months.map(month => {
              const enrollments = enrollmentData.filter(enrollment => new Date(enrollment.enroll_date).getMonth() === months.indexOf(month));
              return enrollments.length;
            }),
            borderColor: "#3e95cd",
            fill: false,
          },
          // New dataset for the new line of data
          {
            label: "Retreat",
            data: months.map(month => {
              const enrollments = enrollmentData.filter(enrollment => new Date(enrollment.enroll_date).getMonth() === months.indexOf(month));
              return enrollments.length;
            }),
            borderColor: "#ff0000", // Red color for the new line
            fill: false,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false
      };

      enrollmentsChartRef.current.chart = new ChartAuto(ctx, {
        type: "line",
        data: data,
        options: options
      });
    }
  }, [enrollmentData]);

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
                Dashboard Executive
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="cardBox">
        <div className="carddash">
          <div>
            <div className="cardName">Subordinate</div>
            <div className="numbers">124</div>
          </div>

          <div className="iconBx">
            <ion-icon name="people-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">Enrolled</div>
            <div className="numbers">24</div>
          </div>

          <div className="iconBx">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">Not enrolled yet</div>
            <div className="numbers">100</div>
          </div>

          <div className="iconBx">
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="cardName">Missing</div>
            <div className="numbers">284</div>
            <div className="cardName">people to pass the criteria</div>
          </div>
          <div className="iconBx">
            <ion-icon name="ban"></ion-icon>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-fluid">
        <div className="row">
          {/*Course */}
          <div className="col-lg-6">
            <div className="details d-flex">
              <div className="recentOrders">
                <div className="cardHeader ">
                  <h2>Subordinate</h2>
                  <Link to="/">View All</Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Mail</td>
                      <td>Phone</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 1
                      </td>
                      <td>
                        ห้องประชุม 1 ชั้น 2 อาคารวิจัย
                      </td>
                      <td>68</td>
                      <td className="text-center">10</td>
                      <td>
                        <span className="status delivered">Opening</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 2
                      </td>
                      <td>
                        ห้องประชุม 1 ชั้น 2 อาคารวิจัย
                      </td>
                      <td>0</td>
                      <td className="text-center">0</td>
                      <td>
                        <span className="status pending">Waiting</span>
                      </td>
                    </tr>
                    <tr>
                      <td>อบรมให้การปรึกษา (Basic Counseling)</td>
                      <td>ห้องประชุม 4 อาคารนวัตกรรม</td>
                      <td>108</td>
                      <td className="text-center">15</td>
                      <td>
                        <span className="status delivered">Opening</span>
                      </td>
                    </tr>
                    <tr>
                      <td>การให้การปรึกษาตามแนวซาเทียร์</td>
                      <td>
                        ห้องประชุมหัวตะพาน โรงพยาบาลศูนย์การแพทย์
                      </td>
                      <td>0</td>
                      <td className="text-center">0</td>
                      <td>
                        <span className="status pending">Waiting</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        การให้การปรึกษาสำหรับอาจารย์ใหม่ online
                      </td>
                      <td>Zoom</td>
                      <td>130</td>
                      <td className="text-center">22</td>
                      <td>
                        <span className="status delivered">Opening</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Course End */}

          {/* Bar Chart */}
          <div className="col-lg-6 ">
            <div className="details d-flex">
              <div className="recentOrders">
                <div className="cardHeader"><h2>Quantity Chart</h2></div>
                <br></br>
                <div className="chart-container">
                  <canvas ref={chartRef} id="courseStatusChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bar Chart End*/}

        <div className="container-fluid wow fadeIn">
          <div className="details d-flex">
            <div className="recentOrders">
              <div className="cardHeader"><h2>Enrollment Chart</h2></div>
              <br></br>
              <div className="chart-container">
                <canvas style={{ maxHeight: 400, overflowX: 'auto', margin: '0 auto' }} ref={enrollmentsChartRef} id="enrollmentsChart"></canvas>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Main>
  );
}

export default DashboardExecutive;
