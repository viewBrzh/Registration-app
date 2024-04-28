import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../api/apiConfig';
import Quantity from './quantity';

const CourseTable = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/course/get-all`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCourses(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const totalPages = Math.ceil(courses.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCourses = courses.slice(startIndex, endIndex);

    const renderTableData = () => {
        return currentCourses.map((course, index) => {
            const { course_detail_name, train_place, train_course_id, isPublish, start_date } = course;
            return (
                <tr key={index}>
                    <td>{train_course_id}</td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course_detail_name}</td>
                    <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{train_place}</td>
                    <td>{new Date(start_date).toLocaleDateString('en-GB')}</td>
                    <td>
                        <Quantity courseId={train_course_id} />
                    </td>
                    <td>
                        <span className={`status ${isPublish ? 'delivered' : 'pending'}`}>
                            {isPublish ? 'Opening' : 'Closing'}
                        </span>                    
                    </td>
                </tr>
            );
        });
    };


    return (

        <div className="details d-flex">
            <div className="recentOrders">
                <div className="cardHeader ">
                    <h2>Course</h2>
                    <Link to="/manage">View All</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>Course name</td>
                            <td>Training location</td>
                            <td>Date</td>
                            <td>Enrollment</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>{loading ? <tr><td colSpan="5">Loading...</td></tr> : renderTableData()}</tbody>
                </table>
                {/* Pagination */}
                <div>
                    <button className={`btn previous-btn ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo; Previous
                    </button>
                    <span className='btn pagination-span'> {currentPage} of {totalPages} </span>
                    <button className={`next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                       Next &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseTable;
