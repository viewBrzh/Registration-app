import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiUrl from "../api/apiConfig";
import Quantity from "./quantity";
import EnrollListTable from "./enrollListTable";

const CourseTableEx = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const storedYear = JSON.parse(localStorage.getItem("selectedYear"));
  const [showEnroll, setShowEnroll] = useState(false);
  const [courseId, setCourseId] = useState(0);

  const handleTableClick = (course_id) => {
    setCourseId(course_id);
    setShowEnroll(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/course/courseByYear/${storedYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCourses(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  const formatDate = (date) => {
    const thaiYear = (new Date(date).getFullYear() + 543).toString(); // Get the last two digits of the Buddhist Era year
    return new Date(date)
      .toLocaleDateString("en-GB")
      .replace(new Date(date).getFullYear(), thaiYear);
  };

  const renderTableData = () => {
    return currentCourses.length > 0 ? (
      currentCourses.map((course, index) => {
        const {
          course_detail_name,
          train_place,
          train_course_id,
          isPublish,
          start_date,
        } = course;
        return (
          <tr
            key={index}
            style={{ textAlign: "left" }}
            onClick={() => handleTableClick(train_course_id)}
            className="link-tr"
          >
            <td style={{ textAlign: "left" }}>{train_course_id}</td>
            <td style={{ textAlign: "left" }}>
              {course_detail_name.length > 50
                ? `${course_detail_name.substring(0, 50)}...`
                : course_detail_name}
            </td>
            <td style={{ textAlign: "left" }}>
              {train_place.length > 40
                ? `${train_place.substring(0, 40)}...`
                : train_place}
            </td>
            <td style={{ textAlign: "left" }}>{formatDate(start_date)}</td>
            <td style={{ textAlign: "left" }}>
              <Quantity courseId={train_course_id} />
            </td>
            <td style={{ textAlign: "left" }}>
              <span className={`status ${isPublish ? "delivered" : "pending"}`}>
                {isPublish ? "Opening" : "Closing"}
              </span>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">No course data.</td>
      </tr>
    );
  };

  return (
    <>
      <div className="details d-flex">
        <div className="recentOrders">
          <div className="cardHeader ">
            <h2>Course</h2>
            <Link to="/allcourse">View All</Link>
          </div>
          <table>
            <thead className="pink-th-table">
              <tr>
                <th scope="col" className="pink-th">
                  id
                </th>
                <th scope="col" className="pink-th">
                  Course name
                </th>
                <th scope="col" className="pink-th">
                  Training location
                </th>
                <th scope="col" className="pink-th">
                  Training Date
                </th>
                <th scope="col" className="pink-th">
                  Enrollment
                </th>
                <th scope="col" className="pink-th">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : (
                renderTableData()
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div>
            <button
              className={`btn previous-btn ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Previous
            </button>
            <span className="btn pagination-span">
              {" "}
              {currentPage} of {totalPages}{" "}
            </span>
            <button
              className={`next-btn ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>

      {showEnroll && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              margin: "auto",
              marginTop: "100px",
              maxWidth: "1000px",
            }}
          >
            <EnrollListTable courseId={courseId} />
            <br />
            <button
              className="btn btn-cancel"
              onClick={() => setShowEnroll(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseTableEx;
