import React, { useState, useEffect } from "react";

const PriceRange = ({minValue,setMinValue}) => {
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(10000);

  const [maxValue, setMaxValue] = useState(10000);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);

        // Find min and max product prices
        const prices = data.map((product) => product.price);
        const realMin = Math.min(...prices);
        const realMax = Math.max(...prices);

        setMinLimit(realMin);
        setMaxLimit(realMax);
        setMinValue(realMin);
        setMaxValue(realMax);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-6 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center py-6 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full max-w-lg mx-auto my-5 border-b pb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Price</h2>

      {/* Min & Max Labels */}
      <div className="flex justify-between text-gray-500 text-sm mb-2">
        <span>${minLimit}</span>
        <span>${maxLimit}</span>
      </div>

      {/* Range Inputs */}
      <div className="relative h-8">
        {/* Min Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minValue}
          onChange={(e) =>
            setMinValue(Math.min(Number(e.target.value), maxValue - 1))
          }
          className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none pointer-events-auto z-20"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxValue}
          onChange={(e) =>
            setMaxValue(Math.max(Number(e.target.value), minValue + 1))
          }
          className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none pointer-events-auto z-10"
        />
      </div>

      {/* Display Selected Range */}
      <div className="flex justify-between mt-4 text-gray-700 font-medium">
        <span>Min: ${minValue}</span>
        <span>Max: ${maxValue}</span>
      </div>
    </div>
  );
};

export default PriceRange;
