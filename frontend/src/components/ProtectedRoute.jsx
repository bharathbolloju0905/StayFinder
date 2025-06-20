import React from 'react'
import { useUser } from '../context/UserContext'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({children}) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute