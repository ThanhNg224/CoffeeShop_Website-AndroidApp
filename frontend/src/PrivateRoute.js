import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
