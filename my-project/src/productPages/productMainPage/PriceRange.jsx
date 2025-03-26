import React from "react";
import { useState } from "react";

const PriceRange = () => {
  const [minValue, setMinValue] = useState(10); // Default Min Value
  const [maxValue, setMaxValue] = useState(8000); // Default Max Value
  const minLimit = 0;
  const maxLimit = 10000;
  return (
    <div className=" w-full max-w-lg mx-auto my-5 border-b ">
      {/* Static Min-Max Values */}
      <div className="flex justify-between text-gray-500 text-sm mb-2">
        <span>${minLimit}</span>
        <span>${maxLimit}</span>
      </div>

      {/* Range Inputs */}
      <div className="relative">
        {/* Min Money Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={(e) =>
            setMinValue(Math.min(Number(e.target.value), maxValue - 500))
          }
          className="absolute top-0 left-0 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />

        {/* Max Money Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={(e) =>
            setMaxValue(Math.max(Number(e.target.value), minValue + 500))
          }
          className="absolute top-0 left-0 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Display Selected Min-Max Values */}
      <div className="flex justify-between mt-5 text-gray-700 font-medium">
        <span>Min: ${minValue}</span>
        <span>Max: ${maxValue}</span>
      </div>
    </div>
  );
};

export default PriceRange;
