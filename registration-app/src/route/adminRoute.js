import React from "react";
import { Navigate, Route } from "react-router-dom";
import Manage from "../pages/manage";

const AdminRoute = ({ ...rest }) => {
  const userRole = localStorage.getItem("userRole");

  return (
    <Route
      {...rest}
      render={(props) =>
        userRole === "admin" ? <Manage {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default AdminRoute;
