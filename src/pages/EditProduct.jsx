import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAllProducts, updateProduct } from '../services/productService'

const categories = [
  'candles', 'journals', 'diffusers', 'lighting', 'wellness', 'decor'
]

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getAllProducts()
        const product = products.find((p) => p._id === id)

        if (!product) {
          setError('Product not found')
          return
        }

        setForm({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          category: product.category || '',
          stock: product.stock || '',
          image: product.images?.[0]?.url || ''
        })
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setUpdating(true)

    const productData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      stock: parseInt(form.stock),
      images: [{ url: form.image, alt: form.name }]
    }

    try {
      await updateProduct(id, productData)
      navigate('/products')
    } catch (err) {
      console.error('Update error:', err)
      setError('Failed to update product')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">✏️ Edit Product</h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading product...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Stock</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 h-20 w-20 object-cover rounded border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={updating}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
          >
            {updating ? 'Saving...' : 'Update Product'}
          </button>
        </form>
      )}
    </div>
  )
}

export default EditProduct