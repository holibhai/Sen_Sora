import React from "react";
import { Bell } from "lucide-react";

const TrackHeader = () => {
  return (
    <header className="fixed w-full top-0 left-0 z-40 bg-gray-800 shadow-md px-4 md:px-6 py-4 flex justify-between items-center">
      
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Track Order
        </h1>
      </div>

      {/* Right: Notification and Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Notification with count */}
        <div className="relative">
          <Bell
            className="text-white hover:text-yellow-500 cursor-pointer"
            size={22}
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            2
          </span>
        </div>

        {/* Profile Avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover shadow-md"
        />
      </div>
    </header>
  );
};

export default TrackHeader;
