import React, { useRef, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { Chart as ChartAuto } from "chart.js/auto";

function DashboardAdmin() {
  // Refs for the chart canvases
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  // Chart data for the first chart
  const data1 = {
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

  // Chart options for the first chart
  const options1 = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    // other options...
  };

  // Chart data for the second chart
  const data2 = {
    labels: ["Department 1", "Department 2", "Department 3"], // Sample labels
    datasets: [
      {
        label: "Department Data",
        data: [50, 70, 40], // Sample data
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for the second chart
  const options2 = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    // other options...
  };

  // Create or update charts on component mount or data change
  useEffect(() => {
    if (chartRef1.current) {
      const ctx1 = chartRef1.current.getContext("2d");

      // Check if chart instance exists, destroy it before creating a new one
      if (chartRef1.current.chart) {
        chartRef1.current.chart.destroy();
      }

      chartRef1.current.chart = new ChartAuto(ctx1, {
        type: "bar",
        data: data1,
        options: options1,
      });
    }

    if (chartRef2.current) {
      const ctx2 = chartRef2.current.getContext("2d");

      // Check if chart instance exists, destroy it before creating a new one
      if (chartRef2.current.chart) {
        chartRef2.current.chart.destroy();
      }

      chartRef2.current.chart = new ChartAuto(ctx2, {
        type: "bar",
        data: data2,
        options: options2,
      });
    }
  }, [data1, options1, data2, options2]);

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
          {/*Course */}
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
          {/* Course End */}

          {/* Bar Chart */}
          <div className="col-lg-6 ">
            <div className="details d-flex">
              <div className="recentOrders">
                <div className="cardHeader"><h2>Quantity Chart</h2></div>
                <br></br> 
                <div className="chart-container">
                  <canvas ref={chartRef1} id="courseStatusChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 mb-5 wow fadeIn">
        <div className="details d-flex">
              <div className="recentOrders">
                <div className="cardHeader"><h2>Quantity Chart</h2></div>
                <br></br> 
                <div className="chart-container">
                  <canvas ref={chartRef2} id="coursedepartment"></canvas>
                </div>
              </div>
            </div>
      </div>
      
    </Main>
  );
}

export default DashboardAdmin;
