import React from "react";
import {
  Cake,
  Gift,
  ShoppingCart,
  Users,
  DollarSign,
  PackageCheck,
} from "lucide-react";

const AdminHome = () => {
  // Sample data                           
  const stats = [
    {
      title: "Total Products",
      value: "132",
      icon: <PackageCheck size={24} className="text-purple-600" />,
    },
    {
      title: "Total Orders",
      value: "248",
      icon: <ShoppingCart size={24} className="text-green-600" />,
    },
    {
      title: "Revenue",
      value: "$12,430",
      icon: <DollarSign size={24} className="text-yellow-500" />,
    },
    {
      title: "Customers",
      value: "98",
      icon: <Users size={24} className="text-blue-500" />,
    },
  ];

  const latestOrders = [
    { id: "ORD001", customer: "Alice", status: "Pending", total: "$45" },
    { id: "ORD002", customer: "Bob", status: "Completed", total: "$120" },
    { id: "ORD003", customer: "Charlie", status: "Cancelled", total: "$32" },
  ];

  const recentProducts = [
    { name: "Chocolate Cake", category: "Cake" },
    { name: "Anniversary Gift Box", category: "Gift" },
    { name: "Vanilla Cupcake", category: "Cake" },
  ];

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, Admin 🎉</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-700">{stat.value}</p>
            </div>
            <div className="bg-gray-100 p-2 rounded-full">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Latest Orders
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className={`py-2 font-medium ${order.status === "Completed"
                    ? "text-green-600"
                    : order.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-500"
                  }`}>
                    {order.status}
                  </td>
                  <td className="py-2">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Products
          </h2>
          <ul className="space-y-4">
            {recentProducts.map((product, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {product.category === "Cake" ? (
                    <Cake size={22} className="text-pink-500" />
                  ) : (
                    <Gift size={22} className="text-blue-400" />
                  )}
                  <span className="text-gray-700">{product.name}</span>
                </div>
                <span className="text-sm text-gray-500">{product.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
