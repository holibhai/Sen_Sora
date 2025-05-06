import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const GridProduct = ({ category, sub, minValue = 0 }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filtering logic
  useEffect(() => {
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter((product) => product.type === category);
    }

    if (sub) {
      filtered = filtered.filter((product) => product.category === sub);
    }

    if (minValue !== undefined && minValue !== null) {
      filtered = filtered.filter((product) => product.price >= minValue);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, category, sub, minValue]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClick = (id) => {
    navigate(`/productDetail/${id}`);
  };

  const getPaginationNumbers = () => {
    const range = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return range;
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="pl-10 pr-10 w-full">
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No products found for this filter.
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="w-full h-full border border-gray-300 shadow-xl relative hover:shadow-2xl transition-shadow rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleClick(product.id)}
              >
                {/* Favorite Icon */}
                <span className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer z-10">
                  <Heart className="w-5 h-5" />
                </span>

                {/* Product Image */}
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-[200px] object-cover"
                />

                {/* Product Info */}
                <div className="flex justify-between items-center p-4">
                  <div>
                    <h1 className="text-gray-800 font-semibold">{product.name}</h1>
                    <div className="flex gap-3 items-baseline">
                      <p className="text-gray-400 line-through text-sm">
                        Rs.{(product.price * 1.2).toFixed(2)}
                      </p>
                      <p className="text-red-600 font-bold">Rs.{product.price}</p>
                    </div>
                    <div className="flex items-center justify-between my-2">
                    <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full mt-2 inline-block">
                      In stock
                    </span>
                    <div className="bg-gray-700 p-2 rounded-full">
                    <ShoppingCart className="text-white w-4 h-4" />
                  </div>
                    </div>
                    
                  </div>
                 
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {"<<"}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {"<"}
            </button>

            {getPaginationNumbers().map((num, index) => (
              <button
                key={index}
                onClick={() => typeof num === "number" && setCurrentPage(num)}
                className={`px-3 py-2 rounded ${
                  currentPage === num
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${num === "..." ? "cursor-default" : ""}`}
                disabled={num === "..."}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {">>"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GridProduct;
