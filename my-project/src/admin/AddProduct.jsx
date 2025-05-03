import React, { useState, useEffect } from "react";
import { Upload, CheckCircle, XCircle } from "lucide-react";

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    flavor: "",
    price: "",
    description: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear category if type is changed
    if (name === "type") {
      setFormData((prev) => ({ ...prev, category: "" }));
    }

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

    if (!formData.name || !formData.type || !formData.price || !formData.image) {
      setError("Name, Type, Price and Image are required.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        formDataToSend.append(key, value)
      );

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        type: "",
        category: "",
        flavor: "",
        price: "",
        description: "",
        stock: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/categories/getAll`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  // Filter categories based on selected type
  const filteredCategories = categories.filter(
    (cat) => cat.type.toLowerCase() === formData.type.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>

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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Product Name *"
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
            <option value="">Select Type *</option>
            <option value="Cake">Cake</option>
            <option value="Gift">Gift</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            disabled={!formData.type}
          >
            <option value="">Select Category</option>
            {filteredCategories.map((cat) => (
              <option key={cat.categoryId} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>

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
            placeholder="Price (₹) *"
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
              Product Image *
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-flex items-center gap-2">
                <Upload size={18} />
                Upload Image
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
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full font-semibold"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
