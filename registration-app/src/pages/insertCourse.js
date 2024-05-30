import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import FileUpload from "../components/fileUpload";
import apiUrl from '../api/apiConfig';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function InsertCourse() {
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState({
        course_detail_name: "",
        course_id: "",
        train_detail: "",
        train_place: "",
        start_date: "",
        finish_date: "",
        start_enroll_date: "",
        end_enroll_date: "",
        limit: "",
        image: ""
    });
    const [formValid, setFormValid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [courseId, setCourseId] = useState("");

    const handleNext = () => {
        setShowModal(true);
    }

    useEffect(() => {
        const isValid = Object.values(courseData).every(value => !!value);
        setFormValid(isValid);
    }, [courseData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const confirmUpdate = window.confirm("Are you sure you want to Insert this course?");
        if (confirmUpdate) {
            try {
                console.log("Inserting course with data:", courseData);
                const response = await fetch(`${apiUrl}/course/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(courseData),
                });
                const data = await response.json(); // Parse response JSON
                if (response.ok) {
                    // Handle successful insertion
                    const insertId = data.insertId[0].insertId;
                    console.log("Inserted course with ID:", insertId);
                    setCourseId(insertId);
                    setShowModal(true); // Open the modal after inserting the course
                } else {
                    console.error('Failed to insert course');
                }
            } catch (error) {
                console.error('Error inserting course:', error);
            }
        }
    };


    const handleTagSelection = (tag) => {
        if (selectedTags.includes(tag)) {
          setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        } else {
          setSelectedTags([...selectedTags, tag]);
        }
      };

    const handleSaveTags = async () => {
        try {
            const response = await fetch(`${apiUrl}/course/${courseId}/update-skills`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skills: selectedTags }),
            });
            if (response.ok) {
                // Handle successful update of skills
                console.log(courseId + selectedTags);
                const confirm = window.confirm("Skills updated successfully");
                if (confirm) {
                    navigate("/home", { replace: true });
                }

                // Update the course data with the new skills
                setCourseData((prevCourseData) => ({
                    ...prevCourseData,
                    skills: selectedTags,
                }));

                setShowModal(false); // Close the modal after updating the skills
            } else {
                console.error('Failed to update skills');
            }
        } catch (error) {
            console.error('Error updating skills:', error);
        }
    };

    return (
        <Main>
            <div className="custom-shape-divider-top-1710057287">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                        class="shape-fill"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        class="shape-fill"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        class="shape-fill"
                    ></path>
                </svg>
            </div>
            <div
                className="container mt-5"
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >

                <div className="page-content">
                    <div className="form-card-container">
                        <p className="divider">Insert course data</p>
                        <form className="form-container" onSubmit={handleSubmit}>
                            <div className="custom-input">
                                <div className="row-inputs">
                                    <div>
                                        <label htmlFor="courseType" className="input-label">
                                            Course Type
                                        </label>
                                        <div className="input-wrapper">
                                            <select id="courseType" className="input-field" value={courseData.course_id} onChange={(e) => setCourseData({ ...courseData, course_id: e.target.value })}>
                                                <option value="">Course type</option>
                                                <option value="1">Basic</option>
                                                <option value="2">Retreat</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="limit" className="input-label col-intput">
                                            Limit
                                        </label>

                                        <div className="input-wrapper">
                                            <input type="number" id="limit" className="input-field col-intput" onChange={(e) => setCourseData({ ...courseData, limit: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="custom-input">
                                <label htmlFor="name" className="input-label">
                                    Course name
                                </label>
                                <div className="input-wrapper">
                                    <input type="text" id="name" className="input-field" value={courseData.course_detail_name}
                                        onChange={(e) => setCourseData({ ...courseData, course_detail_name: e.target.value })} required />
                                </div>
                            </div>
                            <div className="custom-input">
                                <label htmlFor="details" className="input-label">
                                    Course details
                                </label>
                                <div className="input-wrapper">
                                    <input type="text" id="details" className="input-field"
                                        onChange={(e) => setCourseData({ ...courseData, train_detail: e.target.value })} />
                                </div>
                            </div>
                            <div className="custom-input">
                                <label htmlFor="location" className="input-label">
                                    Location
                                </label>
                                <div className="input-wrapper">
                                    <input type="text" id="location" className="input-field"
                                        onChange={(e) => setCourseData({ ...courseData, train_place: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="custom-input">
                                <div className="row-inputs">
                                    <div>
                                        <label htmlFor="startEnrollDate" className="input-label">
                                            Start Enrollment Date
                                        </label>
                                        <div className="input-wrapper">
                                            <input type="date" id="startEnrollDate" className="input-field" onChange={(e) => setCourseData({ ...courseData, start_enroll_date: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="endEnrollDate" className="input-label col-intput">
                                            End Enrollment Date
                                        </label>
                                        <div className="input-wrapper">
                                            <input type="date" id="endEnrollDate" className="input-field col-intput" onChange={(e) => setCourseData({ ...courseData, end_enroll_date: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="custom-input">
                                <div className="row-inputs">
                                    <div>
                                        <label htmlFor="startDate" className="input-label">
                                            Course date start
                                        </label>
                                        <div className="input-wrapper">
                                            <input type="date" id="startDate" className="input-field" onChange={(e) => setCourseData({ ...courseData, start_date: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="endDate" className="input-label col-intput">
                                            Course date finish
                                        </label>
                                        <div className="input-wrapper">
                                            <input type="date" id="endDate" className="input-field col-intput" onChange={(e) => setCourseData({ ...courseData, finish_date: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="custom-input">
                                <FileUpload onFileUpload={(imageName) => setCourseData({ ...courseData, image: imageName })} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                                <button onClick={handleNext} className="btn btn-primary" style={{ alignSelf: "center" }} disabled={!formValid}>
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div >

                {showModal &&
                    <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Choose Skills</h5>
                                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="cable-choose" style={{ margin: '10px' }}>
                                    {[
                                        "MENTALIZATION-BASED THERAPY",
                                        "Satir systemic therapy",
                                        "Coaching",
                                        "Mindfulness-based therapy",
                                        "Communication with parents",
                                        "Oracle card into the mind",
                                        "Problem-solving therapy",
                                        "Enneagram",
                                        "Relaxation technique",
                                        "PSYCHOEDUCATION",
                                        "Basic Counseling"
                                    ].map(tag => (
                                        <button
                                            className={`cable-choose button ${selectedTags.includes(tag) ? "active" : ""}`}
                                            key={tag}
                                            style={{ margin: '5px' }}
                                            onClick={() => handleTagSelection(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Back
                                    </Button>
                                    <Button variant="primary" onClick={handleSaveTags}>
                                        Confirm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>}

            </div>
        </Main >
    );
}

export default InsertCourse;
