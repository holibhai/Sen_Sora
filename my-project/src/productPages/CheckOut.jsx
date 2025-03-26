import React from "react";
import image from "../assets/cake7.jpg";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import sideImage from "../assets/cake11.jpg";
import sofa from "../assets/cake8.jpg";
import { useNavigate,Link } from "react-router-dom";

const CheckOut = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useState()

  const data = [
    {
      productImage: image,
      productName: "Chair",
      offer:12,
      price: 1200,
      quantity: 1,
      subTotal: 1200,
    },
    {
      productImage: sideImage,
      productName: "Table",
      offer:"-",
      price: 400,
      quantity: 4,
      subTotal: 1600,
    },
    {
      productImage: sofa,
      productName: "Cupboard",
      offer:12,
      price: 200,
      quantity: 6,
      subTotal: 1200,
    },
  ];

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="mt-48 mx-6 md:mx-12 lg:mx-24">
      <div className="overflow-x-auto">
        <table className="w-full  shadow-lg rounded-lg overflow-hidden">
          <thead className=" text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">offer</th>
              
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {data.map((item, index) => (
              <tr key={index} className="border-b hover: transition">
                <td className="py-4 px-6 ">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-6">{item.productName}</td>
                <td className="py-4 px-6">{item.offer}%</td>

                <td className="py-4 px-6">${item.price}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-12  pb-4">
                    <div className="flex items-center -space-x-1  bg-gray-600  my-3">
                      <button
                        onClick={decreaseQuantity}
                        className="p-2  bg-gray-400 shadow hover:bg-gray-200 transition"
                      >
                        <Minus size={18} className="text-gray-600" />
                      </button>

                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-12 mx-2 text-center bg-transparent text-white  text-lg font-semibold focus:outline-none"
                      />

                      <button
                        onClick={increaseQuantity}
                        className="p-2 bg-gray-400 shadow hover:bg-gray-200 transition"
                      >
                        <Plus size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">${item.subTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center my-10">
            <button className="bg-gray-700 p-4 text-white text-xs font-semibold">RETURN TO SHOP</button>
            <button className="bg-gray-700 p-4 text-white text-xs font-semibold">UPDATE CART</button>
        </div>
      </div>
      <div className="flex  mt-12">
           <div className="w-2/4  rounded-lg">
            <img src={sideImage} alt="" className="rounded-lg" />
           </div>
           <div className="flex flex-col gap-2 w-2/4 text-right pl-20 ">
              <h1 className="text-3xl font-bold text-gray-600">ORDER TOTAL</h1>
              <div className="flex justify-between items-center mt-10 border-b border-gray-400 pb-5">
                  <span className="text-gray-700 font-semibold">SubTotal</span>
                  <span className="text-gray-500">Rs.123,000</span>
              </div>
              <div className="flex justify-between items-center mt-10 border-b border-gray-400 pb-5">
                  <span className="text-gray-700 font-semibold">Offer Discount</span>
                  <span className="text-green-800">-Rs.23,000</span>
              </div>
              <div className="flex justify-between items-center mt-10 border-b border-gray-400 pb-5">
                  <span className="text-gray-700 font-semibold">Total</span>
                  <span className="text-gray-800">Rs.100,000</span>
              </div>
              <span ><button className="text-right mt-10 bg-gray-700 px-9 py-3 text-white font-semibold text-sm"><Link to="/billing">NEXT</Link></button></span>
             
           </div>
      </div>
    </div>
  );
};

export default CheckOut;
