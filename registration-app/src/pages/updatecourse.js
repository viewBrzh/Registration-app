import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useParams } from "react-router-dom";

function Updatecourse(props) {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({
    course_detail_name: "",
    train_detail: "",
    train_place: "",
    start_date: "",
    finish_date: ""
  });
  

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:11230/course/get-data/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setCourseData({
            ...data[0],
            start_date: formatDate(data[0].start_date),
            finish_date: formatDate(data[0].finish_date)
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
    return formattedParts[0] + "/" + formattedParts[1] + "/" + formattedParts[2];
  };

  const handleDelete = async () => {
    try {
      console.log("Deleting course with ID:", courseId);
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course? This process is permanent."
      );
      if (confirmDelete) {
        const response = await fetch(`http://localhost:11230/course/delete/${courseId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          props.history.push('/manage'); // Redirect to the manage page
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
    const confirmUpdate = window.confirm("Are you sure you want to Update this course?");
    if (confirmUpdate) {
      try {
        console.log("Updating course with data:", courseData);
        const response = await fetch(`http://localhost:11230/course/update/${courseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData),
        });
        if (response.ok) {
          // Handle successful update
          console.log('Course updated successfully');
          window.confirm("Course updated successfully")
        } else {
          console.error('Failed to update course');
        }
      } catch (error) {
        console.error('Error updating course:', error);
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
            {/* Custom Input*/}
            <div className="custom-input">
              <label htmlFor="name" className="input-label">
                Course name
              </label>
              <div className="input-wrapper">
                <input type="text" id="name" className="input-field" value={courseData.course_detail_name}
                  onChange={(e) => setCourseData({ ...courseData, course_detail_name: e.target.value })} />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="details" className="input-label">
                Course details
              </label>
              <div className="input-wrapper">
                <input type="text" id="details" className="input-field" value={courseData.train_detail}
                  onChange={(e) => setCourseData({ ...courseData, train_detail: e.target.value })} />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="location" className="input-label">
                Location
              </label>
              <div className="input-wrapper">
                <input type="text" id="location" className="input-field" value={courseData.train_place}
                  onChange={(e) => setCourseData({ ...courseData, train_place: e.target.value })}
                />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="startDate" className="input-label">
                Course date start
              </label>
              <div className="input-wrapper">
                <input type="date" id="startDate" className="input-field" value={courseData.start_date} onChange={(e) => setCourseData({ ...courseData, start_date: e.target.value })} />
              </div>
            </div>
            <div className="custom-input">
              <label htmlFor="endDate" className="input-label">
                Course date finish
              </label>
              <div className="input-wrapper">
                <input type="date" id="endDate" className="input-field" value={courseData.finish_date} onChange={(e) => setCourseData({ ...courseData, finish_date: e.target.value })} />
              </div>
            </div>
            {/* Card Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <Link style={{ display: "flex", alignItems: "center", padding: 20 }}>
                <a className="font-btn" style={{ margin: 0 }} onClick={handleDelete}>
                  delete
                </a>
              </Link>
              <a style={{ padding: 10 }}></a>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "center" }}>
                Confirm
              </button>
            </div>
          </form>

        </div>
      </div>
    </Main>
  );
}

export default Updatecourse;
