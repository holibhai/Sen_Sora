import React, { useEffect, useState } from 'react';

const TrackHome = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/order/");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
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

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === "Pending").length;
  const shippedOrders = orders.filter(order => order.status === "Shipped").length;
  const deliveredOrders = orders.filter(order => order.status === "Delivered").length;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">Order Tracking Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-blue-100 text-blue-800 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Total Orders</h2>
              <p className="text-2xl mt-2">{totalOrders}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Pending</h2>
              <p className="text-2xl mt-2">{pendingOrders}</p>
            </div>
            <div className="bg-purple-100 text-purple-800 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Shipped</h2>
              <p className="text-2xl mt-2">{shippedOrders}</p>
            </div>
            <div className="bg-green-100 text-green-800 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Delivered</h2>
              <p className="text-2xl mt-2">{deliveredOrders}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">User ID</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="border-t text-gray-600 hover:bg-gray-50">
                    <td className="px-6 py-4">{order.orderId}</td>
                    <td className="px-6 py-4">{order.userId}</td>
                    <td className="px-6 py-4 capitalize">{order.status}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">Rs. {order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TrackHome;
