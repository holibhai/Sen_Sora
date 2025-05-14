import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Eye,
  Truck,
  PackageSearch,
  PackageCheck,
  Frown,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const getStatusBadge = (status) => {
  const statusStyles = {
    Processing: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle size={14} />
    },
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: <Clock size={14} />
    },
    Shipped: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <Truck size={14} />
    },
    Delivered: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      icon: <PackageCheck size={14} />
    },
    Cancelled: {
      bg: "bg-red-100",
      text: "text-red-600",
      icon: <XCircle size={14} />
    }
  };

  const style = statusStyles[status] || {
    bg: "bg-gray-200",
    text: "text-gray-600",
    icon: null
  };

  return (
    <span className={`${style.bg} ${style.text} px-2 py-0.5 rounded text-xs flex items-center gap-1`}>
      {style.icon}
      {status}
    </span>
  );
};

const OrderTrackUser = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("Please login to view your orders");
        }

        const response = await fetch(
          `http://localhost:5000/api/order/getByUserId/${userId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            // No orders found is not an error case
            setOrders([]);
            return;
          }
          throw new Error("Unable to fetch your orders at this time");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Received unexpected data format");
        }

        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCount = (status) =>
    orders.filter((order) => order.status === status).length;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="flex flex-col items-center max-w-md text-center">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading your orders</h2>
          <p className="text-gray-600">We're retrieving your order history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="flex flex-col items-center max-w-md text-center bg-white p-8 rounded-xl shadow-sm">
          <XCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Order History</h1>
            <p className="text-gray-500 mt-1">
              {orders.length > 0 
                ? `You have ${orders.length} order${orders.length !== 1 ? 's' : ''}`
                : 'Your order history is currently empty'}
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Summary Cards */}
        {orders.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <PackageSearch className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{orders.length}</dd>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{statusCount("Pending")}</dd>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <Truck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Shipped</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{statusCount("Shipped")}</dd>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <PackageCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Delivered</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">{statusCount("Delivered")}</dd>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                <Frown className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="px-6 py-4 text-center">
              <p className="text-gray-500">No orders match your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        Rs.{order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/orderdetailUser/${order.orderId}`)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end w-full"
                        >
                          <Eye className="mr-1 h-4 w-4" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackUser;