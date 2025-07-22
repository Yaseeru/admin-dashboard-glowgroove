import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../services/productService"

const NewProduct = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    image: "",
    isFeatured: false,
    isActive: true,
    features: "",
    tags: "",
    dimensions: "",
    weight: "",
    material: "",
    color: "",
    burnTime: "",
    capacity: "",
    pages: "",
    power: ""
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value
    setForm((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const productData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      originalPrice: parseFloat(form.originalPrice),
      category: form.category,
      stock: parseInt(form.stock),
      images: [{ url: form.image, alt: form.name }],
      isFeatured: form.isFeatured,
      isActive: form.isActive,
      features: form.features ? form.features.split(",").map(f => f.trim()) : [],
      tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
      specifications: {
        dimensions: form.dimensions,
        weight: form.weight,
        material: form.material,
        color: form.color,
        burnTime: form.burnTime,
        capacity: form.capacity,
        pages: form.pages ? parseInt(form.pages) : undefined,
        power: form.power
      }
    }

    try {
      await createProduct(productData)
      navigate("/products")
    } catch (err) {
      console.error("Create error:", err)
      setError("Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">➕ Add New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Description"
          className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white"
        />

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <input name="price" type="number" value={form.price} onChange={handleChange} required placeholder="Price" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="Original Price" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
        </div>

        {/* Category & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <input name="category" value={form.category} onChange={handleChange} required placeholder="Category" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="stock" type="number" value={form.stock} onChange={handleChange} required placeholder="Stock Quantity" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
        </div>

        {/* Image */}
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
        {form.image && (
          <img src={form.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded border" />
        )}

        {/* Flags */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
            Active
          </label>
        </div>

        {/* Features & Tags */}
        <input name="features" value={form.features || ''} onChange={handleChange} placeholder="Features (comma-separated)" className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
        <input name="tags" value={form.tags || ''} onChange={handleChange} placeholder="Tags (comma-separated)" className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4">
          <input name="dimensions" value={form.dimensions || ''} onChange={handleChange} placeholder="Dimensions" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="weight" value={form.weight || ''} onChange={handleChange} placeholder="Weight" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="material" value={form.material || ''} onChange={handleChange} placeholder="Material" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="color" value={form.color || ''} onChange={handleChange} placeholder="Color" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="burnTime" value={form.burnTime || ''} onChange={handleChange} placeholder="Burn Time" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="capacity" value={form.capacity || ''} onChange={handleChange} placeholder="Capacity" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="pages" type="number" value={form.pages || ''} onChange={handleChange} placeholder="Pages" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
          <input name="power" value={form.power || ''} onChange={handleChange} placeholder="Power Source" className="px-3 py-2 rounded border bg-gray-50 dark:bg-gray-700 dark:text-white" />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  )
}

export default NewProduct