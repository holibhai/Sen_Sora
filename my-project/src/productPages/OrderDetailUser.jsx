import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  PackageCheck,
  CalendarDays,
  Truck,
  User,
  MapPin,
  Phone,
  StickyNote,
  ShoppingCart,
  IndianRupee
} from 'lucide-react';

const OrderDetailUser = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const [orderRes, itemsRes, shippingRes] = await Promise.all([
          fetch(`http://localhost:5000/api/order/${orderId}`),
          fetch(`http://localhost:5000/api/orderItem/order/${orderId}`),
          fetch(`http://localhost:5000/api/delivery/getByOrderId/${orderId}`)
        ]);

        if (!orderRes.ok || !itemsRes.ok || !shippingRes.ok) {
          throw new Error('Failed to fetch some data');
        }

        const orderData = await orderRes.json();
        const itemsData = await itemsRes.json();
        const shippingData = await shippingRes.json();

        setOrder(orderData);
        setItems(itemsData);
        setShipping(shippingData);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div className="p-8 text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 pt-44 space-y-6 text-gray-700">
      <h2 className="text-3xl font-bold  mb-6 text-gray-500">
         Order ID - #{orderId}
      </h2>

      {/* Summary and Shipping Section Side by Side */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className=" rounded-xl shadow-xl p-6 space-y-3">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-orange-400" />  Order Summary
          </h3>
          <p className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-orange-400" /> Total Products: {order.totalProducts}
          </p>
          <p className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-orange-400" /> Status: {order.status}
          </p>
          <p className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-orange-400" /> Total: Rs.{order.total}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-orange-400" /> Date: {new Date(order.date).toLocaleString()}
          </p>
        </div>

        {/* Shipping Info */}
        {shipping && (
          <div className=" rounded-xl shadow-xl p-6 space-y-3">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Truck className="w-5 h-5 text-orange-400" /> Delivery Information
            </h3>
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-orange-400" /> {shipping.firstName} {shipping.lastName}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" /> {shipping.address1}, {shipping.address2}, {shipping.city}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" /> {shipping.mobileNumber}
            </p>
            <p className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-orange-400" /> Notes: {shipping.orderNotes || 'None'}
            </p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className=" rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" /> Ordered Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 border  rounded-lg  p-4 shadow-xl hover:shadow-md transition">
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.productName}
                className="w-28 h-28 object-cover rounded-lg border"
              />
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-gray-800">{item.productName}</h4>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600">Flavor: {item.flavor}</p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-gray-700">Price:</span> Rs.{item.productPrice}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Quantity:</span> {item.quantity}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Total:</span> Rs.{item.quantity * item.productPrice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailUser;
