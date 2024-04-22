import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { useParams } from "react-router-dom";
import { exportEnrollToExcel } from "../components/excelUtils"; // Assuming exportToExcel is in the same directory as this file

function EnrollManage() {
  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState({});
  const { courseId } = useParams();
  const [course, setCourse] = useState();

  useEffect(() => {
    fetch(`http://localhost:11230/enroll/get-byCourse/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setEnrollments(data);

        const userIds = data?.map((enrollment) => enrollment.user_id);
        userIds?.forEach((userId) => {
          fetch(`http://localhost:11230/users/${userId}`)
            .then((response) => response.json())
            .then((userData) => {
              setUsers((prevUsers) => ({
                ...prevUsers,
                [userId]: userData[0],
              }));
            });
        });
      });
    console.log(enrollments);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:11230/course/get-data/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data[0]);
      });
  }, []);

  const handleDownload = () => {
    const dataToExport = formatDataForDownload(enrollments, users);
    exportEnrollToExcel(dataToExport);
  };

  const handleDelete = (enrollId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to DELETE this course? This process is permanent."
    );
    if (confirmDelete) {
      fetch(`http://localhost:11230/enroll/delete/${enrollId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // If deletion is successful, remove the enrollment from the state
            const updatedEnrollments = enrollments.filter(enrollment => enrollment.enroll_id !== enrollId);
            setEnrollments(updatedEnrollments);
          } else {
            // Handle error
            console.error('Failed to delete enrollment');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
            <h2 className="text-center">Course: {course?.course_detail_name}</h2>
          </div>
          <div className="col-auto d-flex align-items-center">
            {enrollments !== null && enrollments.length > 0 && (<button className="btn btn-primary me-3" style={{ height: 37.6, width: 150 }} onClick={handleDownload}>Download</button>)}
          </div>
        </div>

        <div className="row">
          {isNull(enrollments) ? (
            <div className="text-center">No Enrollment Yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Department</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments?.map((enrollment, index) => (
                    <tr key={enrollment.user_id}>
                      <td>{index + 1}</td>
                      <td>{users[enrollment.user_id]?.username}</td>
                      <td>{users[enrollment.user_id]?.email}</td>
                      <td>{users[enrollment.user_id]?.department}</td>
                      <td>{new Date(enrollment.enroll_date).toLocaleDateString('en-GB')}</td>
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
        </div>
      </div>
    </Main>
  );
}

export default EnrollManage;

function formatDataForDownload(enrollments, users) {
  return enrollments.map((enrollment, index) => {
    return {
      "#": index + 1,
      "Username": users[enrollment.user_id]?.username,
      "Email": users[enrollment.user_id]?.email,
      "Department": users[enrollment.user_id]?.department,
      "Date": new Date(enrollment.enroll_date).toLocaleDateString('en-GB')
    };
  });
}

function isNull(value) {
  return value === null;
}
