import React, { useState, useEffect } from "react";
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
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "test 1",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
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
  }, []);

  useEffect(() => {
    const ctx2 = document.getElementById("myChart1").getContext("2d");
    const existingChart2 = ChartAuto.getChart(ctx2);
    if (existingChart2) {
      existingChart2.destroy();
    }
    new ChartAuto(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
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
      },
    });
  }, []);

  return (
    <Main>
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
            <div className="numbers">80</div>
            <div className="cardName">Sales</div>
          </div>

          <div className="iconBx">
            <ion-icon name="cart-outline"></ion-icon>
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

        <div className="carddash">
          <div>
            <div className="numbers">$7,842</div>
            <div className="cardName">Earning</div>
          </div>

          <div className="iconBx">
            <ion-icon name="cash-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div className="chart-card-container">
        <div className="chart-card">
          <canvas
            id="myChart"
            style={{ width: "100%", height: "100%" }}
          ></canvas>
        </div>
        <div className="chart-card">
          <canvas
            id="myChart1"
            style={{ width: "100%", height: "100%" }}
          ></canvas>
        </div>
      </div>

      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2
              style={{
                color: "#E60073",
              }}
            >
              Recent Orders
            </h2>
            <a
              href="#"
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#E60073",
                color: "#fff",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              View All
            </a>
          </div>

          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Payment</td>
                <td>Status</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Star Refrigerator</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status delivered">Delivered</span>
                </td>
              </tr>

              <tr>
                <td>Dell Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>

              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>

              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td>
                  <span className="status inProgress">In Progress</span>
                </td>
              </tr>

              <tr>
                <td>Star Refrigerator</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status delivered">Delivered</span>
                </td>
              </tr>

              <tr>
                <td>Dell Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>

              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>

              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td>
                  <span className="status inProgress">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ================= New Customers ================ */}
        <div className="recentCustomers">
          <div className="cardHeader">
            <h2
              style={{
                color: "#E60073",
              }}
            >
              Recent Customers
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
    </Main>
  );
}

export default Dashboard;
