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
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Manage from "./pages/manage";
import InsertCourse from "./pages/insertCourse";
import EnrollManage from "./pages/enrollManage";
import Logout from "./pages/logout";
import Error404Page from "./pages/error/notFound";
import Feedback from "./pages/feedback";

const isAdmin = () => localStorage.getItem("userRole") === "admin";
const isTeacher = () => localStorage.getItem("userRole") === "teacher";
const isExecutive = () => localStorage.getItem("userRole") === "executive";

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
        <Route path="/manage" element={isAdmin() ? <Manage /> : <Navigate to="/404" />} />
        <Route path="/update/:courseId" element={<Updatecourse />} />
        <Route path="/insert" element={<InsertCourse />} />
        <Route path="/dashboard" element={isTeacher() ? <Dashboard /> : <Navigate to="/404" />} />
        <Route path="/dashboardExecutive" element={isExecutive() ? <DashboardExecutive /> : <Navigate to="/404" />} />
        <Route path="/dashboardAdmin" element={isAdmin() ? <DashboardAdmin /> : <Navigate to="/404" />} />
        <Route path="/enrollManage/:courseId" element={<EnrollManage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/404" element={<Error404Page/>} />
        <Route path="/feedback" element={<Feedback/>} />
        
        {/* Bring user to 404 if path not exist */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
