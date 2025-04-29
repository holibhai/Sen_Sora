import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, XCircle } from "lucide-react";

const initialCategories = [
  { id: 1, type: "Cake", category: "Birthday Cake" },
  { id: 2, type: "Gift", category: "Flowers" },
  { id: 3, type: "Cake", category: "Wedding Cake" },
];

const AddCategory = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({ type: "", category: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.type || !newCategory.category) {
      setError("Both fields are required.");
      return;
    }

    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const newEntry = { id: newId, ...newCategory };
    setCategories([...categories, newEntry]);
    setNewCategory({ type: "", category: "" });
    setError("");
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setNewCategory({ type: cat.type, category: cat.category });
    setError("");
  };

  const handleUpdate = () => {
    if (!newCategory.type || !newCategory.category) {
      setError("Both fields are required.");
      return;
    }

    setCategories(
      categories.map((cat) =>
        cat.id === editId ? { ...cat, ...newCategory } : cat
      )
    );
    setEditId(null);
    setNewCategory({ type: "", category: "" });
    setError("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setNewCategory({ type: "", category: "" });
    setError("");
  };

  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-5xl mx-auto  p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Categories</h2>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            <XCircle size={18} /> {error}
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="border border-gray-300 rounded px-4 py-2"
            value={newCategory.type}
            onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Cake">Cake</option>
            <option value="Gift">Gift</option>
          </select>
          <input
            type="text"
            placeholder="Enter Category Name"
            className="border border-gray-300 rounded px-4 py-2"
            value={newCategory.category}
            onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
          />
          <div className="flex gap-2">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <Pencil size={16} /> Update
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAddCategory}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Plus size={16} /> Add Category
              </button>
            )}
          </div>
        </div>

        {/* Category Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left border">Category ID</th>
                <th className="px-4 py-2 text-left border">Type</th>
                <th className="px-4 py-2 text-left border">Category</th>
                <th className="px-4 py-2 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{cat.id}</td>
                  <td className="px-4 py-2 border">{cat.type}</td>
                  <td className="px-4 py-2 border">{cat.category}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No categories available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
