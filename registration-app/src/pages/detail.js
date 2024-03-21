import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useParams } from "react-router-dom";

function Detail(props) {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:11230/course/get-data/${courseId}`)
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
            src="/img/ranking.jpg"
            alt="Course Image"
            className="detailcard-img-top"
          />
        </div>
        <div className="detailcard-body">
          <h4 className="detailcard-title">{course.course_detail_name}</h4>
          <p className="detailcard-text">{course.train_detail}</p>
          <p className="detailcard-text">
            <strong>ระยะเวลา: </strong>
            {course.start_date} - {course.finish_date}
          </p>
          <p className="detailcard-text">
            <strong>สถานที่อบรม: </strong>
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
