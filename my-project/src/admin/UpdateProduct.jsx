import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    flavor: "",
    price: "",
    description: "",
    stock: "",
    imageUrl: null,
  });

  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setFormData({
          ...res.data,
          imageUrl: null, // don't prefill image file
        });
        // Set the full URL for the preview
        setPreview(
          res.data.imageUrl ? `http://localhost:5000${res.data.imageUrl}` : null
        );
      } catch (err) {
        setError("Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Product updated successfully.");
      setTimeout(() => navigate("/admin/products"), 2000);
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Update Product
        </h2>

        {error && (
          <div className="flex items-center gap-2 mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
            <XCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 mb-4 bg-green-100 text-green-700 px-4 py-2 rounded">
            <CheckCircle size={18} /> {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="">Select Type</option>
            <option value="cake">Cake</option>
            <option value="gift">Gift</option>
          </select>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />

          <input
            type="text"
            name="flavor"
            placeholder="Flavor"
            value={formData.flavor}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />

          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full col-span-full"
          />

          <div className="col-span-full">
            <label className="block mb-2 font-medium text-gray-700">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-flex items-center gap-2">
                <Upload size={18} />
                Upload New Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded border border-gray-300"
                />
              )}
            </div>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded w-full font-semibold"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
