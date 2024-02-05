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
            backgroundColor: "#fff",
          }}
        >
          {/* Card Header */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#00bcd4" }}>เข้าสู่ระบบ</h2>
          </div>
          {/* Divider */}
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "14px",
              color: "#888",
            }}
          >
            ลงชื่อเพื่อเข้าใช้งาน
          </p>
          {/* Card Body */}
          <form style={{ display: "flex", flexDirection: "column" }}>
            {/* Custom Input - First Name */}

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="position"
                style={{ marginBottom: "5px", color: "#555" }}
              >
                วิทยฐานะทางวิชาการ
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  id="position"
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
                    color: "#888",
                  }}
                ></i>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{ marginBottom: "5px", color: "#555" }}
              >
                ชื่อ นามสกุล
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  id="name"
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
                    color: "#888",
                  }}
                ></i>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="major"
                style={{ marginBottom: "5px", color: "#555" }}
              >
                สำนักวิชา
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  id="major"
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
                    color: "#888",
                  }}
                ></i>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="telephone"
                style={{ marginBottom: "5px", color: "#555" }}
              >
                เบอร์โทรศัพท์มือถือ
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  id="telephone"
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
                    color: "#888",
                  }}
                ></i>
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{ marginBottom: "5px", color: "#555" }}
              >
                E-mail
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  id="email"
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
                    color: "#888",
                  }}
                ></i>
              </div>
            </div>
            {/* Card Footer */}
            <button
              type="button"
              style={{
                backgroundColor: "#00bcd4",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                border: "none",
              }}
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </Main>
  );
}

export default Login;
