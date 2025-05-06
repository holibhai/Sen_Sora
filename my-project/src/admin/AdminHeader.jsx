import React, { useState, useEffect, useRef } from "react";
import { Bell, LogOut, Menu, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ onToggleSidebar }) => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/order");
        const data = await res.json();

        const filtered = data.filter(
          (order) => order.status?.toLowerCase() === "pending"
        );
        setOrders(data);
        setPendingOrders(filtered);
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };
  

  return (
    <header className="fixed w-full top-0 left-0 z-40 bg-gray-800 shadow-md px-4 md:px-6 py-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-gray-300 hover:text-yellow-500 focus:outline-none md:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-white hidden sm:block">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 md:gap-6 relative" ref={notificationRef}>
        {/* Notifications */}
        <div className="relative">
          <Bell
            className="text-white hover:text-yellow-500 cursor-pointer"
            size={22}
            onClick={() => setShowNotifications((prev) => !prev)}
          />
          {pendingOrders.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
              {pendingOrders.length}
            </span>
          )}

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="p-4 border-b bg-gray-100 font-semibold text-gray-800">
                Pending Orders ({pendingOrders.length})
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {pendingOrders.length === 0 ? (
                  <li className="p-4 text-sm text-gray-600">No pending orders</li>
                ) : (
                  pendingOrders.map((order) => (
                    <li
                      key={order.orderId}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 border-b"
                    >
                      <Clock className="text-yellow-500 mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-800 font-medium">
                          Order #{order.orderId}
                        </p>
                        <p className="text-xs text-gray-500">
                          Placed on {order.date}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Image */}
        <img
          src="https://i.pravatar.cc/40"
          alt="admin-profile"
          className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover shadow-md"
        />

        {/* Logout Button */}
        <button className="hidden sm:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md transition" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>

        {/* Mobile Logout Icon */}
        <button className="sm:hidden p-2 bg-red-500 hover:bg-red-600 rounded-md text-white transition" onClick={handleLogout}>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
