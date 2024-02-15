import React from "react";
import "../App.css";
import Main from "../layouts/main";

function Login() {
  return (
    <Main>
      {/* Page Content */}
      <div
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f5f5f5",
          }}
        >
          {/* Card Header */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#E60073" }}>Login</h2>
          </div>
          {/* Divider */}
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "14px",
              color: "#E695B5",
            }}
          >
            Sign up to access
          </p>
          {/* Card Body */}
          <form style={{ display: "flex", flexDirection: "column" }}>
            {/* Custom Input - First Name */}
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="first"
                style={{ marginBottom: "5px", color: "#E695B5" }}
              >
                Username
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  id="first"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
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
            {/* Custom Input - Password */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="pass"
                style={{ marginBottom: "5px", color: "#E695B5" }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  id="pass"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
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
            {/* Card Footer */}
            <button
              type="button"
              style={{
                backgroundColor: "#E60073",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                border: "none",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
}

export default Login;
