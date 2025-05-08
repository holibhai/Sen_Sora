// src/layouts/TrackSidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  ListOrdered,
  UserRound,
  Users2,
} from "lucide-react";
import Logo from "../assets/__-removebg-preview.png";


const TrackSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { to: "/track", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/track/orderdetail", label: "shipping orders", icon: <ListOrdered size={18} /> },
    { to: "/track/users", label: "Users", icon: <UserRound size={18} /> },
    { to: "/track/employees", label: "Employees", icon: <Users2 size={18} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white h-full pt-20 w-64 fixed z-40 top-0 left-0 p-4 space-y-4 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
       <div className="flex items-center gap-1 cursor-pointer">
                <img src={Logo} alt="Logo" className="w-[70px] h-[70px]" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Sen-Sora
                </h1>
              </div>

        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-green-500 text-black" : "hover:bg-gray-700"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default TrackSidebar;
