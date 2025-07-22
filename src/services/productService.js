import api from './api'

// Fetch all active products (admin view)
export const getAllProducts = async () => {
  try {
    const res = await api.get('/products') // If you add GET /api/products later
    return res.data.data.products || []
  } catch (err) {
    console.error('Error fetching products:', err)
    throw err
  }
}

// Create a new product
export const createProduct = async (productData) => {
  try {
    const res = await api.post('/products', productData)
    return res.data.data.product
  } catch (err) {
    console.error('Error creating product:', err)
    throw err
  }
}

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const res = await api.put(`/products/${id}`, productData)
    return res.data.data.product
  } catch (err) {
    console.error(`Error updating product ${id}:`, err)
    throw err
  }
}

// Soft delete a product
export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`)
    return res.data
  } catch (err) {
    console.error(`Error deleting product ${id}:`, err)
    throw err
  }
}