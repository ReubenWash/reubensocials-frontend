// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

/**
 * ProtectedRoute wraps any component that requires the user to be logged in.
 * If the user is not authenticated, it redirects to /login.
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // User is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, allow access to the protected page
  return <>{children}</>;
};

export default ProtectedRoute;