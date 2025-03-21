import React from "react";
import Register from './auth/Register'
import Login from "./auth/Login";
import { Routes, Route } from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import Home from "./navPages/Home";
import Contact from "./navPages/Contact";
import About from "./navPages/About";

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
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
