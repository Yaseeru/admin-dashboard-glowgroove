import React, { useEffect, useState } from 'react'
import { getAllOrders } from '../services/orderService'
import { useNavigate } from 'react-router-dom'

const statusOptions = [
  '', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
]

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await getAllOrders({ page, search, status })
        setOrders(res.orders)
        setPagination(res.pagination)
      } catch (err) {
        console.error('Error loading orders:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [page, search, status])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">📦 Orders</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition"
        >
          ← Back to Dashboard
        </button>

        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white w-full md:w-64"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white w-full md:w-48"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option ? option.charAt(0).toUpperCase() + option.slice(1) : 'All Statuses'}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No orders found.</p>
      ) : (
        <>
          <table className="w-full bg-white dark:bg-gray-800 rounded shadow text-sm mb-4">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-4 py-2">{order.orderNumber || order._id}</td>
                  <td className="px-4 py-2">{order.customerInfo.name}</td>
                  <td className="px-4 py-2">{order.customerInfo.email}</td>
                  <td className="px-4 py-2 capitalize">{order.status}</td>
                  <td className="px-4 py-2 text-right">${order.pricing.total.toFixed(2)}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/orders/${order._id}`)}
                      className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={!pagination.hasPrev}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {pagination.current} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!pagination.hasNext}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Orders