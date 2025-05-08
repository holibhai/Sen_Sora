import React, { useEffect, useState } from "react";
import {
  Cake,
  Gift,
  ShoppingCart,
  Users,
  DollarSign,
  PackageCheck,
} from "lucide-react";

const AdminHome = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
  const customerCount = 98;

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <PackageCheck size={24} className="text-white" />,
      gradient: "from-purple-500 to-purple-700",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCart size={24} className="text-white" />,
      gradient: "from-green-500 to-green-700",
    },
    {
      title: "Revenue",
      value: `Rs.${totalRevenue}`,
      icon: <DollarSign size={24} className="text-white" />,
      gradient: "from-yellow-400 to-yellow-600",
    },
     
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/order/");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const latestOrders = orders.slice(-5).reverse();
  const recentProducts = products.slice(-3).reverse();

  return (
    <div className="p-6 md:p-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, Admin 🎉</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-r ${stat.gradient} text-white shadow-lg rounded-xl p-5 flex items-center justify-between transition-transform hover:scale-105`}
          >
            <div>
              <p className="text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Latest Orders and Recent Products */}
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
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-2 px-2">{order._id || `ORD-${index + 1}`}</td>
                  <td
                    className={`py-2 px-2 font-medium ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.status || "Pending"}
                  </td>
                  <td className="py-2 px-2">Rs.{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Products (now in Table format) */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Recent Products
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Product</th>
                <th className="py-2">Category</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-2 px-2 flex items-center gap-2">
                    {product.category === "Cake" ? (
                      <Cake size={18} className="text-pink-500" />
                    ) : (
                      <Gift size={18} className="text-blue-500" />
                    )}
                    <span>{product.name}</span>
                  </td>
                  <td className="py-2 px-2 text-gray-600">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
