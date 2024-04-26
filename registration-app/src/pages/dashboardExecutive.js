import React, { useRef, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto";

function DashboardExecutive() {
  // Ref for the chart canvas
  const chartRef = useRef(null);

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
              <li className="breadcrumb-item text-dark" aria-current="page">
                Dashboard Executive
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Content */}
      <div className="container-fluid">
        <div className="row">
          {/* Recommend Course */}
          <div className="col-lg-6">
            <div className="details d-flex">
              <div className="recentOrders">
                <div className="cardHeader ">
                  <h2>Course</h2>
                  <Link to="/">View All</Link>
                </div>
                <table>
                  <thead>
                    <tr>
                      <td>Course name</td>
                      <td>Training location</td>
                      <td>Quantity</td>
                      <td>subordinate</td>
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
          {/* Recommend Course End */}

          {/* Bar Chart */}
          <div className="col-lg-6" style={{ marginBottom: "500px" }}>
  <div className="col-lg-6 chart-container" style={{ maxWidth: "400px", margin: "0 auto", marginBottom: "100px" }}>
    <canvas ref={chartRef} id="courseStatusChart"></canvas>
  </div>
</div>


        </div>
      </div>
    </Main>
  );
}

export default DashboardExecutive;
