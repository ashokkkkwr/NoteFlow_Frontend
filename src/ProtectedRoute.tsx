import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }>= ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('accessToken'); // Check if the token exists

  return isAuthenticated ? children : <Navigate to="/auth/user/login" replace />;
};
export default ProtectedRoute;
