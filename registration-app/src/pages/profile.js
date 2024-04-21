import React from "react";
import Main from "../layouts/main";
import { Link } from "react-router-dom";

function Profile() {
  const storedUserData = localStorage.getItem("userData");

  let userData = null;
  try {
    userData = JSON.parse(storedUserData);
  } catch (error) {
    console.error("Failed to parse user data from localStorage");
  }

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
  };

  return (
    <Main>
      {/* Hero Section */}
      <div className="hero-section">
        {/* Profile Picture */}
        <div className="profile-image-container">
          <img
            src={process.env.PUBLIC_URL + "/img/profile/p1.jpg"}
            alt="Profile"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              marginLeft: "20px",
            }}
          />
        </div>

        {/* User Information */}
        <div
          className="user-info"
          style={{
            marginLeft: "100px",
            marginBottom: "40px",
            padding: "20px",
            borderBottom: "2px solid #ccc",
          }}
        >
          {userData && (
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                {userData.user.username}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                {userData.user.email}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Role:</span>{" "}
                {userData.user.role}
              </p>
            </div>
          )}
          <Link to="/">
            <button onClick={handleLogout}>Log-out</button>
          </Link>
        </div>
      </div>

      {/* Courses Section */}
      <div
        className="courses-section"
        style={{
          marginLeft: "100px",
          marginBottom: "40px",
          paddingTop: "20px",
          width: "80%",
          borderBottom: "2px solid #ccc",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#E90073" }}>
          Courses Registered
        </h2>
        <ul>
          <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
          {/* Add more courses as needed */}
        </ul>
      </div>

      {/* News Section */}
      <div
        className="news-section text-center"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <div style={{ flexBasis: "30%" }}>
          <h2>Column 1</h2>
          {/* Add content for column 1 */}
        </div>
        <div style={{ flexBasis: "30%" }}>
          <h2>Course Registered on column</h2>
          <img
            src="/img/ranking.jpg"
            alt="Ranking"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div style={{ flexBasis: "30%" }}>
          <h2>Column 3</h2>
          {/* Add content for column 3 */}
        </div>
      </div>
    </Main>
  );
}

export default Profile;
