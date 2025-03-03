import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // Get user role and token from localStorage
  const userType = localStorage.getItem('userType');
  const token = localStorage.getItem('token');

  // If no token or userType, redirect to login
  if (!token || !userType) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is allowed
  if (!allowedRoles.includes(userType)) {
    // Redirect to login if the user is not authorized
    return <Navigate to="/login" replace />;
  }

  // Render the protected route
  return <Outlet />;
};

export default ProtectedRoute;