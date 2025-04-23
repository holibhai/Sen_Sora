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
} from "lucide-react";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin/products", label: "Products", icon: <Package size={18} /> },
    { to: "/admin/orders", label: "Orders", icon: <ListOrdered size={18} /> },
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
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
          Cake & Gifts
        </h2>

        {navLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-700"
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
