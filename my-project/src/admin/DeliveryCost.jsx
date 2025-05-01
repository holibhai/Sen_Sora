import React, { useEffect, useState } from "react";

const DeliveryCost = () => {
  const [deliveryCosts, setDeliveryCosts] = useState([]);
  const [city, setCity] = useState("");
  const [cost, setCost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCity, setEditCity] = useState("");

  // Fetch all delivery costs
  const fetchDeliveryCosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/deliveryCost/getAll");
      const data = await res.json();
      setDeliveryCosts(data);
    } catch (error) {
      console.error("Error fetching delivery costs:", error);
    }
  };

  useEffect(() => {
    fetchDeliveryCosts();
  }, []);

  // Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city || !cost) {
      alert("Both city and cost are required");
      return;
    }

    try {
      const endpoint = isEditing
        ? `http://localhost:5000/api/deliveryCost/${editCity}`
        : "http://localhost:5000/api/deliveryCost/add";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, cost }),
      });

      const result = await res.json();

      if (res.ok) {
        fetchDeliveryCosts();
        setCity("");
        setCost("");
        setIsEditing(false);
        setEditCity("");
        alert(result.message);
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error saving delivery cost:", error);
    }
  };

  // Handle delete
  const handleDelete = async (cityToDelete) => {
    if (!window.confirm(`Are you sure you want to delete delivery cost for ${cityToDelete}?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/deliveryCost/${cityToDelete}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        fetchDeliveryCosts();
        alert(result.message);
      } else {
        alert(result.message || "Delete failed.");
      }
    } catch (error) {
      console.error("Error deleting delivery cost:", error);
    }
  };

  // Handle update button click
  const handleEdit = (city, cost) => {
    setCity(city);
    setCost(cost);
    setEditCity(city);
    setIsEditing(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Delivery Costs</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={isEditing}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Cost</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Delivery Cost" : "Add Delivery Cost"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setCity("");
              setCost("");
              setIsEditing(false);
              setEditCity("");
            }}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">City</th>
            <th className="border p-2 text-left">Cost</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveryCosts.map((item) => (
            <tr key={item.city}>
              <td className="border p-2">{item.city}</td>
              <td className="border p-2">{item.cost}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(item.city, item.cost)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.city)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {deliveryCosts.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No delivery costs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryCost;
