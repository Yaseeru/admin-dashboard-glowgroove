import React, { createContext, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)

  // Fetch current user profile using /auth/profile
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/profile')
          setUser(res.data.data.user)
        } catch (error) {
          console.error('Token validation failed:', error)
          logout()
        }
      }
      setLoading(false)
    }

    fetchUser()
  }, [token])

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      const { token: receivedToken, user: receivedUser } = res.data.data
      localStorage.setItem('token', receivedToken)
      setToken(receivedToken)
      setUser(receivedUser)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed'
      }
    }
  }

  // Register function (optional)
  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData)
      const { token: receivedToken, user: receivedUser } = res.data.data
      localStorage.setItem('token', receivedToken)
      setToken(receivedToken)
      setUser(receivedUser)
      return { success: true }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}