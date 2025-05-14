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
  IndianRupee,
  ChevronLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderDetailUser = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const [orderRes, itemsRes, shippingRes] = await Promise.all([
          fetch(`http://localhost:5000/api/order/${orderId}`),
          fetch(`http://localhost:5000/api/orderItem/order/${orderId}`),
          fetch(`http://localhost:5000/api/delivery/getByOrderId/${orderId}`)
        ]);

        if (!orderRes.ok) throw new Error('Failed to fetch order details');
        if (!itemsRes.ok) throw new Error('Failed to fetch order items');
        if (!shippingRes.ok) throw new Error('Failed to fetch shipping info');

        const [orderData, itemsData, shippingData] = await Promise.all([
          orderRes.json(),
          itemsRes.json(),
          shippingRes.json()
        ]);

        setOrder(orderData);
        setItems(itemsData);
        setShipping(shippingData);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 text-indigo-600 animate-spin" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Loading order details</h3>
          <p className="mt-1 text-gray-600">Please wait while we retrieve your order information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Error loading order</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-44 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            <ChevronLeft className="mr-1 h-5 w-5" /> Back to orders
          </button>
        </div>

        <div className=" shadow overflow-hidden sm:rounded-lg">
          {/* Order Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Order #{orderId}
              </h3>
              <div className="mt-2 sm:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Placed on {formatDate(order.date)}
            </p>
          </div>

          {/* Order Summary */}
          <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <PackageCheck className="mr-2 h-5 w-5 text-indigo-500" />
                  Order summary
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Total products</p>
                      <p className="text-gray-600">{order.totalProducts}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total amount</p>
                      <p className="text-gray-600">Rs.{order.total}</p>
                    </div>
                  </div>
                </dd>
              </div>

              {/* Shipping Information */}
              {shipping && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-indigo-500" />
                    Delivery information
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium">Recipient</p>
                        <p className="text-gray-600">{shipping.firstName} {shipping.lastName}</p>
                      </div>
                      <div>
                        <p className="font-medium">Shipping address</p>
                        <p className="text-gray-600">
                          {shipping.address1}, {shipping.address2 && `${shipping.address2}, `}
                          {shipping.city}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Contact</p>
                        <p className="text-gray-600">{shipping.mobileNumber}</p>
                      </div>
                      {shipping.orderNotes && (
                        <div>
                          <p className="font-medium">Delivery notes</p>
                          <p className="text-gray-600">{shipping.orderNotes}</p>
                        </div>
                      )}
                    </div>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Order Items */}
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-indigo-500" />
              Ordered items
            </h3>
            
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.productName}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        {item.flavor && (
                          <p className="mt-1 text-xs text-gray-500">Flavor: {item.flavor}</p>
                        )}
                      </div>
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        Rs.{(item.productPrice * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>Qty: {item.quantity}</span>
                      <span className="mx-1">•</span>
                      <span>Rs.{item.productPrice} each</span>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>Rs.{order.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailUser;