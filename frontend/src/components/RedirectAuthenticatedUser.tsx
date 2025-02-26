import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const RedirectAuthenticatedUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
export default RedirectAuthenticatedUser;
