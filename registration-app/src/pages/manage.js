import React, { useState, useRef, useEffect } from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { exportToExcel } from "../components/excelUtils";
import apiUrl from "../api/apiConfig";
import DownloadButton from "../components/downloadButton";
import Quantity from "../components/quantity";

function Manage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isPublishStatus, setIsPublishStatus] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const searchWrapperRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const handleDownload = () => {
    exportToExcel(filteredCourses, isPublishStatus);
  };

  const handleCheckboxChange = (courseId) => {
    // Toggle the selectedCourses array
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }

    // Update the isPublish status in the state
    const updatedIsPublishStatus = {
      ...isPublishStatus,
      [courseId]: !isPublishStatus[courseId],
    };
    setIsPublishStatus(updatedIsPublishStatus);

    // Make a request to update the isPublish status in the database
    fetch(`${apiUrl}/course/set-publish/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isPublish: updatedIsPublishStatus[courseId] ? 1 : 0 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Publish status updated successfully:", data);
        // Handle success
      })
      .catch((error) => {
        console.error("Error updating publish status:", error);
      });
  };

  const toggleSearch = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleInputChange = (evt) => {
    setSearchQuery(evt.target.value);
    // Implement your search logic here
  };

  const handleClickOutside = (evt) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(evt.target)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/course/get-all`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);

        const initialPublishStatus = {};
        if (data != null) {
          data?.forEach((course) => {
            initialPublishStatus[course.train_course_id] = course.isPublish === 1;
          })
        }
        setIsPublishStatus(initialPublishStatus);
      });
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredCourses(courses);
    } else if (filter === "basic") {
      setFilteredCourses(courses?.filter((course) => course.course_id === 1));
    } else if (filter === "retreat") {
      setFilteredCourses(courses?.filter((course) => course.course_id === 2));
    }
  }, [courses, filter]);

  const handleDelete = (cid) => {
    console.log("Deleting course with ID:", cid);
    const confirmDelete = window.confirm(
      "Are you sure you want to DELETE this course? This process is permanent."
    );
    if (confirmDelete) {
      fetch(`${apiUrl}/course/delete/${cid}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Course deleted successfully:", data);
          // Handle success, e.g., remove the deleted course from state
          setCourses(
            courses.filter((course) => course.train_course_id !== cid)
          );
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
        });
    } else {
      console.log("Delete operation cancelled.");
    }
  };

  const handleFilterChange = (evt) => {
    setFilter(evt.target.value);
    setCurrentPage(1); // Reset current page to 1 when filter changes
  };

  const filteredCoursesByName = filteredCourses?.filter((course) =>
    course.course_detail_name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoursesByName.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredCoursesByName.length / itemsPerPage);

  const handleClick = (type) => {
    if (type === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (type === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  return (
    <Main>
      {/* Hero Section */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn hero-section" data-wow-delay="0.1s">
        {/* Content */}
      </div>

      <div className="container">
        <div className="row justify-content-between align-items-center mb-4">
          <div className="col-auto">
            <h2 className="text-center">Manage Courses</h2>
          </div>
          <div className="col-auto d-flex align-items-center">
            <DownloadButton className="download-button" onClick={handleDownload}></DownloadButton>
            <p style={{ paddingRight: '5px' }}> </p>

            <select className="form-select" value={filter} onChange={handleFilterChange}>
              <option value="all">All Courses</option>
              <option value="basic">Basic Courses</option>
              <option value="retreat">Retreat Courses</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th scope="col" className="pink-th" style={{ width: '2%' }}>id</th>
                  <th scope="col" className="pink-th" style={{ width: '12%' }}>Course Name</th>
                  <th scope="col" className="pink-th" style={{ width: '24%' }}>Description</th>
                  <th scope="col" className="pink-th" style={{ width: '8%' }}>Start Date</th>
                  <th scope="col" className="pink-th" style={{ width: '8%' }}>End Date</th>
                  <th scope="col" className="pink-th" style={{ width: '10%' }}>Place</th>
                  <th scope="col" className="pink-th" style={{ width: '6%' }}>Course Type</th>
                  <th scope="col" className="pink-th" style={{ width: '8%' }}>Enrollments</th>
                  <th scope="col" className="pink-th" style={{ width: '8%' }}>Publish Status</th>
                  <th scope="col" className="pink-th" style={{ width: '14%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((course) => (
                  <tr key={course.train_course_id}>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>{course.train_course_id}</td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>{course.course_detail_name}</td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>{course.train_detail}</td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>{new Date(course.start_date).toLocaleDateString('en-GB')}</td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>{new Date(course.finish_date).toLocaleDateString('en-GB')}</td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>{course.train_place}</td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>{course.course_id === 1 ? "Basic" : "Retreat"}</td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}><Quantity courseId={course.train_course_id} /></td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>
                      <label className="switch">
                        <input
                          id={`publish-checkbox-${course.train_course_id}`}
                          type="checkbox"
                          checked={isPublishStatus[course.train_course_id]}
                          onChange={() => handleCheckboxChange(course.train_course_id)}
                        />
                        <div className="slider">
                          <div className="circle">
                            <svg
                              className="cross"
                              xmlSpace="preserve"
                              style={{ enableBackground: "new 0 0 512 512" }}
                              viewBox="0 0 365.696 365.696"
                              y="0"
                              x="0"
                              height="6"
                              width="6"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path
                                  data-original="#000000"
                                  fill="currentColor"
                                  d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                                ></path>
                              </g>
                            </svg>
                            <svg
                              className="checkmark"
                              xmlSpace="preserve"
                              style={{ enableBackground: "new 0 0 512 512" }}
                              viewBox="0 0 24 24"
                              y="0"
                              x="0"
                              height="10"
                              width="10"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path
                                  className=""
                                  data-original="#000000"
                                  fill="currentColor"
                                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </label>
                    </td>
                    <td style={{ borderBottom: '1px solid #D3D3D3' }}>
                      <div className="btn-group" role="group" style={{ marginRight: '5px', marginBottom: '5px' }}>
                        <Link to={`/detail/${course.train_course_id}`}>
                          <button className="btn btn-sm  btn-secondary" aria-label="Detail">
                            <i className="bi bi-eye"></i>
                          </button>
                        </Link>
                      </div>
                      <div className="btn-group" role="group" style={{ marginRight: '5px', marginBottom: '5px' }}>
                        <Link to={`/enrollManage/${course.train_course_id}`}>
                          <button className="btn btn-sm btn-info" aria-label="View Students">
                            <i className="bi bi-people"></i>
                          </button>
                        </Link>
                      </div>
                      <div className="btn-group" role="group" style={{ marginRight: '5px', marginBottom: '5px' }}>
                        <Link to={`/update/${course.train_course_id}`}>
                          <button className="btn btn-sm btn-primary" aria-label="Edit">
                            <i className="bi bi-pencil"></i>
                          </button>
                        </Link>
                      </div>
                      <div className="btn-group" role="group" style={{ marginRight: '5px', marginBottom: '5px' }}>
                        <button onClick={() => handleDelete(course.train_course_id)} className="btn btn-sm btn-danger" aria-label="Delete">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col">
            <div className="pagination">
              <button href="#" onClick={() => handleClick("prev")} className={`previous-btn ${currentPage === 1 ? 'disabled' : ''}`} disabled={currentPage === 1}>
                &laquo; Previous
              </button>
              <span style={{padding: '5px'}} className="btn pagination-span"> Page {currentPage} of {totalPages} </span>
              <button href="#" onClick={() => handleClick("next")} className={`next-btn ${currentPage === totalPages ? 'disabled' : ''}`} disabled={currentPage === totalPages}>
                Next &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Courses Section End */}

      <Link to={"/insert"}><a className="circle-button">+</a></Link>

      <a>
        <div ref={searchWrapperRef} className={`search-wrapper ${isActive ? "active" : ""}`}>
          <div className="input-holder">
            <input type="text" className="search-input" placeholder="Type to search" value={searchQuery} onChange={handleInputChange} autoFocus={isActive} />
            <button className="search-icon" onClick={toggleSearch}><span></span></button>
          </div>
          <span className="close" onClick={toggleSearch}></span>
        </div>
      </a>
    </Main>
  );
}

export default Manage;
