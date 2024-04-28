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
        setSelectedTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );
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
            <div className="page-content">
                <div className="card-container">
                    <p className="divider">Insert course data</p>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div className="custom-input">
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
                            <label htmlFor="startDate" className="input-label">
                                Course date start
                            </label>
                            <div className="input-wrapper">
                                <input type="date" id="startDate" className="input-field" onChange={(e) => setCourseData({ ...courseData, start_date: e.target.value })} />
                            </div>
                        </div>
                        <div className="custom-input">
                            <label htmlFor="endDate" className="input-label">
                                Course date finish
                            </label>
                            <div className="input-wrapper">
                                <input type="date" id="endDate" className="input-field" onChange={(e) => setCourseData({ ...courseData, finish_date: e.target.value })} />
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
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} style={{ zIndex: 9999 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Skills</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {[
                        "MENTALIZATION-BASED THERAPY",
                        "Satir systemic therapy",
                        "Coaching",
                        "Mindfullness-based therapy",
                        "Communication with parents",
                        "Oracle card into the mind",
                        "Problem-solvingtherapy",
                        "Enneagram",
                        "Relaxation technique",
                        "PSYCHOEDUCATION",
                        "Basic Counseling"
                    ].map(tag => (
                        <Button
                            key={tag}
                            variant={selectedTags.includes(tag) ? "primary" : "outline-primary"}
                            onClick={() => handleTagSelection(tag)}
                            style={{ margin: "5px" }}
                        >
                            {tag}
                        </Button>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={handleSaveTags}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </Main>
    );
}

export default InsertCourse;
