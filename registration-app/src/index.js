import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/home";
import Login from "./pages/login";
import Contact from "./pages/contact";
import About from "./pages/about";
import Product from "./pages/product";
import Course from "./pages/course";
import Enroll from "./pages/enroll";
import Detail from "./pages/detail";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    path: "/product",
    element: <Product />,
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
    path: "/detail",
    element: <Detail />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
