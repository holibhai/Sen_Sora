import React from "react";
import Register from './auth/Register'
import Login from "./auth/Login";
import { Routes, Route } from "react-router-dom";
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


const App = () => {
  return (
    <div className="bg-gradient-to-tr from-indigo-500/30 to-pink-500/30  "> 
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListed />} /> 
        <Route path="/productDetail" element={<ProductDetail/>} />
        <Route path="/checkout" element={<CheckOut/>} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/delivery" element={<Delivery />} />    
        <Route path="/pickup" element={<PickUp />} />



      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
