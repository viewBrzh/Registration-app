import React, { useState, useEffect } from 'react';
import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Course(props) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:11230/course')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const sortedCourses = data.sort((a, b) => {
                    const dateA = new Date(a.start_date);
                    const dateB = new Date(b.start_date);
                    return dateA - dateB;
                });
                setCourses(sortedCourses);
            })
            .catch(error => console.error('Error fetching data:', error));

    },[]);

    const isEnrollmentDisabled = (startDate) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const courseStartDate = new Date(startDate);
        return courseStartDate < today;
    };

    return (
        <Main>
            {/* Your existing code for the page header */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-title text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px" }}>
                        <p className="fs-5 fw-medium fst-italic text-primary">คอร์สต่างๆ</p>
                        <h1 className="display-6">สามารถเลือกลงคอร์สที่คุณสนใจได้เลย</h1>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Start Date</th>
                                    <th>Finish Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.train_course_id}>
                                        <td>{course.course_detail_name}</td>
                                        <td>{course.start_date}</td>
                                        <td>{course.finish_date}</td>
                                        <td>
                                            <Link to={`/detail/${course.train_course_id}`} className="btn btn-primary btn-sm">
                                                Detail
                                            </Link>
                                            <Link to={`/enroll`} className={`btn btn-dark btn-sm ${isEnrollmentDisabled(course.start_date) ? 'disabled' : ''}`}>
                                                Enroll
                                            </Link>
                                        </td>
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
export default Course;
