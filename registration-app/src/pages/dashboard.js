import React, { useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto";

function Dashboard() {
  useEffect(() => {
    const ctx1 = document.getElementById("myChart").getContext("2d");
    const existingChart1 = ChartAuto.getChart(ctx1);
    if (existingChart1) {
      existingChart1.destroy();
    }
    new ChartAuto(ctx1, {
      type: "bar",
      data: {
        labels: [
          "การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 1",
          "การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 2",
          "อบรมให้การปรึกษา",
          "การให้การปรึกษาตามแนวซาเทียร์",
          "การให้การปรึกษาสำหรับอาจารย์ใหม่ online",
        ],
        datasets: [
          {
            label: "Quantity",
            data: [68, 0, 108, 0, 130],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: "linear",
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 20,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    const ctx2 = document.getElementById("myChart1").getContext("2d");
    const existingChart2 = ChartAuto.getChart(ctx2);
    if (existingChart2) {
      existingChart2.destroy();
    }
    new ChartAuto(ctx2, {
      type: "doughnut",
      data: {
        labels: [
          "การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 1",
          "การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 2",
          "อบรมให้การปรึกษา",
          "การให้การปรึกษาตามแนวซาเทียร์",
          "การให้การปรึกษาสำหรับอาจารย์ใหม่ online"
        ],
        datasets: [
          {
            label: "Quantity",
            data: [68, 0, 108, 0, 130],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 20,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
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
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="cardBox">
        <div className="carddash">
          <div>
            <div className="numbers">1,504</div>
            <div className="cardName">Daily Views</div>
          </div>

          <div className="iconBx">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="numbers">1,018</div>
            <div className="cardName">Enrolled</div>
          </div>

          <div className="iconBx">
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="numbers">486</div>
            <div className="cardName">Not yet enrolled</div>
          </div>

          <div className="iconBx">
            <ion-icon name="close-outline"></ion-icon>
          </div>
        </div>

        <div className="carddash">
          <div>
            <div className="numbers">284</div>
            <div className="cardName">Comments</div>
          </div>
          <div className="iconBx">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </div>
        </div>
      </div>
      {/* ส่วน Recommend Course และ Course Registered */}
      <div className="dashboard-container">
        <div className="recommend-course-container">
          {/*Recommend Course start*/}
          <div className="details d-flex row">
            <div className="recentOrders col-8">
              <div className="cardHeader ">
                <h2>Recommend Course</h2>
                <Link to="/">View All</Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <td>Course name</td>
                    <td>Training location</td>
                    <td>Quantity</td>
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
                    <td>
                      <span className="status pending">Waiting</span>
                    </td>
                  </tr>
                  <tr>
                    <td>อบรมให้การปรึกษา (Basic Counseling)</td>
                    <td>ห้องประชุม 4 อาคารนวัตกรรม</td>
                    <td>108</td>
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
                    <td>
                      <span className="status delivered">Opening</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* ================= New Customers ================ */}
            <div className="recentCustomers col-4">
              <div className="cardHeader">
                <h2
                  style={{
                    color: "#E60073",
                  }}
                >
                  Course registered
                </h2>
              </div>

              <table>
                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      David <br /> <span>Italy</span>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td width="60px">
                    <div className="imgBx">
                      <img src="img\profile\profile_test.jpg" alt="" />
                    </div>
                  </td>
                  <td>
                    <h4>
                      Amit <br /> <span>India</span>
                    </h4>
                  </td>
                </tr>
              </table>
            </div>

          </div>

          {/*Recommend Course End*/}
        </div>

      </div>
      {/* Charts */}
      <div className="chart-card-container">
        <div className="chart-card">
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
        <div className="chart-card">
          <canvas id="myChart1" width="400" height="400"></canvas>
        </div>
      </div>
      {/* Charts End */}
    </Main>
  );
}

export default Dashboard;