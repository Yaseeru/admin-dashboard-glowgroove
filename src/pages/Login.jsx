import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const res = await login(email, password)
    if (res.success) {
      navigate('/')
    } else {
      setError(res.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Admin Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Password</label>
        <input
          type="password"
          className="w-full p-2 mb-6 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login