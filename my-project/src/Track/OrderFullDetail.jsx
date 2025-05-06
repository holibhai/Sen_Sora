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

const OrderFullDetail = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');

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
        setStatus(orderData.status);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleDeliveryStatusUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/delivery/updateStatus/${shipping.shippingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderStatus: shipping.orderStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update delivery status');
      }

      setDeliveryMessage('Delivery status updated successfully!');
    } catch (error) {
      console.error('Error updating delivery status:', error);
      setDeliveryMessage('Failed to update delivery status');
    }
  };

  const handleOrderStatusChange = (e) => {
    setShipping(prev => ({ ...prev, orderStatus: e.target.value }));
  };

  if (loading) return <div className="p-8 text-center text-lg font-semibold">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold  mb-6 text-indigo-600">
        Order Details - #{orderId}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className=" rounded-xl shadow p-6 space-y-3">
          <h3 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
            <PackageCheck className="w-5 h-5" /> Order Summary
          </h3>
          <p className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-gray-600" /> Total Products: {order.totalProducts}
          </p>
          <p className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-gray-600" /> Status: {order.status}
          </p>
          <p className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-gray-600" /> Total: Rs.{order.total}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gray-600" /> Date: {new Date(order.date).toLocaleString()}
          </p>
        </div>

        {/* Shipping Info */}
        {shipping && (
          <div className=" rounded-xl shadow p-6 space-y-3">
            <h3 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Delivery Information
            </h3>
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" /> {shipping.firstName} {shipping.lastName}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-600" /> {shipping.address1}, {shipping.address2}, {shipping.city}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-600" /> {shipping.mobileNumber}
            </p>
            <p className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-gray-600" /> Notes: {shipping.orderNotes || 'None'}
            </p>
            <p className="flex items-center gap-2 text-orange-600">
              <StickyNote className="w-4 h-4 text-gray-600" /> ShippingId: #{shipping.shippingId}
            </p>

            {/* Dropdown for orderStatus */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Update Delivery Status:</label>
              <select
                value={shipping.orderStatus}
                onChange={handleOrderStatusChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Not Accepted">Not Accepted</option>
                <option value="Accepted">Accepted</option>
              </select>
              <button
                onClick={handleDeliveryStatusUpdate}
                className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
              >
                Update Delivery Status
              </button>
              {deliveryMessage && (
                <p className="mt-2 text-sm text-green-600 font-medium">{deliveryMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className=" rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" /> Ordered Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition">
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

export default OrderFullDetail;
