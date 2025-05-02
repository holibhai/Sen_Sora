import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/__-removebg-preview.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([
    {
      name: "Cakes",
      subcategories: [],
    },
    {
      name: "Gifts",
      subcategories: [],
    },
  ]);
  let closeTimeout;

  const handleRoute = () => {
    navigate("/products");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        const cakeSubs = data.filter(cat => cat.type?.toLowerCase() === "cake").map(cat => cat.category);
        const giftSubs = data.filter(cat => cat.type?.toLowerCase() === "gift").map(cat => cat.category);

        setCategories([
          {
            name: "Cakes",
            subcategories: cakeSubs,
          },
          {
            name: "Gifts",
            subcategories: giftSubs,
          },
        ]);
      } catch (error) {
        console.log("error in fetching", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col relative">
        <nav className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6 md:px-12 h-16 md:h-20 border-b border-gray-100">
            <div className="flex items-center gap-1 cursor-pointer">
              <img src={Logo} alt="" className="w-[70px] h-[70px]" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Sen-Sora
              </h1>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>

            <button className="hidden md:block bg-pink-600 text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 text-sm font-medium transition-all hover:shadow-lg">
              <Link to="/login">Sign in</Link>
            </button>
          </div>

          {/* Categories Navbar */}
          <div className="relative">
            <nav className="p-3">
              <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-center gap-36">
                <div className="flex justify-center items-center space-x-6">
                  <div className="flex space-x-6">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="relative group"
                        onClick={handleRoute}
                        onMouseEnter={() => {
                          clearTimeout(closeTimeout);
                          setHoveredCategory(index);
                        }}
                        onMouseLeave={() => {
                          closeTimeout = setTimeout(() => setHoveredCategory(null), 300);
                        }}
                      >
                        <button className="px-4 py-2 text-neutral-700 font-semibold rounded-lg hover:text-indigo-500">
                          {category.name}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-neutral-700 font-semibold rounded-lg hover:text-indigo-500 cursor-pointer">
                    <h1><Link to="/">Home</Link></h1>
                  </div>
                  <div className="px-4 py-2 text-neutral-700 font-semibold rounded-lg hover:text-indigo-500 cursor-pointer">
                    <h1><Link to="/contact">Contact</Link></h1>
                  </div>
                  <div className="px-4 py-2 text-neutral-700 font-semibold rounded-lg hover:text-indigo-500 cursor-pointer">
                    <h1><Link to="/about">About</Link></h1>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-1/4">
                  <input
                    type="text"
                    placeholder="Search for items..."
                    className="w-full p-3 pl-4 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none text-sm"
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-5">
                  <FaHeart className="text-gray-700 text-xl cursor-pointer hover:text-red-500" />
                  <Link to="/trackuser">
                  <FaUser className="text-gray-700 text-xl cursor-pointer hover:text-blue-500" />
                  </Link>
                  <Link to="/checkout">
                  <FaShoppingCart className="text-gray-700 text-xl cursor-pointer hover:text-green-500" />
                  </Link>
                </div>
              </div>
            </nav>

            {/* Dropdown Subcategories */}
            {hoveredCategory !== null && (
              <div
                className="absolute h-[300px] px-12 left-0 w-screen border-t flex transition-opacity duration-200"
                onMouseEnter={() => {
                  clearTimeout(closeTimeout);
                  setHoveredCategory(hoveredCategory);
                }}
                onMouseLeave={() => {
                  closeTimeout = setTimeout(() => setHoveredCategory(null), 300);
                }}
              >
                <div className="mx-auto w-full rounded-2xl bg-cover" style={{ backgroundImage: "url('Delicious.jpg')" }}>
                  <div className="w-1/2">
                    <ul className="text-gray-700 space-y-2">
                      {categories[hoveredCategory]?.subcategories.map((sub, i) => (
                        <li key={i} className="px-4 py-2 text-white cursor-pointer">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
