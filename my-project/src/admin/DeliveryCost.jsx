import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Save,
  Trash2,
  Edit,
  XCircle,
  MapPin,
  DollarSign,
} from "lucide-react";

const DeliveryCost = () => {
  const [deliveryCosts, setDeliveryCosts] = useState([]);
  const [city, setCity] = useState("");
  const [cost, setCost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCity, setEditCity] = useState("");

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

  const handleDelete = async (cityToDelete) => {
    if (!window.confirm(`Delete delivery cost for ${cityToDelete}?`)) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/deliveryCost/${cityToDelete}`,
        {
          method: "DELETE",
        }
      );

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

  const handleEdit = (city, cost) => {
    setCity(city);
    setCost(cost);
    setEditCity(city);
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        Delivery Cost Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className=" shadow-md rounded-lg p-6 space-y-5 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center font-medium text-gray-700 mb-1">
              <MapPin className="mr-2" size={18} /> City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-100"
              disabled={isEditing}
            />
          </div>
          <div>
            <label className="flex items-center font-medium text-gray-700 mb-1">
              <DollarSign className="mr-2" size={18} /> Cost (Rs)
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-yellow-100"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 pt-4">
          <button
            type="submit"
            className={`flex items-center gap-2 px-4 py-2 rounded text-white transition ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isEditing ? <Save size={18} /> : <PlusCircle size={18} />}
            {isEditing ? "Update Cost" : "Add Cost"}
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
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <XCircle size={18} /> Cancel
            </button>
          )}
        </div>
      </form>

      {/* Delivery Costs Table */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">All Delivery Costs</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm shadow rounded overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left p-3 border">City</th>
                <th className="text-left p-3 border">Cost (Rs.)</th>
                <th className="text-left p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveryCosts.length > 0 ? (
                deliveryCosts.map((item) => (
                  <tr key={item.city} className="hover:bg-gray-50">
                    <td className="p-3 border">{item.city}</td>
                    <td className="p-3 border">Rs. {item.cost}</td>
                    <td className="p-3 border space-x-2">
                      <button
                        onClick={() => handleEdit(item.city, item.cost)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-yellow-600"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.city)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No delivery costs found.
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

export default DeliveryCost;
