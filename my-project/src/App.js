import React from "react";
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
import AdminLayout from "./admin/AdminLayout";
import AdminHome from "./admin/AdminHome";
import Products from "./admin/Products";
import Orders from "./admin/Orders";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import DeliveryCost from "./admin/DeliveryCost";

const App = () => {
  const location = useLocation();

  // Check if the current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="bg-gradient-to-tr from-indigo-500/30 to-pink-500/30 min-h-screen">
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListed />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/pickup" element={<PickUp />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="updateProduct/:id" element={<UpdateProduct />} />
          <Route path="deliverycost" element={<DeliveryCost />} />






          
        </Route>

        </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
