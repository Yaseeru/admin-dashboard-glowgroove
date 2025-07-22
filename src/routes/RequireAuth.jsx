import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

const RequireAuth = ({ children }) => {
  const { user, token, loading } = useAuth()

  if (loading) {
    return <div className="text-center mt-10">Checking credentials...</div>
  }

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RequireAuth