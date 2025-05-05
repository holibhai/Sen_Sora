import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ListOrdered,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Truck, // ✅ New icon for Delivery Cost
} from "lucide-react";
import Logo from "../assets/__-removebg-preview.png";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProductDropdown = () =>
    setProductDropdownOpen(!productDropdownOpen);

  const navLinks = [
    { to: "/admin/orders", label: "Orders", icon: <ListOrdered size={18} /> },
    {
      to: "/admin/deliverycost",
      label: "Delivery Cost",
      icon: <Truck size={18} />,
    }, // ✅ New link
    { to: "/admin/profile", label: "Profile", icon: <UserCircle size={18} /> },
    { to: "/logout", label: "Logout", icon: <LogOut size={18} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-neutral-200 h-full pt-20 w-64 fixed z-40 top-0 left-0 p-4 space-y-4 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="flex items-center gap-1 cursor-pointer">
          <img src={Logo} alt="Logo" className="w-[70px] h-[70px]" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sen-Sora
          </h1>
        </div>

        {/* Dashboard Link */}
        <NavLink
          to="/admin"
          // className={({ isActive }) =>
          //   `flex items-center gap-3 px-3 py-2 rounded-md transition ${
          //     isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
          //   }`
          // }
          className="flex items-center gap-3 px-3 py-2 rounded-md"
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        {/* Products Dropdown */}
        <button
          onClick={toggleProductDropdown}
          className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-700 transition text-left"
        >
          <div className="flex items-center gap-3">
            <Package size={18} /> Products
          </div>
          {productDropdownOpen ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {productDropdownOpen && (
          <div className="ml-6 space-y-2">
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `block px-2 py-1 rounded-md text-sm ${
                  isActive ? "bg-red-500 text-white" : "hover:bg-gray-700"
                }`
              }
            >
              View Products
            </NavLink>
            <NavLink
              to="/admin/category"
              className={({ isActive }) =>
                `block px-2 py-1 rounded-md text-sm ${
                  isActive ? "bg-red-500 text-white" : "hover:bg-gray-700"
                }`
              }
            >
              Add Category
            </NavLink>
          </div>
        )}

        {/* Remaining Links */}
        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-red-500 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default AdminSidebar;
