import React from 'react'
import useAuth from './context/useAuth'
import TopBar from './layouts/TopBar'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  const { token, user } = useAuth()
  const isAuthenticated = token && user

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {isAuthenticated ? <TopBar /> : null}
      <AppRoutes />
    </div>
  )
}

export default App