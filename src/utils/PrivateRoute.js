import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const loggedIn = localStorage.getItem("is_login");

  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to={"/login"} state={location.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
