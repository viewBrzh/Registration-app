import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Contact from "./pages/contact";
import About from "./pages/about";
import Profile from "./pages/profile";
import Course from "./pages/course";
import Enroll from "./pages/enroll";
import Detail from "./pages/detail";
import Updatecourse from "./pages/updatecourse";
import Dashboard from "./pages/dashboard";
import DashboardExecutive from "./pages/dashboardExecutive";
import DashboardAdmin from "./pages/dashboardAdmin";
import Demo from "./pages/demo";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Manage from "./pages/manage";
import InsertCourse from "./pages/insertCourse";
import EnrollManage from "./pages/enrollManage";

const isAdmin = () => localStorage.getItem("userRole") === "admin";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course" element={<Course />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/detail/:courseId" element={<Detail />} />
        <Route path="/manage" element={isAdmin() ? <Manage /> : <Navigate to="/login" />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/update/:courseId" element={<Updatecourse />} />
        <Route path="/insert" element={<InsertCourse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardExecutive" element={<DashboardExecutive />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/enrollManage/:courseId" element={<EnrollManage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
