import React from "react";
import { Navigate } from "react-router-dom";


// Admin Protected route
const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/register" replace />;
};

// employee protected route
const EmployeeProtectedRoute = ({ element, isEmployeeAuthenticated }) => {
  return isEmployeeAuthenticated ? element : <Navigate to="/employee/login" replace />;
}

export { ProtectedRoute,EmployeeProtectedRoute};
