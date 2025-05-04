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
  console.log(orders);

  // const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);


  // Sample customer count (replace with actual count logic if needed)
  const customerCount = 98;

  // Stats configuration
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <PackageCheck size={24} className="text-purple-600" />,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <ShoppingCart size={24} className="text-green-600" />,
    },
    {
      title: "Revenue",
      value: `Rs.${totalRevenue}`,
      icon: <DollarSign size={24} className="text-yellow-500" />,
    },
    {
      title: "Customers",
      value: customerCount,
      icon: <Users size={24} className="text-blue-500" />,
    },
  ];

  // Fetch products
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

  // Fetch orders
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

  // Show last 5 orders (sorted by date if needed)
  const latestOrders = orders.slice(-5).reverse();

  // Placeholder recent products — can be replaced with logic to get recent ones
  const recentProducts = products.slice(-3).reverse();

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, Admin 🎉</h1>

      {/* Stats */}
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

      {/* Latest Orders & Recent Products */}
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
              {latestOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{order._id || `ORD-${index + 1}`}</td>
                  <td className="py-2">{order.customerName || "N/A"}</td>
                  <td
                    className={`py-2 font-medium ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.status || "Pending"}
                  </td>
                  <td className="py-2">Rs.{order.total}</td>
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
