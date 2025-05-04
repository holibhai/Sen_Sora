import React, { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Truck,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const getStatusBadge = (status) => {
  switch (status) {
    case "Processing":
      return (
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <CheckCircle size={14} /> Processing
        </span>
      );
    case "Shipped":
      return (
        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <Truck size={14} /> Shipped
        </span>
      );
    case "Delivered":
      return (
        <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <PackageCheck size={14} /> Delivered
        </span>
      );
    default:
      return null;
  }
};

const OrderDetail = ({ count, setCount }) => {
  const [shipping, setShipping] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/delivery"); // Update to shipping endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch shipping data");
        }
        const data = await response.json();
        setShipping(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShipping();
  }, [count]); // Add count in the dependency array to refetch after a change

  const handleDelete = async (shippingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/shipping/${shippingId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the shipping record");
      }

      alert("Shipping record deleted successfully");
      setShipping(shipping.filter((item) => item.shippingId !== shippingId));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting shipping record: " + error.message);
    }
  };

  const filteredShipping = shipping.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading shipping details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          All Shipping Details
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Shipping ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Delivery Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipping.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium">{item.shippingId}</td>
                <td className="px-6 py-4">
                  {item.firstName} {item.lastName}
                </td>
                <td className="px-6 py-4">{item.city}</td>
                <td className="px-6 py-4">
                  {item.deliveryDate
                    ? new Date(item.deliveryDate).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-6 py-4">{item.orderStatus}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <Link to={`/track/orderfullDetail/${item.orderId}`}>
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <Eye size={18} />
                    </button>
                  </Link>
                  <button className="text-yellow-500 hover:text-yellow-600 transition">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.shippingId)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredShipping.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No shipping details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
