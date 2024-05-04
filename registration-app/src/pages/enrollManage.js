import React, { useState, useEffect, useRef } from "react";
import Main from "../layouts/main";
import { useParams } from "react-router-dom";
import { exportEnrollToExcel } from "../components/excelUtils";
import apiUrl from "../api/apiConfig";
import DownloadButton from "../components/downloadButton";

// Define a constant for the number of items per page
const ITEMS_PER_PAGE = 25;

function EnrollManage() {
  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState({});
  const { courseId } = useParams();
  const [course, setCourse] = useState();

  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(false);
  const searchWrapperRef = useRef(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");

  const toggleSearch = () => {
    setIsActive((prevState) => !prevState);
    if (!isActive) {
      setSearchQuery("");
      setFilteredEnrollments(enrollments);
    }
  };

  const handleInputChange = (evt) => {
    setSearchQuery(evt.target.value);
    filterEnrollments(evt.target.value, selectedDepartment);
  };

  const handleClickOutside = (evt) => {
    if (searchWrapperRef.current && !searchWrapperRef.current.contains(evt.target)) {
      setIsActive(false);
    }
  };

  const handleDepartmentChange = (evt) => {
    setSelectedDepartment(evt.target.value);
    filterEnrollments(searchQuery, evt.target.value);
  };

  const handleStatusChange = (enrollId, newStatus) => {
    fetch(`${apiUrl}/enroll/updateEnrollStatus/${enrollId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(response => {
        if (response.ok) {
          const updatedEnrollments = enrollments.map(enrollment =>
            enrollment.enroll_id === enrollId ? { ...enrollment, status: newStatus } : enrollment
          );
          setEnrollments(updatedEnrollments);
        } else {
          console.error('Failed to update status');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const filterEnrollments = (query, department) => {
    let filteredData = enrollments;

    if (query) {
      filteredData = filteredData.filter((enrollment) =>
        users[enrollment.user_id]?.username.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (department) {
      filteredData = filteredData.filter((enrollment) =>
        users[enrollment.user_id]?.department === department
      );
    }

    setFilteredEnrollments(filteredData);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/enroll/get-byCourse/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setEnrollments(data);

        const userIds = data?.map((enrollment) => enrollment.user_id);
        userIds?.forEach((userId) => {
          fetch(`${apiUrl}/user/${userId}`)
            .then((response) => response.json())
            .then((userData) => {
              setUsers((prevUsers) => ({
                ...prevUsers,
                [userId]: userData[0],
              }));
            });
        });
      });
  }, [courseId]);

  useEffect(() => {
    fetch(`${apiUrl}/course/get-data/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data[0]);
      });
  }, [courseId]);

  useEffect(() => {
    filterEnrollments(searchQuery, selectedDepartment);
  }, [enrollments, searchQuery, selectedDepartment]);

  const handleDownload = () => {
    const dataToExport = formatDataForDownload(filteredEnrollments, users);
    exportEnrollToExcel(dataToExport);
  };

  const handleDelete = (enrollId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to DELETE this course? This process is permanent."
    );
    if (confirmDelete) {
      fetch(`${apiUrl}/enroll/delete/${enrollId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            const updatedEnrollments = enrollments.filter(enrollment => enrollment.enroll_id !== enrollId);
            setEnrollments(updatedEnrollments);
          } else {
            console.error('Failed to delete enrollment');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredEnrollments?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnrollments?.length / ITEMS_PER_PAGE);

  const handleClick = (type) => {
    if (type === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (type === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const handleMarkAllFinish = () => {
    const confirm = window.confirm('Are you sure you want to mark all enrollments as Finish?');

    if (confirm) {
      const updatedEnrollments = filteredEnrollments.map(enrollment => ({
        ...enrollment,
        status: 1 // 1 represents the status for Finish
      }));

      Promise.all(updatedEnrollments.map(enrollment =>
        fetch(`${apiUrl}/enroll/updateEnrollStatus/${enrollment.enroll_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: enrollment.status })
        })
          .then(response => response.json())
          .catch(error => console.error('Error:', error))
      ))
        .then(() => {
          setEnrollments(enrollments => enrollments.map(enrollment =>
            updatedEnrollments.find(updatedEnrollment => updatedEnrollment.enroll_id === enrollment.enroll_id) || enrollment
          ));
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <Main>
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn hero-section" data-wow-delay="0.1s">
        {/* Content */}
      </div>

      <div className="container">
        <div className="row justify-content-between align-items-center mb-4">
          <div className="col-auto">
            <h2 className="text-center">Course: {course?.course_detail_name}</h2>
          </div>
          <div className="col-auto d-flex align-items-center">
            {enrollments !== null && enrollments.length > 0 && (
              <>
                <select
                  id="departmentFilter"
                  className="form-select me-2"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">All Departments</option>
                  {Object.values(users)
                    .reduce((acc, user) => {
                      if (!acc.includes(user.department)) {
                        acc.push(user.department);
                      }
                      return acc;
                    }, [])
                    .map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                </select>
              </>
            )}
            <DownloadButton onClick={handleDownload} />
          </div>
        </div>

        <div className="row">
          {currentItems?.length === 0 ? (
            <div className="text-center">No Enrollment Yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Department</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((enrollment, index) => (
                    <tr key={enrollment.user_id}>
                      <td>{index + 1}</td>
                      <td>{users[enrollment.user_id]?.username}</td>
                      <td>{users[enrollment.user_id]?.email}</td>
                      <td>{users[enrollment.user_id]?.phone}</td>
                      <td>{users[enrollment.user_id]?.department}</td>
                      <td>{new Date(enrollment.enroll_date).toLocaleDateString('en-GB')}</td>
                      <td>
                        <select
                          value={enrollment.status}
                          onChange={(e) => handleStatusChange(enrollment.enroll_id, e.target.value)}
                        >
                          <option value="0">Waiting</option>
                          <option value="1">Finish</option>
                          <option value="2">Failed</option>
                        </select>
                      </td>
                      <td>
                        <div className="btn-group" role="group" style={{ marginRight: '5px', marginBottom: '5px' }}>
                          <button onClick={() => handleDelete(enrollment.enroll_id)} className="btn btn-sm btn-danger" aria-label="Delete">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handleClick('prev')} tabIndex="-1">Previous</button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">{currentPage} / {totalPages}</span>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handleClick('next')}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className='row justify-content-end'>
          <div className='col-auto'>
            <button className="btn btn-primary" onClick={handleMarkAllFinish}>Mark all Finish</button>
          </div>
        </div>
      </div>



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

export default EnrollManage;

function formatDataForDownload(enrollments, users) {
  return enrollments.map((enrollment, index) => {
    let statusText = "";
    switch (enrollment.status) {
      case 0:
        statusText = "Waiting";
        break;
      case 1:
        statusText = "Finish";
        break;
      case 2:
        statusText = "Failed";
        break;
      default:
        statusText = "Unknown";
    }

    return {
      "#": index + 1,
      "Username": users[enrollment.user_id]?.username,
      "Email": users[enrollment.user_id]?.email,
      "Phone": users[enrollment.user_id]?.phone,
      "Department": users[enrollment.user_id]?.department,
      "Date": new Date(enrollment.enroll_date).toLocaleDateString('en-GB'),
      "Status": statusText
    };
  });
}

