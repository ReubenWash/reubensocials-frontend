// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    // Redirect to login if no token
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
