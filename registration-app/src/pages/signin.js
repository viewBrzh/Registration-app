import React, { useState } from "react";
import "../App.css";
import Main from "../layouts/main";
import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post("http://localhost:11230/users/register", userData)
      .then((response) => {
        console.log("Response:", response.data);
        alert("User registered successfully");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400 && error.response.data.message === 'Username already exists') {
          alert('Username already exists');
        } else {
          console.error("Error:", error);
          alert("Failed to register user");
        }
      });
  };


  return (
    <Main>
      <div class="custom-shape-divider-top-1710057287">
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
        <div className="card mb-4">
          <div
            className="card-body"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <h2 className="card-title">Sign-in</h2>
                <form
                  style={{ maxWidth: "400px", margin: "auto" }}
                  onSubmit={handleSubmit}
                >
                  <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="username"
                      style={{ fontWeight: "bold", color: "#E695B5" }}
                    >
                      Username
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />
                      <i
                        className="fas fa-user"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#E695B5",
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="email"
                      style={{ fontWeight: "bold", color: "#E695B5" }}
                    >
                      Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />
                      <i
                        className="fas fa-envelope"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#E695B5",
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="password"
                      style={{ fontWeight: "bold", color: "#E695B5" }}
                    >
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />
                      <i
                        className="fas fa-lock"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#E695B5",
                        }}
                      ></i>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="confirmPassword"
                      style={{ fontWeight: "bold", color: "#E695B5" }}
                    >
                      Confirm Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />
                      <i
                        className="fas fa-lock"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#E695B5",
                        }}
                      ></i>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#E60073",
                      color: "#fff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-md-6">
                <img
                  src="img/Remote Working (HD).png"
                  className="card-img-top1"
                  alt="Explanation"
                  style={{ padding: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default SignIn;
