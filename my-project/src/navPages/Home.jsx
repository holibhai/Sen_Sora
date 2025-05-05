import React from "react";

const Home = () => {
  return (
    <div
      className="relative w-full h-screen mt-20 rounded-3xl flex items-center justify-center bg-cover bg-center font-serif shadow-lg overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1606312619344-207d818de89d?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center text-white z-10 px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight">
          Welcome to <span className="text-pink-400">Exsora</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
          Discover the finest <span className="text-yellow-300 font-semibold">Cakes</span> &{" "}
          <span className="text-blue-300 font-semibold">Gifts</span> for every celebration.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl">
          🎁 Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;
