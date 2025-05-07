import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Register from "./auth/Register";
import Login from "./auth/Login";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import Home from "./navPages/Home";
import Contact from "./navPages/Contact";
import About from "./navPages/About";
import ProductListed from "./productPages/productMainPage/ProductListed";
import ProductDetail from "./productPages/ProductDetails";
import CheckOut from "./productPages/CheckOut";
import Billing from "./productPages/Billing";
import Delivery from "./productPages/Delivery";
import PickUp from "./productPages/PickUp";
import OrderTrackUser from "./productPages/OrderTrackUser";
import OrderDetailUser from "./productPages/OrderDetailUser";

import AdminLayout from "./admin/AdminLayout";
import AdminHome from "./admin/AdminHome";
import Products from "./admin/Products";
import Orders from "./admin/Orders";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import DeliveryCost from "./admin/DeliveryCost";
import OrderDetails from "./admin/OrderDetails";
import AdminLogin from "./admin/AdminLogin";

import TrackLayout from "./Track/TrackLayout";
import TrackHome from "./Track/TrackHome";
import OrderDetail from "./Track/OrderDetail";
import TrackerLogin from "./Track/TrackerLogin";
import OrderFullDetail from "./Track/OrderFullDetail";

import ProtectedRoute from "./admin/ProtectedRoute";
import ProtectedTrackRoute from "./Track/ProtectedTrackRoute";
import Success from "./payment/Success";
import Failure from "./payment/Failure";
const App = () => {
  const location = useLocation();
  const [count, setCount] = useState(0);

  const isAdminOrTrackingRoute =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/track");

  return (
    <div className="bg-gradient-to-tr from-indigo-500/30 to-pink-500/30 min-h-screen">
      {!isAdminOrTrackingRoute && <Navbar count={count} setcount={setCount} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListed />} />
        <Route
          path="/productDetail/:id"
          element={<ProductDetail count={count} setCount={setCount} />}
        />
        <Route path="/checkout" element={<CheckOut count={count} setCount={setCount} />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/pickup" element={<PickUp />} />
        <Route path="/trackuser" element={<OrderTrackUser />} />
        <Route path="/orderdetailUser/:orderId" element={<OrderDetailUser />} />
        <Route path="/success" element={<Success count={count} setcount={setCount} />} />
        <Route path="/failure" element={<Failure />} />



        {/* Admin Login (Public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="updateProduct/:id" element={<UpdateProduct />} />
            <Route path="deliverycost" element={<DeliveryCost />} />
            <Route path="orderdetails/:orderId" element={<OrderDetails />} />
          </Route>
        </Route>

        <Route path="/tracker/login" element={<TrackerLogin />} />


        {/* Tracking Routes */}
        <Route path="/track" element={<ProtectedTrackRoute />}>
  <Route element={<TrackLayout />}>
    <Route index element={<TrackHome />} />
    <Route path="orderdetail" element={<OrderDetail />} />
    <Route path="orderfullDetail/:orderId" element={<OrderFullDetail />} />
  </Route>
</Route>
      </Routes>

      {!isAdminOrTrackingRoute && <Footer />}
    </div>
  );
};

export default App;
