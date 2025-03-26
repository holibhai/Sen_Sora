import React, { useState } from "react";

const discountRanges = [
  { label: "Less than 10%", value: "lt10" },
  { label: "10% - 20%", value: "10to20" },
  { label: "20% - 30%", value: "20to30" },
  { label: "30% - 50%", value: "30to50" },
  { label: "More than 50%", value: "gt50" },
];

const OfferList = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleOfferChange = (event) => {
    setSelectedOffer(event.target.value);
  };

  return (
    <div className="w-64  p-4">
      <ul>
        {discountRanges.map((offer) => (
          <li key={offer.value} className="mb-2 py-2 border-b border-gray-300">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="discountOffer"
                value={offer.value}
                checked={selectedOffer === offer.value}
                onChange={handleOfferChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-400"
              />
              <span className="text-gray-600">{offer.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferList;
