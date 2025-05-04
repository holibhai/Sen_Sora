import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import sideImage from "../assets/cake11.jpg";
import { Link } from "react-router-dom";

const CheckOut = ({count,setCount}) => {
  const [pdata, setPdata] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch cart items.");
        const data = await response.json();
        setPdata(data);
      } catch (err) {
        alert("Error fetching cart items.");
      }
    };

    fetchCartItems();
  }, [count]);

  const handleIncrease = async (index, cartId) => {
    const updatedData = [...pdata];
    updatedData[index].quantity += 1;
    setPdata(updatedData);
    try {
      await fetch(`http://localhost:5000/api/cart/increment/${cartId}`, { method: 'PUT' });
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecrease = async (index, cartId) => {
    const updatedData = [...pdata];
    if (updatedData[index].quantity > 1) {
      updatedData[index].quantity -= 1;
      setPdata(updatedData);
      try {
        await fetch(`http://localhost:5000/api/cart/decrement/${cartId}`, { method: 'PUT' });
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const handleDelete = async (cartId) => {
    setCount((count)=>count-1)
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPdata((prevData) => prevData.filter((item) => item.id !== cartId));
      } else {
        alert("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateSubtotal = (item) => item.price * item.quantity;
  const orderTotal = pdata.reduce((sum, item) => sum + calculateSubtotal(item), 0);

  return (
    <div className="mt-48 mx-6 md:mx-12 lg:mx-24">
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg rounded-lg overflow-hidden">
          <thead className="text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Product Type</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Subtotal</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {pdata.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">
                  <img
                    src={`http://localhost:5000${item.imageUrl}`}
                    alt={item.productName}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-6">{item.productName}</td>
                <td className="py-4 px-6">Rs.{item.price}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-12 pb-4">
                    <div className="flex items-center bg-gray-600 my-3">
                      <button
                        onClick={() => handleDecrease(index, item.id)}
                        className="p-2 bg-gray-400 shadow hover:bg-gray-200 transition"
                      >
                        <Minus size={18} className="text-gray-600" />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-12 mx-2 text-center bg-transparent text-white text-lg font-semibold focus:outline-none"
                      />
                      <button
                        onClick={() => handleIncrease(index, item.id)}
                        className="p-2 bg-gray-400 shadow hover:bg-gray-200 transition"
                      >
                        <Plus size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">Rs.{calculateSubtotal(item)}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center my-10">
          <Link to="/products">
          <button className="bg-gray-700 p-4 text-white text-xs font-semibold">
            RETURN TO SHOP
          </button>
          </Link>
         
          
        </div>
      </div>

      <div className="flex mt-12 flex-col lg:flex-row gap-10">
        <div className="lg:w-2/4 rounded-lg">
          <img src={sideImage} alt="" className="rounded-lg" />
        </div>
        <div className="flex flex-col gap-2 lg:w-2/4 text-right pl-0 lg:pl-20">
          <h1 className="text-3xl font-bold text-gray-600">ORDER TOTAL</h1>
          <div className="flex justify-between items-center mt-10 border-b border-gray-400 pb-5">
            <span className="text-gray-700 font-semibold">Subtotal</span>
            <span className="text-gray-500">Rs.{orderTotal}</span>
          </div>
          <div className="flex justify-between items-center mt-10 border-b border-gray-400 pb-5">
            <span className="text-gray-700 font-semibold">Total</span>
            <span className="text-gray-800">Rs.{orderTotal}</span>
          </div>
          <span>
            <button className="text-right mt-10 bg-gray-700 px-9 py-3 text-white font-semibold text-sm">
              <Link to="/billing">NEXT</Link>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
