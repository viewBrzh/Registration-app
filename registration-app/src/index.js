import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/home";
import Login from "./pages/login";
import Contact from "./pages/contact";
import About from "./pages/about";
import Profile from "./pages/profile";
import Course from "./pages/course";
import Enroll from "./pages/enroll";
import Detail from "./pages/detail";
import Updatecourse from "./pages/updatecourse";
import Dashboard from "./pages/dashboard";
import Demo from "./pages/demo";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Manage from "./pages/manage";
import InsertCourse from "./pages/insertCourse";

const isAdmin = () => localStorage.getItem("userRole") == "admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/course",
    element: <Course />,
  },
  {
    path: "/enroll",
    element: <Enroll />,
  },
  {
    path: "/detail/:courseId",
    element: <Detail />,
  },
  {
    path: "/manage",
    element: isAdmin() ? <Manage /> : <Navigate to="/login" />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/update/:courseId",
    element: <Updatecourse />,
  },
  {
    path: "/insert",
    element: <InsertCourse />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
