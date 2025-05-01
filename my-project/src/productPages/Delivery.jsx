import React, { useEffect, useState } from "react";

const Delivery = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
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

  const handleCheckShippingCost = () => {
    if (!selectedCity) {
      setError("Please select a city.");
      setShippingCost(null);
      return;
    }

    const foundCity = cities.find((cityObj) => cityObj.city === selectedCity);
    if (foundCity) {
      setShippingCost(foundCity.cost);
      setError("");
    } else {
      setShippingCost(null);
      setError("Shipping cost not found for the selected city.");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <h1 className="text-gray-700 font-bold text-xl">SHIPPING DETAILS</h1>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 w-full mr-2">
              <label htmlFor="firstName" className="text-gray-500">
                First Name
              </label>
              <input
                type="text"
                className="bg-transparent border border-gray-400 py-3 px-5"
              />
            </div>
            <div className="flex flex-col gap-2 w-full ml-2">
              <label htmlFor="lastName" className="text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                className="bg-transparent border border-gray-400 py-3 px-5"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 w-full mr-2">
              <label htmlFor="city" className="text-gray-500">
                City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border border-gray-400 py-3 px-5"
              >
                <option value="">-- Select City --</option>
                {cities.map((cityObj) => (
                  <option key={cityObj.city} value={cityObj.city}>
                    {cityObj.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 w-full ml-2">
              <label htmlFor="phone" className="text-gray-500">
                Recipient Phone
              </label>
              <input
                type="tel"
                className="bg-transparent border border-gray-400 py-3 px-5"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-gray-500">
              Street Address
            </label>
            <input
              type="text"
              placeholder="House number and street name"
              className="bg-transparent border border-gray-400 py-3 px-10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address2" className="text-gray-500">
              Street Address 2 (optional)
            </label>
            <input
              type="text"
              placeholder="Apartment, suite, unit etc..."
              className="bg-transparent border border-gray-400 py-3 px-10"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="notes" className="text-gray-500">
              Order Notes (Optional)
            </label>
            <textarea
              className="bg-transparent border border-gray-400 p-3"
              placeholder="Notes about your order..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-gray-500">Checking Shipping Cost</label>
            <button
              className="bg-gray-600 py-3 text-white font-semibold"
              onClick={handleCheckShippingCost}
            >
              CHECK SHIPPING COST
            </button>

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
