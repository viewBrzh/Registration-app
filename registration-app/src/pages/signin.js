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
        {/* Your SVG code here */}
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
