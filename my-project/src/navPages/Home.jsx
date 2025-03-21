import React from "react";

const Home = () => {
  return (
    <div
      className="relative w-full h-screen mt-44 rounded-3xl flex items-center justify-center bg-cover  "
      style={{ backgroundImage: "url('Indulge Your.jpg')" }}
    >
      <div className="absolute inset-0  bg-opacity-50"></div>
      
      <div className="relative text-center text-white z-10 p-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Exsora
        </h1>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
          Discover the best Cakes & Gifts for every occasion
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg text-lg font-semibold transition-all">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;
