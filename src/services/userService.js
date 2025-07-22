import api from './api'

// Get all users
export const getAllUsers = async () => {
  try {
    const res = await api.get('/users')
    return res.data.data.users
  } catch (err) {
    console.error('Error fetching users:', err)
    throw err
  }
}

// Get single user by ID
export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`)
    return res.data.data.user
  } catch (err) {
    console.error(`Error fetching user ${id}:`, err)
    throw err
  }
}

// Update user status (enable/disable account)
export const updateUserStatus = async (id, isActive) => {
  try {
    const res = await api.put(`/users/${id}/status`, { isActive })
    return res.data.data.user
  } catch (err) {
    console.error(`Error updating user ${id} status:`, err)
    throw err
  }
}