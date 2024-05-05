import Main from "../layouts/main";
import { Link } from "react-router-dom";
import { useState } from "react"; // Import useState hook

function Feedback(props) {
  // Define state for satisfaction ratings
  const [ratings, setRatings] = useState({
    course1: 0,
    course2: 0,
    course3: 0,
    course4: 0,
    course5: 0,
  });

  // Function to handle rating changes
  const handleRatingChange = (course, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [course]: rating,
    }));
  };

  return (
    <Main>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-2 text-dark mb-4 animated slideInDown">
            Feedback
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to={`/`} className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li
                className="breadcrumb-item text-dark"
                aria-current="page"
                style={{ fontWeight: "bold" }}
              >
                Feedback
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Voting Table Start */}
      <div className="container">
        <h2 className="text-center mb-4">Vote for Satisfaction</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(ratings).map((course, index) => (
              <tr key={index}>
                <td>{course}</td>
                <td>
                  <select
                    value={ratings[course]}
                    onChange={(e) =>
                      handleRatingChange(course, parseInt(e.target.value))
                    }
                  >
                    <option value={0}>Select Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Voting Table End */}

    </Main>
  );
}

export default Feedback;
