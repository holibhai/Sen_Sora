import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, XCircle, Search } from "lucide-react";

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
        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <CheckCircle size={14} /> Shipped
        </span>
      );
    case "Delivered":
      return (
        <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <CheckCircle size={14} /> Delivered
        </span>
      );
    case "Cancelled":
      return (
        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <XCircle size={14} /> Cancelled
        </span>
      );
    default:
      return (
        <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          Unknown
        </span>
      );
  }
};

const OrderTrackUser = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:5000/api/order/getByUserId/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-xl">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen  pt-44 px-44">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Order ID"
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
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"}`}
              >
                <td className="px-6 py-4 font-medium">{order.orderId}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 font-semibold">Rs.{order.total}</td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
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

export default OrderTrackUser;
