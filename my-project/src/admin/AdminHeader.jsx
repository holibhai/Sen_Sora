import React from "react";
import {
  Bell,
  LogOut,
  Menu,
} from "lucide-react";

const AdminHeader = ({ onToggleSidebar }) => {
  return (
    <header className="fixed w-full top-0 left-0 z-40 bg-gray-800 shadow-md px-4 md:px-6 py-4 flex justify-between items-center">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu for small screens */}
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 hover:text-yellow-500 focus:outline-none md:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-white hidden sm:block">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Notifications */}
        <div className="relative">
          <Bell
            className="text-white hover:text-yellow-500 cursor-pointer"
            size={22}
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            3
          </span>
        </div>

        {/* Profile Image */}
        <img
          src="https://i.pravatar.cc/40"
          alt="admin-profile"
          className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover shadow-md"
        />

        {/* Logout Button */}
        <button className="hidden sm:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md transition">
          <LogOut size={18} />
          Logout
        </button>
        
        {/* Logout icon only for mobile */}
        <button className="sm:hidden p-2 bg-red-500 hover:bg-red-600 rounded-md text-white transition">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
