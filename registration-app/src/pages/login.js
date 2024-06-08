import React, { useState, useEffect } from "react";
import "../App.css";
import Main from "../layouts/main";
import { useNavigate } from "react-router-dom";
import apiUrl from "../api/apiConfig";
import ModalInterest from "../components/modalInterest";
import AOS from "aos";
import "aos/dist/aos.css";

function Login(props) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState("");
  const [showInterest, setShowInterest] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userDataToStore = { ...data.user };
        delete userDataToStore.password; // Remove the password from the data to be stored
        localStorage.setItem("userData", JSON.stringify(userDataToStore));
        console.log(JSON.stringify(userDataToStore));
        localStorage.setItem("userRole", data.user.role);
        setLoading(false);
        setUserData(userDataToStore);
        setSuccess(true);
      } else {
        const data = await response.json();
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirm = () => {
    setSuccess(false);
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <Main>
      <div className="custom-shape-divider-top-1710057287" data-aos="fade-up">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
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
        <div className="card mb-4" data-aos="fade-up">
          <div className="logincard-body">
            <div className="row" style={{ margin: "1px" }}>
              <div className="col-md-6">
                <h2 className="logincard-title">Login</h2>

                <form className="login-form" style={{}} onSubmit={handleSubmit}>
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                      htmlFor="password"
                      style={{ fontWeight: "bold", color: "#E695B5" }}
                    >
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          width: "100%",
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                      />
                      <i
                        className={`fas ${
                          showPassword ? "fa-eye" : "fa-eye-slash"
                        }`}
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          color: "#E695B5",
                          cursor: "pointer",
                        }}
                        onClick={togglePasswordVisibility}
                      ></i>
                    </div>
                  </div>
                  <div
                    className="form-group"
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  ></div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
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
                    {loading ? "Logging in..." : "Login"}
                  </button>

                  {error && (
                    <div className="row justify-content-center">
                      <div
                        className="notifications-container"
                        style={{ paddingTop: 20 }}
                        data-aos="fade-up"
                      >
                        <div className="error-alert">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                className="error-svg"
                              >
                                <path
                                  clipRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  fillRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <div className="error-prompt-container">
                              <p className="error-prompt-heading">{error}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
              <div className="col-md-6" data-aos="fade-up">
                <img
                  src="img/Remote Working (HD).png"
                  className="logincard-img"
                  alt="Explanation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {success && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "300px",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <h3>Login successful</h3>
            <p>Username: {userData?.username}</p>
            <p>Role: {userData?.role}</p>
            <button className="btn btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </Main>
  );
}

export default Login;
