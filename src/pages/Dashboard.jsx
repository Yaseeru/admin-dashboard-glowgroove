import React from 'react'
import useAuth from '../context/useAuth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="p-6">
      {/* Admin Info */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Welcome back, {user?.name || 'Admin'} ✨
      </h2>
      <p className="text-md text-gray-600 dark:text-gray-400 mb-8">
        🧑‍💼 Role: <strong>{user?.role}</strong> &nbsp;|&nbsp; 📧 Email: <strong>{user?.email}</strong>
      </p>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Manage Users */}
        <div
          onClick={() => navigate('/users')}
          className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transform transition"
        >
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">👥 Manage Users</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            View, edit, and control user accounts across the platform.
          </p>
        </div>

        {/* Manage Products */}
        <div
          onClick={() => navigate('/products')}
          className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transform transition"
        >
          <h3 className="text-2xl font-semibold mb-3 text-green-600 dark:text-green-400">🛒 Manage Products</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Create new items, manage stock, and tweak listings for Glow-groove.
          </p>
        </div>

        {/* Manage Orders */}
        <div
          onClick={() => navigate('/orders')}
          className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transform transition"
        >
          <h3 className="text-2xl font-semibold mb-3 text-orange-600 dark:text-orange-400">📦 Manage Orders</h3>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Review purchases, track shipping, and oversee fulfillment operations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard