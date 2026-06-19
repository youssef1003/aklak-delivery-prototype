import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { auth } = useDemo();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && auth.currentRole !== allowedRole) {
    // If authenticated but wrong role, go back to portal/home or unauthorized
    return <Navigate to="/" replace />;
  }

  return children;
};
