import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useParams, useNavigate } from "react-router-dom";
import FileUpload from "../components/fileUpload";
import apiUrl from "../api/apiConfig";
import { Navigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Updatecourse(props) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    course_id: "",
    course_detail_name: "",
    train_detail: "",
    train_place: "",
    start_date: "",
    finish_date: "",
    image: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleShowModal = () => {
    setShowModal(true);
  }


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
        window.confirm("Skills updated successfully");
        <Navigate to="/home" />

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


  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/course/get-data/${courseId}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourseData({
            ...data[0],
            start_date: formatDate(data[0].start_date),
            finish_date: formatDate(data[0].finish_date),
          });
        } else {
          console.error("Failed to fetch course details");
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return ""; // or any default value you prefer
    }
    const parts = dateString.split("/");
    // Ensure each part has at least 2 digits
    const formattedParts = parts.map((part) => part.padStart(2, "0"));
    // Rearrange the parts to dd/mm/yyyy format
    return (
      formattedParts[0] + "/" + formattedParts[1] + "/" + formattedParts[2]
    );
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting course with ID:", courseId);
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course? This process is permanent."
      );
      if (confirmDelete) {
        const response = await fetch(
          `${apiUrl}/course/delete/${courseId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          navigate("/", { replace: true });
          console.log("Course deleted successfully");
        } else {
          console.error("Failed to delete course");
        }
      } else {
        console.log("Delete operation cancelled.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm(
      "Are you sure you want to Update this course?"
    );
    if (confirmUpdate) {
      try {
        console.log("Updating course with data:", courseData);
        const response = await fetch(
          `${apiUrl}/course/update/${courseId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
          }
        );
        if (response.ok) {
          // Handle successful update
          console.log("Course updated successfully");
          navigate("/", { replace: true });
        } else {
          console.error("Failed to update course");
        }
      } catch (error) {
        console.error("Error updating course:", error);
      }
    }
  };

  return (
    <Main>
      {/* Page Content */}
      <div className="page-content">
        <div className="card-container">
          {/* Divider */}
          <p className="divider">Edit course data</p>
          {/* Card Body */}
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="custom-input">
              <label htmlFor="courseType" className="input-label">
                Course Type
              </label>
              <div className="input-wrapper">
                <select
                  id="courseType"
                  className="input-field"
                  value={courseData.course_id}
                  onChange={(e) =>
                    setCourseData({ ...courseData, course_id: e.target.value })
                  }
                >
                  <option value="">Course type</option>
                  <option value="1">Basic</option>
                  <option value="2">Retreat</option>
                </select>
              </div>
            </div>
            {/* Custom Input*/}
            <div className="custom-input">
              <label htmlFor="name" className="input-label">
                Course name
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  value={courseData.course_detail_name}
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      course_detail_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="details" className="input-label">
                Course details
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="details"
                  className="input-field"
                  value={courseData.train_detail}
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      train_detail: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="location" className="input-label">
                Location
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="location"
                  className="input-field"
                  value={courseData.train_place}
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      train_place: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="startDate" className="input-label">
                Course date start
              </label>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="startDate"
                  className="input-field"
                  value={courseData.start_date}
                  onChange={(e) =>
                    setCourseData({ ...courseData, start_date: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="endDate" className="input-label">
                Course date finish
              </label>
              <div className="input-wrapper">
                <input
                  type="date"
                  id="endDate"
                  className="input-field"
                  value={courseData.finish_date}
                  onChange={(e) =>
                    setCourseData({
                      ...courseData,
                      finish_date: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="custom-input">
              <FileUpload onFileUpload={(imageName) => setCourseData({ ...courseData, image: imageName })} />
            </div>
            <a className="btn tag-select" onClick={handleShowModal}>Choose skill tags</a>
            {/* Card Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <Link
                style={{ display: "flex", alignItems: "center", padding: 20 }}
              >
                <a
                  className="font-btn"
                  style={{ margin: 0 }}
                  onClick={handleDelete}
                >
                  delete
                </a>
              </Link>
              <a style={{ padding: 10 }}></a>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: "center" }}
              >
                Confirm
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

export default Updatecourse;
