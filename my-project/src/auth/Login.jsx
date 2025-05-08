import React, { useState } from 'react';
import image from '../assets/table-arrangement-birthday-event-with-cake-sweets_23-2149312341.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      localStorage.setItem("userToken",data.token);
      localStorage.setItem("userId",data.user.userId);
      alert(data.message || 'Login successful!');
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center pt-20 '>
      <div className='flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4 max-w-4xl'>
        {/* Left Side - Image */}
        <div className='w-1/2 hidden md:block'>
          <img src={image} alt='Login' className='w-full h-full object-cover ' />
        </div>
        
        {/* Right Side - Form */}
        <div className='w-full md:w-1/2 p-8 flex flex-col justify-center'>
          <h2 className='text-3xl font-bold text-center text-gray-700'>Welcome Back!</h2>
          <p className='text-center text-gray-500 mb-6'>Login to your account</p>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label className='block text-gray-700'>Email</label>
              <input type='email' name='email' value={formData.email} onChange={handleChange} className='w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none' placeholder='Enter your email' />
            </div>
            <div>
              <label className='block text-gray-700'>Password</label>
              <input type='password' name='password' value={formData.password} onChange={handleChange} className='w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none' placeholder='Enter your password' />
            </div>
            <div className='flex justify-between items-center'>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                Remember me
              </label>
              <a href='#' className='text-blue-500 hover:underline'>Forgot password?</a>
            </div>
            <button type='submit' className='w-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white p-3 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none text-lg'>Login</button>
          </form>
          <p className='text-center text-gray-500 mt-4'>Don't have an account? <a href='#' className='text-blue-500 hover:underline'><Link to="/register">Sign up</Link></a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;