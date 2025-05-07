import React, { useEffect, useState } from "react";
import cake1 from "../assets/cake6.jpg"
import cake2 from "../assets/cake2.jpg"
import cake3 from "../assets/cake4.jpg"
import { HandHelping } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";



const backgroundImages = [
  cake1,
  cake2,
  cake3,
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClick=()=>{
    navigate("/products");
  }

  return (
    <div className="mt-32 w-full px-6 md:px-16 py-10 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="flex-1 text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-800">
            Celebrate Every Moment with <br />
            <span className="text-pink-500">Delicious Cakes</span> &{" "}
            <span className="text-blue-500">Heartfelt Gifts</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-lg">
            From birthdays to weddings, Exsora has everything you need to make your loved ones feel truly special.
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300" onClick={handleClick}>
            🎁 Start Shopping
          </button>
        </div>

        {/* Right Carousel Section */}
        <div className="flex-1 relative h-[350px] md:h-[400px] w-full max-w-lg overflow-hidden rounded-3xl shadow-lg">
          <img
            src={backgroundImages[currentImage]}
            alt="Exsora Slide"
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out rounded-3xl"
          />
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {backgroundImages.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === currentImage ? "bg-white" : "bg-white/50"
                } transition-all duration-300`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
