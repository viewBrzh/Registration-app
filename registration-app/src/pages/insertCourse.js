import React, { useState, useEffect } from "react";
import Main from "../layouts/main";

function InsertCourse() {
  const [courseData, setCourseData] = useState({
    course_detail_name: "",
    course_id: "",
    train_detail: "",
    train_place: "",
    start_date: "",
    finish_date: ""
  });
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(courseData).every(value => !!value);
    setFormValid(isValid);
  }, [courseData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm("Are you sure you want to Insert this course?");
    if (confirmUpdate) {
      try {
        console.log("Updating course with data:", courseData);
        const response = await fetch(`http://localhost:11230/course/create`, {
          method: 'POST',
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
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "center" }} disabled={!formValid}>
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
}

export default InsertCourse;
