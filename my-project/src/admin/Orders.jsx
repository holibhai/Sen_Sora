import React, { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
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
    case "Pending":
      return (
        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <Clock size={14} /> Pending
        </span>
      );
    case "Shipped":
      return (
        <span className="bg-red-100 text-green-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <XCircle size={14} /> Shipped
        </span>
      );
      case "Delivered":
      return (
        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <XCircle size={14} /> Cancelled
        </span>
      );
    default:
      return null;
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/order/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setOrders(data);
        console.log("Fetched products:", data); // For debugging
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /*const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );*/

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6  min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/${orderId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the order');
      }
  
      alert('Order deleted successfully');
      // Optionally, redirect or update state:
      // navigate('/orders'); or refresh data
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting order: ' + error.message);
    }
  };
  
  return (
    <div className="p-6 w-full min-h-screen ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto  shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">

            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"}`}

              >
                <td className="px-6 py-4 font-medium">{order.orderId}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 font-semibold">{order.total}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <Link to={`/admin/orderdetails/${order.orderId}`}>
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <Eye size={18} />
                    </button>
                  </Link>

                  <button className="text-yellow-500 hover:text-yellow-600 transition">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition" onClick={()=>handleDelete(order.orderId)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
