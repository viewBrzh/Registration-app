import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useParams } from "react-router-dom";

function EnrollManage() {
  const [enrollments, setEnrollments] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:11230/enroll/get-byCourse/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setEnrollments(data);
      });
  }, []);

  return (
    <Main>
      <div className="container">
        <div className="row">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Enrollment ID</th>
                  <th scope="col">Course ID</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.enroll_id}>
                    <td>{enrollment.enroll_id}</td>
                    <td>{enrollment.train_course_id}</td>
                    <td>{enrollment.user_id}</td>
                    <td>{enrollment.enroll_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
}
export default EnrollManage;
