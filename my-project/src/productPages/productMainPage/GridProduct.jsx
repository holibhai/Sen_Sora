import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12; // Show 4 products per row

const GridProduct = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate totalPages after products is initialized
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        console.log(products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Pagination function to show page numbers with ellipsis
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

  const handleClick = () => {
    navigate("/productDetail");
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
    <div className="pl-10 w-full ">
      {/* Grid container */}
      <div className="grid grid-cols-4 gap-6 w-full">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="w-full h-full border border-gray-300   relative  hover:shadow-xl transition-shadow"
            onClick={handleClick}
          >
            {/* Favorite Icon */}
            <span className="absolute top-3 right-3 text-gray-600 hover:text-red-500 cursor-pointer">
              <Heart className="w-5 h-5 text-white" />
            </span>

            {/* Product Image */}
            <img
              src={`http://localhost:5000${product.imageUrl}`}
              alt={product.name}
              className="w-full h-[200px] object-cover"
            />

            <div className="flex justify-between items-center p-4">
              <div>
                <h1 className="text-gray-600 font-semibold">{product.name}</h1>
                <div className="flex gap-3 items-baseline">
                  <p className="text-gray-400 line-through text-xs ">
                    {product.price}
                  </p>
                  <p className=" text-red-600">{product.price}</p>
                </div>
                <h1 className="text-gray-300 text-xs bg-slate-700 inline-block px-3 py-1 rounded-xl my-3">
                  In stock
                </h1>
              </div>
              <div
                className="bg-gray-700
 p-1 rounded-full"
              >
                <ShoppingCart className="text-white hover:cursor-pointer p-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
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
                : "bg-gray-300 hover:bg-gray-400"
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
          className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};
export default GridProduct;
