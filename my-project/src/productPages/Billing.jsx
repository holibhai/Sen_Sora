import React, { useState } from 'react';
import PickUp from './PickUp';
import Delivery from './Delivery';
import image from "../assets/Yellow and White Modern Furniture Instagram Post.jpg";
import botImage from "../assets/Black and White Minimalist Simplify Vibes Twitter Header.jpg"
import { Link } from 'react-router-dom';


const Billing = () => {
    const [deliveryType, setDeliveryType] = useState("PickUp");

   

    const handleChangeDelivery = (event) => {
        setDeliveryType(event.target.value);
    };

   

    return (
        <div className='mt-48 mx-48'>
            <div className='grid grid-cols-1 md:grid-cols-2 border-b border-gray-400 pb-5'>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-2xl font-semibold text-gray-700'>BILLING DETAILS</h1>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col gap-2 '>
                                <label htmlFor="firstName" className='text-gray-500'>First Name</label>
                                <input type="text" className='bg-transparent border border-gray-400 py-3 px-10' />
                            </div>
                            <div className='flex flex-col gap-2 '>
                                <label htmlFor="lastName" className='text-gray-500'>Last Name</label>
                                <input type="text" className='bg-transparent border border-gray-400 py-3 px-10' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='text-gray-500'>Email</label>
                            <input type="email" className='bg-transparent border border-gray-400 py-3 px-10' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="mobileNumber" className='text-gray-500'>Mobile Number</label>
                            <input type="text" className='bg-transparent border border-gray-400 py-3 px-10' />
                        </div>
                    </div>
                    <div className='my-10 relative'>
                        <img src={image} alt="" className=' w-full object-cover' />
                        <button className='absolute top-24 pt-2 left-24 font-semibold text-white'><Link to="/offerProduct">Shop now</Link></button>
                    </div>
                </div>

                <div className='flex flex-col pl-20 '>
                    <h1 className='text-2xl font-semibold text-gray-700'>DELIVERY TYPE</h1>
                    <div className='flex justify-between items-center my-5 border-b border-gray-400 pb-5'>
                        <div>
                            <input
                                type="radio"
                                name="deliveryType"
                                value="PickUp"
                                checked={deliveryType === "PickUp"}
                                onChange={handleChangeDelivery}
                                className='mr-2'
                            />
                            <label className='text-gray-500'>Pick Up</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="deliveryType"
                                value="Delivery"
                                checked={deliveryType === "Delivery"}
                                onChange={handleChangeDelivery}
                                className='mr-2'
                            />
                            <label className='text-gray-500'>Delivery</label>
                        </div>
                    </div>
                    {deliveryType === "PickUp" ? <PickUp /> : <Delivery />}
                </div>
            </div>
            <div className='w-full  '>
                <div className=''>
                    <h1 className='text-2xl font-semibold text-gray-700 my-10'>YOUR ORDER</h1>
                    <table className='w-full'>
                        <thead>
                            <tr className='text-left text-gray-500'>
                                <th >Product</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-500 '>
                            <tr className='border-b border-gray-300'>
                                <td className='py-5'>Aspen Wardrobe x 1</td>
                                <td>12000</td>
                             </tr>
                             <tr className='border-b border-gray-300'>
                                <td className='py-5'>Fildo Chair x 2</td>
                                <td>34000</td>
                             </tr>
                             <tr className='border-b border-gray-300'>
                                <td className='py-5'>Orange Wardrobe x 4</td>
                                <td>89000</td>
                             </tr>
                             <tr className='border-b border-gray-300'>
                                <td className='py-5'>Subtotal</td>
                                <td>900000</td>
                             </tr>
                             <tr className='border-b border-gray-300'>
                                <td className='py-5'>Shipping</td>
                                <td>Delivery</td>
                             </tr>
                             <tr className='border-b border-gray-300'>
                                <td className='py-5'>jaffna</td>
                                <td>7000</td>
                             </tr>
                             <tr className='border-b border-gray-300'>
                                <td className='py-5'>Total</td>
                                <td>120000</td>
                             </tr>
                        </tbody>
                    </table>
                    <button className='bg-gray-700 text-white py-3 px-10 my-8'>PLACE ORDER</button>
                </div>
            </div>
            <div className='my-16'>
                 <img src={botImage} alt="bottom Image" className='rounded-2xl' />
            </div>
            <div>
          
            </div>
        </div>
    );
};

export default Billing;
