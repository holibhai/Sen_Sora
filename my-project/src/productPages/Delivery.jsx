import React, { useEffect, useState } from "react";

const Delivery = ({ onShippingCostChange, onCityChange, formData, setFormData }) => {
  const [cities, setCities] = useState([]);
  const [shippingCost, setShippingCost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/deliveryCost/getAll");
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError("Failed to load cities.");
    }
  };

  const handleCheckShippingCost = (selectedCity) => {
    if (!selectedCity) {
      setError("Please select a city.");
      setShippingCost(null);
      return;
    }

    const foundCity = cities.find((cityObj) => cityObj.city === selectedCity);
    if (foundCity) {
      setShippingCost(foundCity.cost);
      onShippingCostChange(foundCity.cost);
      onCityChange(selectedCity);
      setError("");

      // Update formData with selected city
      setFormData((prev) => ({
        ...prev,
        city: selectedCity,
      }));
    } else {
      setShippingCost(null);
      setError("Shipping cost not found for the selected city.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    handleChange(e); // Update formData
    handleCheckShippingCost(selectedCity); // Auto update cost + parent
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-gray-700 font-bold text-xl">SHIPPING DETAILS</h1>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 w-full mr-2">
              <label htmlFor="firstName" className="text-gray-500">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 py-3 px-5"
              />
            </div>
            <div className="flex flex-col gap-2 w-full ml-2">
              <label htmlFor="lastName" className="text-gray-500">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 py-3 px-5"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 w-full mr-2">
              <label htmlFor="city" className="text-gray-500">City</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleCityChange}
                className="bg-transparent border border-gray-400 py-3 px-5 text-gray-500"
              >
                <option value="">Select City</option>
                {cities.map((cityObj) => (
                  <option key={cityObj.city} value={cityObj.city}>
                    {cityObj.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 w-full ml-2">
              <label htmlFor="mobileNumber" className="text-gray-500">Recipient Phone</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="bg-transparent border border-gray-400 py-3 px-5"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address1" className="text-gray-500">Street Address</label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="House number and street name"
              className="bg-transparent border border-gray-400 py-3 px-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address2" className="text-gray-500">Street Address 2 (optional)</label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Apartment, suite, unit etc..."
              className="bg-transparent border border-gray-400 py-3 px-10"
            />
          </div>

          {/* ✅ DELIVERY DATE FIELD */}
          <div className="flex flex-col gap-2">
            <label htmlFor="deliveryDate" className="text-gray-500">Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="bg-transparent border border-gray-400 py-3 px-10 text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="orderNotes" className="text-gray-500">Order Notes (Optional)</label>
            <textarea
              name="orderNotes"
              value={formData.orderNotes}
              onChange={handleChange}
              className="bg-transparent border border-gray-400 p-3"
              placeholder="Notes about your order..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            
            {error && (
              <p className="text-red-500 font-medium text-sm">{error}</p>
            )}

            {shippingCost !== null && (
              <div className="flex justify-between items-center border-b border-gray-400 pb-5 mt-3">
                <span className="text-gray-700 font-semibold">Shipping Cost</span>
                <span className="text-gray-800">Rs.{shippingCost}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
