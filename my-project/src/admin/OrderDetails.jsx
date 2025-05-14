import React, { useEffect, useState, useRef } from 'react';
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
  PackageOpen,
  Download,
  Printer
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const OrderDetails = () => {
  const { orderId } = useParams();
  const receiptRef = useRef();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

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

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/updateStatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setStatusMessage('Status updated successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      console.error('Error updating status:', error);
      setStatusMessage('Failed to update status');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const downloadReceipt = () => {
    const input = receiptRef.current;
    
    html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5'
      });
      
      const imgWidth = 148;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`Sensora_Receipt_${orderId}.pdf`);
    });
  };

  const printReceipt = () => {
    const input = receiptRef.current;
    html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const windowContent = '<!DOCTYPE html>';
      const html = '<html><head><title>Print Receipt</title></head><body>' +
        '<img src="' + imgData + '" style="width:100%;"/></body></html>';
      const printWin = window.open('', '', 'width=500,height=650');
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();
      printWin.focus();
      printWin.print();
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        <strong>Error: </strong> {error}
      </div>
    </div>
  );

  // Professional Receipt Component
  const Receipt = React.forwardRef(({ order, items, shipping }, ref) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div ref={ref} className="bg-white p-8 max-w-md mx-auto" style={{ width: '148mm', minHeight: '210mm' }}>
        {/* Receipt Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="bg-indigo-600 text-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Sensora</h1>
          <p className="text-sm text-gray-500">Colombo 12, Wellawatta</p>
          <p className="text-xs text-gray-500">sensora@gmail.com</p>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <h2 className="text-xl font-semibold text-gray-700 tracking-wider">PAYMENT RECEIPT</h2>
          <p className="text-xs text-gray-500 mt-1">#{order.id}</p>
        </div>

        {/* Receipt Details */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
              <p className="text-sm font-medium">{formattedDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <p className="text-sm font-medium capitalize">{order.status}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Customer</p>
            <p className="text-sm font-medium">{shipping.firstName} {shipping.lastName}</p>
            <p className="text-xs text-gray-600">{shipping.address1}, {shipping.city}</p>
            <p className="text-xs text-gray-600">Phone: {shipping.mobileNumber}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-2 mb-2">
            <span>Item</span>
            <span className="text-right">Amount</span>
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-gray-500">{item.quantity} × Rs.{item.productPrice}</p>
              </div>
              <p className="text-sm font-medium">Rs.{item.productPrice * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mb-8">
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-medium">Rs.{order.total}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm font-medium">Rs.0.00</span>
          </div>
          <div className="flex justify-between py-3 border-t border-gray-200 mt-2">
            <span className="text-base font-semibold">Total</span>
            <span className="text-base font-semibold">Rs.{order.total}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p className="mb-1">Thank you for shopping with Sensora</p>
          <p>This is an official payment receipt</p>
          <div className="flex justify-center mt-4">
            <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{orderId}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(order.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={downloadReceipt}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </button>
            <button
              onClick={printReceipt}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </button>
          </div>
        </div>

        {/* Hidden receipt for download/print */}
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <Receipt ref={receiptRef} order={order} items={items} shipping={shipping} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Card */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <User className="w-5 h-5 text-indigo-500 mr-2" />
                  Customer Information
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {shipping.firstName} {shipping.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {shipping.mobileNumber}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {shipping.address1}, {shipping.address2}, {shipping.city}
                    </p>
                  </div>
                  {shipping.orderNotes && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-500">Order Notes</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {shipping.orderNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <ShoppingCart className="w-5 h-5 text-indigo-500 mr-2" />
                  Order Items ({order.totalProducts})
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                        <img
                          src={`http://localhost:5000${item.imageUrl}`}
                          alt={item.productName}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.productName}
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            Rs.{item.productPrice * item.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category} • {item.flavor}</p>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          <span className="mx-1">•</span>
                          <span>Rs.{item.productPrice} each</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <PackageCheck className="w-5 h-5 text-indigo-500 mr-2" />
                  Order Summary
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Order Status</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{order.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Payment Method</span>
                    <span className="text-sm font-medium text-gray-900">Credit Card</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Shipping Method</span>
                    <span className="text-sm font-medium text-gray-900">Standard Delivery</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>Rs.{order.total}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Update Card */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <Truck className="w-5 h-5 text-indigo-500 mr-2" />
                  Update Status
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Order Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleStatusUpdate}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Status
                  </button>
                  {statusMessage && (
                    <p className={`text-sm text-center ${statusMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
                      {statusMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;