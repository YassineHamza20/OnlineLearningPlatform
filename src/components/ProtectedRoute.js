import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accesstoken');
  const location = useLocation();

  if (!token) {
    let redirectTo = '/learner/signin';
    if (location.pathname.includes('/admin')) {
      redirectTo = '/backOffice/admin/login';
    } else if (location.pathname.includes('/tutor')) {
      redirectTo = '/tutor/signin';
    }
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
