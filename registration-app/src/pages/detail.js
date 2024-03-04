import React, { useState, useEffect } from "react";
import Main from "../layouts/main";
import { Link, useParams } from "react-router-dom";

function Detail(props) {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:11230/course/detail/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCourse(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <div className="container-xxl py-5">
        <div className="container-center">
          <div
            className="section-title text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "500px" }}
          >
            <h1>{course.course_detail_name}</h1>
          </div>

          <div className="detail__img text-center">
            <img src="/img/ranking.jpg" alt="" />
          </div>
          <div>
            <div className="store-item position-relative text-center p-4">
              <div className="p-4">
                <h4 className="mb-3">{course.course_detail_name}</h4>
                <p>{course.train_detail}</p>
                <p>
                  ระยะเวลา: {course.start_date} - {course.finish_date}
                </p>

                <p>สถานที่อบรม: {course.train_place}</p>
                <Link to={`/enroll`}>
                  <button type="button" className="btn btn-primary">
                    Enroll
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Detail;
