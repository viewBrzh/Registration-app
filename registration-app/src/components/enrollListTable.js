import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiUrl from "../api/apiConfig";

// Define a constant for the number of items per page
const ITEMS_PER_PAGE = 5;

const EnrollListTable = ({ courseId }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [users, setUsers] = useState({});
    const [course, setCourse] = useState();

    const [filteredEnrollments, setFilteredEnrollments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isActive, setIsActive] = useState(false);
    const searchWrapperRef = useRef(null);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleClickOutside = (evt) => {
        if (searchWrapperRef.current && !searchWrapperRef.current.contains(evt.target)) {
            setIsActive(false);
        }
    };

    const handleDepartmentChange = (evt) => {
        setSelectedDepartment(evt.target.value);
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

    return (
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
                                        <td>{formatDate(enrollment.enroll_date)}</td>
                                        <td>
                                            <span
                                                className={`status ${enrollment.status === 0
                                                    ? "waiting"
                                                    : enrollment.status === 1
                                                        ? "finish"
                                                        : "failed"
                                                    }`}
                                            >
                                                {enrollment.status === 0
                                                    ? "waiting"
                                                    : enrollment.status === 1
                                                        ? "finish"
                                                        : "failed"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-end align-items-center">
                <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleClick("prev")}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-sm btn-outline-primary ms-2"
                    onClick={() => handleClick("next")}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EnrollListTable;


const formatDate = (date) => {
    const thaiYear = (new Date(date).getFullYear() + 543).toString(); // Get the last two digits of the Buddhist Era year
    return new Date(date).toLocaleDateString("en-GB").replace(new Date(date).getFullYear(), thaiYear);
};
