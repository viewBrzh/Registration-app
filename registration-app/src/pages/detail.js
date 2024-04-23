import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useParams } from "react-router-dom";
import apiUrl from "../api/apiConfig";

function Detail(props) {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/course/get-data/${courseId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data[0])
        console.log(data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <div className="detailcard">
        <div className="detailcard-img-top text-center">
          <img
            src={`${apiUrl}/images/${course.image}`}
            alt="Course Image"
            className="detailcard-img-top"
          />
        </div>
        <div className="detailcard-body">
          <h4 className="detailcard-title">{course.course_detail_name}</h4>
          <p className="detailcard-text">{course.train_detail}</p>
          <p className="detailcard-text">
            <strong>Date: </strong>
            {new Date(course.start_date).toLocaleDateString('en-GB')} to {new Date(course.finish_date).toLocaleDateString('en-GB')}
          </p>
          <p className="detailcard-text">
            <strong>Place: </strong>
            {course.train_place}
          </p>
          <Link to={`/enroll`}>
            <button type="button" className="btn btn-primary ">
              Enroll
            </button>
          </Link>
        </div>
      </div>
    </Main>
  );
}

export default Detail;
