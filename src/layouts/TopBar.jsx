import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

const TopBar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow">
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <img src="/favicon.ico" alt="Glow-groove logo" className="h-6 w-6" />
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Glow-groove Admin</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">

        {user && (
          <>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Hello, {user.name || 'Admin'}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default TopBar