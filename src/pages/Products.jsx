import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        alert("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to disable this product?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error(`Error deleting product ${id}:`, err);
        alert("Error deleting product");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          🛒 Product Management
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Total Products: <strong>{products.length}</strong>
        </span>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded transition"
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={() => navigate("/products/new")}
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition"
        >
          ➕ Add New Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2 flex items-center gap-3">
                    {product.images?.length > 0 && (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || "Product image"}
                        className="h-10 w-10 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 capitalize">{product.category}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2 text-center">{product.stock}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/products/${product._id}/edit`)}
                      className="px-3 py-1 text-sm rounded bg-yellow-500 hover:bg-yellow-600 text-white transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;