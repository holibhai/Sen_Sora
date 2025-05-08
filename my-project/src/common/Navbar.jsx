import React, { useEffect, useState, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaUser, FaShoppingCart, FaBell } from "react-icons/fa";
import Logo from "../assets/__-removebg-preview.png";

const Navbar = ({ count, setCount }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [pdata, setPData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newStatusUpdate, setNewStatusUpdate] = useState(false);
  const [changedOrders, setChangedOrders] = useState([]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const previousStatuses = useRef({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userId"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/api/order/getByUserId/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user orders");
        const data = await response.json();

        let updates = [];
        data.forEach((order) => {
          const prevStatus = previousStatuses.current[order.orderId];
          if (prevStatus && prevStatus !== order.status) {
            updates.push({ orderId: order.orderId, status: order.status });
          }
          previousStatuses.current[order.orderId] = order.status;
        });

        if (updates.length > 0) {
          setNewStatusUpdate(true);
          setChangedOrders(updates);
        }

        setOrders(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    const interval = setInterval(fetchOrders, 5000);
    fetchOrders();
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to view notifications.");
      return navigate("/login");
    }
    setShowNotificationDropdown(!showNotificationDropdown);
    setNewStatusUpdate(false);
  };

  const [categories, setCategories] = useState([
    { name: "cake", subcategories: [] },
    { name: "gift", subcategories: [] },
  ]);

  let closeTimeout;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/getAll");
        const data = await res.json();

        const cakeSubs = data.filter(c => c.type?.toLowerCase() === "cake").map(c => c.category);
        const giftSubs = data.filter(c => c.type?.toLowerCase() === "gift").map(c => c.category);

        setCategories([
          { name: "cake", subcategories: cakeSubs },
          { name: "gift", subcategories: giftSubs }
        ]);
      } catch (error) {
        console.log("error in fetching", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (category) => {
    navigate("/products", { state: { category } });
    setHoveredCategory(null);
  };

  const handleSubCategory = (sub) => {
    navigate("/products", { state: { sub } });
    setHoveredCategory(null);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await response.json();
        setPData(data);
      } catch (err) {
        alert("Error fetching cart items.");
      }
    };

    fetchCartItems();
  }, [count]);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleProtectedRoute = (route) => {
    if (!isLoggedIn) {
      alert("Please log in to access this feature.");
      return navigate("/login");
    }
    navigate(route);
  };

  return (
    <>
      <div className="flex flex-col relative">
        <nav className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 md:px-12 h-16 md:h-20 border-b border-gray-100">
            <div className="flex items-center gap-1 cursor-pointer">
              <img src={Logo} alt="Logo" className="w-[70px] h-[70px]" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Sen-Sora</h1>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>

            {isLoggedIn ? (
              <button
                className="hidden md:block bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 text-sm font-medium transition-all hover:shadow-lg"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <button className="hidden md:block bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 text-sm font-medium transition-all hover:shadow-lg">
                <Link to="/login">Sign In</Link>
              </button>
            )}
          </div>

          <div className="relative">
            <nav className="p-3">
              <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-center gap-36">
                <div className="flex justify-center items-center space-x-6">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="relative group"
                      onMouseEnter={() => {
                        clearTimeout(closeTimeout);
                        setHoveredCategory(index);
                      }}
                      onMouseLeave={() => {
                        closeTimeout = setTimeout(() => setHoveredCategory(null), 300);
                      }}
                    >
                      <button
                        className="px-4 py-2 text-neutral-700 font-semibold rounded-lg hover:text-indigo-500"
                        onClick={() => handleClick(category.name)}
                      >
                        {category.name}
                      </button>
                    </div>
                  ))}
                  <Link to="/" className="px-4 py-2 text-neutral-700 font-semibold hover:text-indigo-500">Home</Link>
                  <Link to="/contact" className="px-4 py-2 text-neutral-700 font-semibold hover:text-indigo-500">Contact</Link>
                  <Link to="/about" className="px-4 py-2 text-neutral-700 font-semibold hover:text-indigo-500">About</Link>
                </div>

                <div className="relative w-full md:w-1/4">
                  <input
                    type="text"
                    placeholder="Search for items..."
                    className="w-full p-3 pl-4 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none text-sm"
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>

                <div className="flex items-center space-x-5">
                  <FaUser
                    className="text-gray-700 text-xl cursor-pointer hover:text-blue-500"
                    onClick={() => handleProtectedRoute("/trackuser")}
                  />
                  <div className="relative inline-block" onClick={() => handleProtectedRoute("/checkout")}>
                    <FaShoppingCart className="text-gray-700 text-2xl cursor-pointer hover:text-green-500" />
                    {pdata.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                        {pdata.length}
                      </span>
                    )}
                  </div>

                  <div className="relative cursor-pointer" onClick={handleNotificationClick}>
                    <FaBell className="text-gray-700 text-xl hover:text-yellow-500" />
                    {newStatusUpdate && (
                      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-semibold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                        !
                      </span>
                    )}
                    {showNotificationDropdown && changedOrders.length > 0 && (
                      <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                        <h3 className="font-semibold text-sm text-gray-700 mb-2">Order Updates:</h3>
                        <ul className="space-y-1 max-h-48 overflow-auto">
                          {changedOrders.map((order, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              Order <span className="font-medium text-blue-500">{order.orderId}</span> status changed to <span className="font-semibold text-green-600">{order.status}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>

            {hoveredCategory !== null && (
              <div
                className="absolute h-[300px] px-12 left-0 w-screen border-t flex transition-opacity duration-200"
                onMouseEnter={() => {
                  clearTimeout(closeTimeout);
                  setHoveredCategory(hoveredCategory);
                }}
                onMouseLeave={() => {
                  closeTimeout = setTimeout(() => setHoveredCategory(null), 300);
                }}
              >
                <div
                  className="mx-auto w-full rounded-2xl bg-cover"
                  style={{ backgroundImage: "url('Delicious.jpg')" }}
                >
                  <div className="w-1/2">
                    <ul className="text-gray-700 space-y-2">
                      {categories[hoveredCategory]?.subcategories.map((sub, i) => (
                        <li
                          key={i}
                          className="px-4 py-2 text-white cursor-pointer hover:text-rose-400"
                          onClick={() => handleSubCategory(sub)}
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
