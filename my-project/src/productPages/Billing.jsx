import React, { useEffect, useState } from 'react';
import Delivery from './Delivery';
import image from "../assets/Brown Minimalist Chocolate Cake Food Instagram Post.jpg";
import botImage from "../assets/Indulge Your.jpg";
import { Link } from 'react-router-dom';

const Billing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + Number(shippingCost || 0);

  const handleOrder = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId");
    const today = new Date();
    const newdate = today.toISOString().split('T')[0];
  
    const orderData = {
      userId: userId,
      totalProducts: cartItems.length,
      total: total,
      status: "pending",
      date: newdate
    };
  
    try {
      // Step 1: Create the order
      const res = await fetch('http://localhost:5000/api/order/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
      if (!res.ok) throw new Error("Failed to create order");
  
      const data = await res.json(); // response includes orderId
      alert("Order successfully created!");
  
      // Step 2: Map cart items to orderItems with orderId
      const orderItems = cartItems.map((item) => ({
        orderId: data.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        userId: userId
      }));
        
      // Step 3: Send all orderItems to the backend
      await Promise.all(
        orderItems.map(async (item) => {
          const res = await fetch('http://localhost:5000/api/orderItem/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
  
          if (!res.ok) {
            const errorText = await res.text();
            console.error("Error creating order item:", errorText);
          }
        })
      );
  
      alert("All items added to the order!");
  
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("There was an error placing the order. Please try again.");
    }
  };
  

  return (
    <div className='mt-48 mx-48'>
      <div className='grid grid-cols-1 md:grid-cols-2 border-b border-gray-400 pb-5'>
        <div className='flex flex-col gap-3'>
          <div className='my-10 relative '>
            <img src={image} alt="promo" className='w-full object-cover h-[600px]' />
            <button className='absolute top-24 pt-2 left-24 font-semibold text-white'>
              <Link to="/offerProduct">Shop now</Link>
            </button>
          </div>
        </div>

        <div className='flex flex-col pl-20'>
          <Delivery
            onShippingCostChange={(cost) => setShippingCost(cost)}
            onCityChange={(city) => setSelectedCity(city)}
          />
        </div>
      </div>

      <div className='w-full'>
        <h1 className='text-2xl font-semibold text-gray-700 my-10'>YOUR ORDER</h1>
        <table className='w-full'>
          <thead>
            <tr className='text-left text-gray-500'>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody className='text-gray-500'>
            {cartItems.map((item, idx) => (
              <tr key={idx} className='border-b border-gray-300'>
                <td className='py-5'>{item.productName} x {item.quantity}</td>
                <td>Rs. {item.price * item.quantity}</td>
              </tr>
            ))}
            <tr className='border-b border-gray-300'>
              <td className='py-5 font-semibold'>Subtotal</td>
              <td>Rs. {subtotal}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='py-5 font-semibold'>Shipping</td>
              <td>{selectedCity || "Not selected"}</td>
            </tr>
            <tr className='border-b border-gray-300'>
              <td className='py-5'>Shipping Cost</td>
              <td>Rs. {shippingCost || 0}</td>
            </tr>
            <tr className='border-b border-gray-300 font-bold text-gray-700'>
              <td className='py-5'>Total</td>
              <td>Rs. {total}</td>
            </tr>
          </tbody>
        </table>
        <button className='bg-gray-700 text-white py-3 px-10 my-8' onClick={handleOrder}>PLACE ORDER</button>
      </div>

      <div className='my-16'>
        <img src={botImage} alt="bottom" className='rounded-2xl' />
      </div>
    </div>
  );
};

export default Billing;
