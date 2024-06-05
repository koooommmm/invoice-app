import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return !currentUser ? children : <Navigate to='/' />;
};

export default PublicRoute;
