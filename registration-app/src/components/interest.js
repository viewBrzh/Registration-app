import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "../api/apiConfig";

const Interest = () => {
    const [interest, setInterest] = useState([]);
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const [hasCompletedBasic, setHasCompletedBasic] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterest = async () => {
            try {
                const response = await fetch(`${apiUrl}/interest/get/${storedUserData.user_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch interest');
                }
                const data = await response.json();
                setInterest(data[0].skills.split(', '));
            } catch (error) {
                console.error('Error fetching interest:', error);
            }
        };

        fetchInterest();

        fetch(`${apiUrl}/enroll/getUserHistory/${storedUserData.user_id}`)
            .then((response) => response.json())
            .then((data) => {
                setCourses(data.courses);

                const hasCompleted = data.courses?.some(
                    (enrollment) => enrollment.course_id === 1 && enrollment.status === 1
                );
                setHasCompletedBasic(hasCompleted);
            })
            .catch((error) => console.error("Error fetching user history:", error));

        const currentYearBE = new Date().getFullYear() + 543;

        fetch(`${apiUrl}/course/courseByYear/${currentYearBE}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(async (data) => {
                let filtered;
                if (hasCompletedBasic) {
                    filtered = data?.filter(fcourse =>
                        fcourse.skills && fcourse.skills.split(', ').some(skill => interest?.includes(skill)) &&
                        fcourse.course_id === 2 && fcourse.isPublish === 1
                    );
                    setFilteredCourses(filtered)
                    console.log(filtered);
                } else {
                    filtered = data.filter(fcourse =>
                        fcourse.skills && fcourse.skills.split(', ').some(skill => interest?.includes(skill)) &&
                        fcourse.course_id === 1 && fcourse.isPublish === 1
                    );
                    setFilteredCourses(filtered)
                    console.log(filtered);
                }
            
                const counts = await Promise.all(
                    filtered.map(async (course) => {
                        const enrollResponse = await fetch(`${apiUrl}/enroll/getEnrollCount/${course.train_course_id}`);
                        const enrollData = await enrollResponse?.json();
                        return { courseId: course.train_course_id, count: enrollData.count };
                    })
                );
            
                setFilteredCourses((prevCourses) =>
                    prevCourses.map((course) => {
                        const countObj = counts?.find((count) => count.courseId === course.train_course_id);
                        return { ...course, count: countObj ? countObj.count : 0 };
                    })
                );
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, [storedUserData.user_id, interest.skills, hasCompletedBasic]);

    const formatDate = (start_date, finish_date) => {
        const toBuddhistEra = (year) => {
            return year + 543;
        };

        const formatBEYear = (date) => {
            const year = toBuddhistEra(date.getFullYear());
            return date.toLocaleDateString("en-GB").replace(date.getFullYear(), year);
        };

        if (start_date === finish_date) {
            return formatBEYear(new Date(start_date));
        } else {
            return `${formatBEYear(new Date(start_date))} - ${formatBEYear(new Date(finish_date))}`;
        }
    };

    const handleCardClick = (courseId) => {
        navigate(`/detail/${courseId}`);
    }


    return (
        <>
            {filteredCourses.length > 0 && <div id="recommend" className="container section">
                <br></br>
                <div className="row justify-content-center mb-4">
                    <h2 className="text-center">Reccomend for you</h2>
                </div>
                <div className="row justify-content-center section">
                    {filteredCourses?.map((course) => (
                        <div className="col-lg-3" key={course.train_course_id}>
                            <div className="properties properties2 mb-30 center-div" style={{ marginBottom: "20px", position: "relative" }}>
                                <div className="properties__card" onClick={() => handleCardClick(course.train_course_id)} style={{ height: "440px", border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                                    <div className="properties__img overlay1" style={{ position: "relative" }}>
                                        <Link to={`/detail/${course.train_course_id}`}>
                                            <img src={`${apiUrl}/images/${course.image}`} alt="" />
                                        </Link>
                                        <div className="course-type">{course.course_id == 1 ? "Basic" : "Retreat"}</div>
                                        <div className="people-icon">
                                            <i className="bi bi-people"></i>
                                            <span className="people-count">{course.count} / {course.limit}</span>
                                        </div>
                                    </div>
                                    <div className="properties__caption">
                                        <h5>
                                            <Link to={`/detail/${course.train_course_id}`}>
                                                {course.course_detail_name.length > 63
                                                    ? `${course.course_detail_name.substring(0, 63)}...`
                                                    : course.course_detail_name}
                                            </Link>
                                        </h5>
                                        <p>{course.train_detail}</p>
                                        <div className="properties__skill" >
                                            <span>{course.skills.length > 50
                                                ? `${course.skills.substring(0, 50)}...`
                                                : course.skills}</span>
                                        </div>

                                        <div className="properties__footer">
                                            <div className="date" style={{ color: "gray" }}>
                                                <span>
                                                    <p>Enroll {formatDate(course.start_enroll_date, course.end_enroll_date)}</p>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="properties__footer">
                                            <div className="date" style={{ color: "gray" }}>
                                                <p> Training {formatDate(course.start_date, course.finish_date)}</p>
                                            </div>
                                        </div>
                                        <div className="location">
                                            <span>
                                                <p>
                                                    {course.train_place.length > 50
                                                        ? `${course.train_place.substring(0, 50)}...`
                                                        : course.train_place}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
};

export default Interest;
