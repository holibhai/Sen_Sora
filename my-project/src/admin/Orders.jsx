import React, { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Download,
  Printer,
  Calendar,
  FileText,
  BarChart2,
} from "lucide-react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const getStatusBadge = (status) => {
  switch (status) {
    case "Processing":
      return (
        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <CheckCircle size={14} /> Processing
        </span>
      );
    case "Pending":
      return (
        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <Clock size={14} /> Pending
        </span>
      );
    case "Shipped":
      return (
        <span className="bg-red-100 text-green-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <XCircle size={14} /> Shipped
        </span>
      );
    case "Delivered":
      return (
        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs flex items-center gap-1">
          <XCircle size={14} /> Delivered
        </span>
      );
    default:
      return null;
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/order/");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/order/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the order");
      }

      alert("Order deleted successfully");
      // Refresh orders after deletion
      const updatedOrders = orders.filter((order) => order.orderId !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting order: " + error.message);
    }
  };

  const generateReport = () => {
    let filteredData = [...orders];

    // Apply date range filter if dates are selected
    if (dateRange.start && dateRange.end) {
      filteredData = filteredData.filter((order) => {
        const orderDate = new Date(order.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    switch (reportType) {
      case "weekly":
        generateWeeklyReport(filteredData);
        break;
      case "monthly":
        generateMonthlyReport(filteredData);
        break;
      case "status":
        generateStatusReport(filteredData);
        break;
      default:
        break;
    }
  };

  const generateWeeklyReport = (data) => {
    const weeklyData = {};
    
    data.forEach((order) => {
      const date = new Date(order.date);
      const weekNumber = getWeekNumber(date);
      const weekKey = `Week ${weekNumber} (${date.getFullYear()})`;
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = {
          totalOrders: 0,
          totalRevenue: 0,
          statusCount: {
            Processing: 0,
            Pending: 0,
            Shipped: 0,
            Delivered: 0,
          },
        };
      }
      
      weeklyData[weekKey].totalOrders += 1;
      weeklyData[weekKey].totalRevenue += parseFloat(order.total);
      weeklyData[weekKey].statusCount[order.status] += 1;
    });
    
    setReportData({
      type: "Weekly",
      data: weeklyData,
      summary: {
        totalOrders: data.length,
        totalRevenue: data.reduce((sum, order) => sum + parseFloat(order.total), 0),
      },
    });
  };

  const generateMonthlyReport = (data) => {
    const monthlyData = {};
    
    data.forEach((order) => {
      const date = new Date(order.date);
      const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          totalOrders: 0,
          totalRevenue: 0,
          statusCount: {
            Processing: 0,
            Pending: 0,
            Shipped: 0,
            Delivered: 0,
          },
        };
      }
      
      monthlyData[monthKey].totalOrders += 1;
      monthlyData[monthKey].totalRevenue += parseFloat(order.total);
      monthlyData[monthKey].statusCount[order.status] += 1;
    });
    
    setReportData({
      type: "Monthly",
      data: monthlyData,
      summary: {
        totalOrders: data.length,
        totalRevenue: data.reduce((sum, order) => sum + parseFloat(order.total), 0),
      },
    });
  };

  const generateStatusReport = (data) => {
    const statusData = {
      Processing: 0,
      Pending: 0,
      Shipped: 0,
      Delivered: 0,
    };
    
    let totalRevenue = 0;
    
    data.forEach((order) => {
      statusData[order.status] += 1;
      totalRevenue += parseFloat(order.total);
    });
    
    setReportData({
      type: "Status",
      data: statusData,
      summary: {
        totalOrders: data.length,
        totalRevenue: totalRevenue,
      },
    });
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const exportToExcel = () => {
    if (!reportData) return;

    let worksheetData = [];
    
    if (reportData.type === "Weekly" || reportData.type === "Monthly") {
      worksheetData = Object.entries(reportData.data).map(([period, data]) => ({
        Period: period,
        "Total Orders": data.totalOrders,
        "Total Revenue": data.totalRevenue,
        "Processing": data.statusCount.Processing,
        "Pending": data.statusCount.Pending,
        "Shipped": data.statusCount.Shipped,
        "Delivered": data.statusCount.Delivered,
      }));
    } else {
      worksheetData = Object.entries(reportData.data).map(([status, count]) => ({
        Status: status,
        Count: count,
      }));
    }

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, `${reportData.type}_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  const printReport = () => {
    const input = document.getElementById("report-to-print");
    if (!input) return;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${reportData.type}_Report_${new Date().toISOString().slice(0,10)}.pdf`);
    });
  };

  const closeReport = () => {
    setReportData(null);
    setReportType(null);
    setDateRange({ start: "", end: "" });
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Orders</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Report Generation Controls */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart2 size={20} /> Generate Reports
        </h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setReportType("weekly")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              reportType === "weekly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Calendar size={16} /> Weekly Report
          </button>
          <button
            onClick={() => setReportType("monthly")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              reportType === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Calendar size={16} /> Monthly Report
          </button>
          <button
            onClick={() => setReportType("status")}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              reportType === "status"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <FileText size={16} /> Status Report
          </button>
        </div>

        {reportType && (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={generateReport}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Display */}
      {reportData && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {reportData.type} Report{" "}
              {dateRange.start && dateRange.end && (
                <span className="text-sm font-normal text-gray-600">
                  ({new Date(dateRange.start).toLocaleDateString()} -{" "}
                  {new Date(dateRange.end).toLocaleDateString()})
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2 text-sm"
              >
                <Download size={16} /> Excel
              </button>
              <button
                onClick={printReport}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2 text-sm"
              >
                <Printer size={16} /> PDF
              </button>
              <button
                onClick={closeReport}
                className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition flex items-center gap-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>

          <div id="report-to-print" className="p-4 bg-white">
            <h3 className="text-lg font-medium mb-2">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">
                  {reportData.summary.totalOrders}
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  Rs.{reportData.summary.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-2">Details</h3>
            {reportData.type === "Weekly" || reportData.type === "Monthly" ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border">Period</th>
                      <th className="py-2 px-4 border">Total Orders</th>
                      <th className="py-2 px-4 border">Total Revenue</th>
                      <th className="py-2 px-4 border">Processing</th>
                      <th className="py-2 px-4 border">Pending</th>
                      <th className="py-2 px-4 border">Shipped</th>
                      <th className="py-2 px-4 border">Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(reportData.data).map(
                      ([period, data], index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-50" : ""}
                        >
                          <td className="py-2 px-4 border">{period}</td>
                          <td className="py-2 px-4 border text-center">
                            {data.totalOrders}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            Rs.{data.totalRevenue.toFixed(2)}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {data.statusCount.Processing}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {data.statusCount.Pending}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {data.statusCount.Shipped}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {data.statusCount.Delivered}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(reportData.data).map(([status, count]) => (
                  <div
                    key={status}
                    className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm text-gray-600">{status}</p>
                      <p className="text-xl font-bold">{count}</p>
                    </div>
                    <div>{getStatusBadge(status)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 font-medium">{order.orderId}</td>
                <td className="px-6 py-4">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 font-semibold">${order.total}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <Link to={`/admin/orderdetails/${order.orderId}`}>
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <Eye size={18} />
                    </button>
                  </Link>

                  <button className="text-yellow-500 hover:text-yellow-600 transition">
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => handleDelete(order.orderId)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;