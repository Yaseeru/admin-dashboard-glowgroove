import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrderById, updateOrderStatus } from '../services/orderService'

const statusOptions = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
const paymentOptions = ['pending', 'completed', 'failed', 'refunded']

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(false)

  const [status, setStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [trackingNumber, setTrackingNumber] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id)
        setOrder(res)
        setStatus(res.status)
        setPaymentStatus(res.paymentStatus)
        setTrackingNumber(res.trackingNumber || '')
        setNotes(res.notes || '')
      } catch (err) {
        console.error('Error loading order:', err)
        setError('Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)

    try {
      const payload = { status, paymentStatus, trackingNumber, notes }
      const updated = await updateOrderStatus(id, payload)
      setOrder(updated)
    } catch (err) {
          console.error('Error updating order:', err)
      alert('Error updating order status')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div className="p-6">Loading order...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>
  if (!order) return null

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📄 Order Details</h2>

      <button
        onClick={() => navigate('/orders')}
        className="mb-6 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition"
      >
        ← Back to Orders
      </button>

      {/* Info Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p><strong>Order #:</strong> {order.orderNumber || order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment:</strong> {order.paymentStatus}</p>
          <p><strong>Total:</strong> ${order.pricing.total.toFixed(2)}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p><strong>Customer:</strong> {order.customerInfo.name}</p>
          <p><strong>Email:</strong> {order.customerInfo.email}</p>
          <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">🛍️ Items</h3>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li key={item._id} className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">🚚 Shipping Address</h3>
          {Object.values(order.shippingAddress).map((val, i) => (
            <p key={i}>{val}</p>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">💳 Billing Address</h3>
          {Object.values(order.billingAddress).map((val, i) => (
            <p key={i}>{val}</p>
          ))}
        </div>
      </div>

      {/* Admin Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">⚙️ Update Order</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
              >
                {paymentOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm">Tracking Number</label>
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm">Admin Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            {updating ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default OrderDetails