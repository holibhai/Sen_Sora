import React, { useEffect, useState } from 'react';
import Delivery from './Delivery';
import image from "../assets/Brown Minimalist Chocolate Cake Food Instagram Post.jpg";
import botImage from "../assets/Indulge Your.jpg";
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const Billing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    mobileNumber: "",
    address1: "",
    address2: "",
    orderNotes: "",
    userId: "",
    orderId: ""
  });

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

  const validateFormData = () => {
    const requiredFields = ['firstName', 'lastName', 'city', 'mobileNumber', 'address1'];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
        return false;
      }
    }
    return true;
  };

  const handleStripe = async () => {
    try {
      const stripe = await loadStripe("pk_test_51RLzK4DBPjhydGB2EGG2SwUhN3QTQmkINMdP1LsCWxCi2i8iHV6E4zm7nCFvn9U8RUz2Oj3e2nIC6R8OGwydcZDL00TILxxyIs");

      const conversionRate = 308; // 1 USD = 320 LKR (adjust based on live rate) 

      const products = cartItems.map((item) => ({
        name: item.productName,
        price: parseFloat((item.price / conversionRate).toFixed(2)), // convert LKR to USD
        quantity: item.quantity,
        image: item.image || "https://via.placeholder.com/150",
      }));

      if (shippingCost > 0) {
        products.push({
          name: `Shipping (${selectedCity})`,
          price: parseFloat((Number(shippingCost) / conversionRate).toFixed(2)),
          quantity: 1,
          image: "https://via.placeholder.com/150",
        });
      }

      const response = await fetch("http://localhost:5000/api/stripe/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products }),
      });

      const data = await response.json();

      if (!response.ok || !data.id) {
        throw new Error("Stripe session creation failed.");
      }

      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        alert("Payment failed to start. Try again.");
      }

    } catch (error) {
      console.error("Stripe error:", error);
      alert("Stripe checkout failed. Please try again.");
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!validateFormData()) return;

    const today = new Date();
    const date = today.toISOString().split('T')[0];

    const orderData = {
      userId,
      totalProducts: cartItems.length,
      total,
      status: "pending",
      date,
    };

    try {
      const orderRes = await fetch('http://localhost:5000/api/order/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!orderRes.ok) throw new Error("Order creation failed");

      const orderResData = await orderRes.json();
      const createdOrderId = orderResData.orderId;
      setOrderId(createdOrderId);

      const orderItems = cartItems.map((item) => ({
        orderId: createdOrderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        userId,
      }));

      await Promise.all(
        orderItems.map(async (item) => {
          const res = await fetch('http://localhost:5000/api/orderItem/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to add order item:", errorText);
            throw new Error("Order item error");
          }

          return res.json();
        })
      );

      const deliveryPayload = {
        ...formData,
        userId,
        orderId: createdOrderId,
      };

      const deliveryRes = await fetch('http://localhost:5000/api/delivery/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deliveryPayload),
      });

      if (!deliveryRes.ok) {
        const deliveryError = await deliveryRes.text();
        console.error("Delivery error:", deliveryError);
        throw new Error("Failed to submit delivery");
      }

      await handleStripe();

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
            onShippingCostChange={setShippingCost}
            onCityChange={setSelectedCity}
            formData={formData}
            setFormData={setFormData}
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
