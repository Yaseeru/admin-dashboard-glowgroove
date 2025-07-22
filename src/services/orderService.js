import api from './api'

// Get all orders (admin)
export const getAllOrders = async ({ page = 1, limit = 20, status = '', search = '' }) => {
  try {
    const res = await api.get(`/orders/admin/all`, {
      params: { page, limit, status, search }
    })
    return res.data.data
  } catch (err) {
    console.error('Error fetching orders:', err)
    throw err
  }
}

// Get single order by ID
export const getOrderById = async (id) => {
  try {
    const res = await api.get(`/orders/${id}`)
    return res.data.data.order
  } catch (err) {
    console.error(`Error fetching order ${id}:`, err)
    throw err
  }
}

// Update order status
export const updateOrderStatus = async (id, payload) => {
  try {
    const res = await api.put(`/orders/${id}/status`, payload)
    return res.data.data.order
  } catch (err) {
    console.error(`Error updating order ${id}:`, err)
    throw err
  }
}