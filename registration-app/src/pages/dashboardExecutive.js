import React from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";

function DashboardExecutive() {
  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5 justify-content-center">
          {/* Centered content */}
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
              >
                Dashboard Executive
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Recommend Course start */}
      <div className="details d-flex">
        <div className="recentOrders">
          <div className="cardHeader ">
            <h2>Recommend Course</h2>
            <Link to="/">View All</Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <td>Course name</td>
                <td>Training location</td>
                <td>Quantity</td>
                <td className="text-center">subordinate</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 1
                </td>
                <td>ห้องประชุม 1 ชั้น 2 อาคารวิจัย</td>
                <td>68</td>
                <td className="text-center">10</td> {/* Centered column */}
                <td>
                      <span className="status delivered">Opening</span>
                    </td>
              </tr>
              <tr>
                <td>
                  การให้การปรึกษาสำหรับอาจารย์ที่ปรึกษา รุ่นที่ 2
                </td>
                <td>ห้องประชุม 1 ชั้น 2 อาคารวิจัย</td>
                <td>0</td>
                <td className="text-center">12</td> {/* Centered column */}
                <td>
                      <span className="status pending">Waiting</span>
                    </td>
              </tr>
              <tr>
                <td>อบรมให้การปรึกษา (Basic Counseling)</td>
                <td>ห้องประชุม 4 อาคารนวัตกรรม</td>
                <td>108</td>
                <td className="text-center">25</td> {/* Centered column */}
                <td>
                      <span className="status delivered">Opening</span>
                    </td>
              </tr>
              <tr>
                <td>การให้การปรึกษาตามแนวซาเทียร์</td>
                <td>ห้องประชุมหัวตะพาน โรงพยาบาลศูนย์การแพทย์</td>
                <td>0</td>
                <td className="text-center">0</td> {/* Centered column */}
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
                <td className="text-center">20</td> {/* Centered column */}
                <td>
                      <span className="status delivered">Opening</span>
                    </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*Recommend Course End*/}
    </Main>
  );
}

export default DashboardExecutive;
