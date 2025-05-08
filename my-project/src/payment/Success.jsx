import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = ({count,setCount}) => {

     useEffect(()=>{
      const deleteCartItem=async()=>{
      try {
        const userId=localStorage.getItem('userId');
        const res = await fetch(`http://localhost:5000/api/cart/clear/${userId}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          console.error("Failed to clear cart. Status:", res.status);
        }
      } catch (err) {
        console.error("Error clearing cart:", err);
      }
    }
    deleteCartItem();
     },[count])
  
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-20 mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center animate-fade-in-up">
        <CheckCircle className="mx-auto text-green-500" size={64} />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>

        <div className="mt-6">
          <Link to="/" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
            Go to Home
          </Link>
          <Link to="/trackuser" className="ml-4 inline-block border border-green-500 text-green-600 hover:bg-green-100 font-semibold py-2 px-6 rounded-lg transition duration-200">
            View Orders
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-6">You’ll receive an email confirmation shortly.</p>
      </div>
    </div>
  );
};

export default Success;
