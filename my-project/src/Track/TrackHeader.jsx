import React, { useEffect, useState, useRef } from "react";
import { Bell, PackageCheck,LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrackHeader = () => {
  const [shippingList, setShippingList] = useState([]);
  const [notAcceptedOrders, setNotAcceptedOrders] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/delivery");
        const data = await res.json();
        setShippingList(data);

        const notAccepted = data.filter(item => item.orderStatus === "Not Accepted");
        setNotAcceptedOrders(notAccepted);
      } catch (err) {
        console.error("Error fetching delivery data:", err);
        alert("Failed to fetch delivery data");
      }
    };

    fetchData();
  }, []);

  // Close on outside click
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
    localStorage.removeItem("trackerToken");
    navigate("/tracker/login");
  };
  

  return (
    <header className="fixed w-full top-0 left-0 z-40 bg-gray-800 shadow-md px-4 md:px-6 py-4 flex justify-between items-center">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Track Order
        </h1>
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center gap-4 md:gap-6 relative" ref={notificationRef}>
        {/* Notification Icon */}
        <div className="relative">
          <Bell
            className="text-white hover:text-yellow-500 cursor-pointer"
            size={22}
            onClick={() => setShowNotifications(prev => !prev)}
          />
          {notAcceptedOrders.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
              {notAcceptedOrders.length}
            </span>
          )}

          {/* Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="p-4 border-b bg-gray-100 font-semibold text-gray-800">
                Not Accepted Orders ({notAcceptedOrders.length})
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notAcceptedOrders.length === 0 ? (
                  <li className="p-4 text-sm text-gray-600">
                    All deliveries accepted.
                  </li>
                ) : (
                  notAcceptedOrders.map((item) => (
                    <li
                      key={item.deliveryId}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 border-b"
                    >
                      <PackageCheck className="text-yellow-500 mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-800 font-medium">
                          Delivery #{item.shippingId}
                        </p>
                        <p className="text-xs text-gray-500">
                          Status: {item.orderStatus}
                        </p>
                        <p className="text-xs text-gray-400">
                          Customer: {item.customerName || "Unknown"}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover shadow-md"
        />
         <button className="hidden sm:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md transition" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default TrackHeader;
