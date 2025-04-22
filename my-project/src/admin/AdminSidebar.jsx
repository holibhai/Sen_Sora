import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Package,
  List,
  ChevronDown,
  ChevronUp,
  Users,
  UserPlus,
  Settings,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const [productOpen, setProductOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-neutral-400 h-screen fixed shadow-xl z-50 flex flex-col p-4 space-y-4">
      <h2 className="text-2xl font-bold  text-center mb-4 tracking-wide">
        Exsora Admin
      </h2>

      <NavLink
        to="/admin"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
      >
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      {/* Product Dropdown */}
      <div>
        <button
          onClick={() => setProductOpen(!productOpen)}
          className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-800 rounded-md transition"
        >
          <div className="flex items-center gap-3">
            <PackagePlus size={18} /> Products
          </div>
          {productOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {productOpen && (
          <div className="ml-6 mt-4 space-y-8 text-sm">
            <NavLink to="/admin/catagory" className="block hover:text-neutral-300">
              ➤ Product Catagory
            </NavLink>
            <NavLink to="/admin/addProductType" className="block hover:text-neutral-300">
              ➤ Add Product Type
            </NavLink>
            <NavLink to="/admin/productType" className="block hover:text-neutral-300">
              ➤ Product Types
            </NavLink>
            <NavLink to="/admin/displayProducts" className="block hover:text-neutral-300">
              ➤ Display Products
            </NavLink>
          </div>
        )}
      </div>

      {/* Order Dropdown */}
      <div>
        <button
          onClick={() => setOrderOpen(!orderOpen)}
          className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-800 rounded-md transition"
        >
          <div className="flex items-center gap-3">
            <List size={18} /> Orders
          </div>
          {orderOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {orderOpen && (
          <div className="ml-6 mt-4 space-y-8 text-sm">
            <NavLink to="/admin/displayOrders" className="block hover:text-yellow-300">
              ➤ All Orders
            </NavLink>
            <NavLink to="/admin/orders/pending" className="block hover:text-yellow-300">
              ➤ Pending Orders
            </NavLink>
            <NavLink to="/admin/orders/completed" className="block hover:text-yellow-300">
              ➤ Completed Orders
            </NavLink>
            <NavLink to="/admin/orders/cancelled" className="block hover:text-yellow-300">
              ➤ Cancelled Orders
            </NavLink>
          </div>
        )}
      </div>

      {/* User Dropdown */}
      <div>
        <button
          onClick={() => setUserOpen(!userOpen)}
          className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-800 rounded-md transition"
        >
          <div className="flex items-center gap-3">
            <Users size={18} /> Users
          </div>
          {userOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {userOpen && (
          <div className="ml-6 mt-4 space-y-8 text-sm">
            <NavLink to="/admin/addUser" className="block hover:text-yellow-300">
              ➤ Add User
            </NavLink>
            <NavLink to="/admin/manageUsers" className="block hover:text-yellow-300">
              ➤ Manage Users
            </NavLink>
          </div>
        )}
      </div>

      <NavLink
        to="/admin/settings"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition"
      >
        <Settings size={18} /> Settings
      </NavLink>

      <NavLink
        to="/logout"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition mt-auto"
      >
        <LogOut size={18} /> Logout
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
