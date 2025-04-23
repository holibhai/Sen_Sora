import React, { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
} from "lucide-react";

const sampleOrders = [
  {
    id: "ORD1001",
    customer: "Alice Johnson",
    date: "2025-04-20",
    status: "Pending",
    total: "$45.99",
  },
  {
    id: "ORD1002",
    customer: "Bob Smith",
    date: "2025-04-21",
    status: "Completed",
    total: "$89.50",
  },
  {
    id: "ORD1003",
    customer: "Carol King",
    date: "2025-04-22",
    status: "Cancelled",
    total: "$0.00",
  },
  {
    id: "ORD1004",
    customer: "Daniel Green",
    date: "2025-04-23",
    status: "Pending",
    total: "$24.75",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Completed":
      return (
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <CheckCircle size={14} /> Completed
        </span>
      );
    case "Pending":
      return (
        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <Clock size={14} /> Pending
        </span>
      );
    case "Cancelled":
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
  const [orders] = useState(sampleOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50">
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

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 font-semibold">{order.total}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 transition">
                    <Eye size={18} />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-600 transition">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
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
