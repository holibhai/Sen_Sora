import React, { useState } from "react";

const locations = [
  {
    id: "loc1",
    name: "Downtown Branch",
    address: "123 Main Street, Downtown, City 45678",
    mapsUrl: "https://www.google.com/maps?q=123+Main+Street,+Downtown,+City+45678",
  },
  {
    id: "loc2",
    name: "Westside Hub",
    address: "456 West Avenue, Westside, City 78901",
    mapsUrl: "https://www.google.com/maps?q=456+West+Avenue,+Westside,+City+78901",
  },
  {
    id: "loc3",
    name: "Uptown Store",
    address: "789 Uptown Road, Uptown, City 23456",
    mapsUrl: "https://www.google.com/maps?q=789+Uptown+Road,+Uptown,+City+23456",
  }
   
];

const PickUp = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-gray-700 font-bold text-xl">PICK UP DETAILS</h1>
      <h2 className="mt-3 text-gray-500 text-sm">Select a Pick-Up Location</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => handleLocationSelect(location)}
            className={`p-6  flex flex-col justify-between items-center rounded-2xl border-2 cursor-pointer transition-all duration-300 w-full relative
              ${selectedLocation?.id === location.id ? "border-blue-500  shadow-md" : "border-gray-400 "}
              hover:border-blue-500 :shadow-lg`}
          >
            <h3 className="text-gray-800 font-medium text-lg">{location.name}</h3>
            <p className="text-sm text-gray-500 opacity-100">{location.address}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents card selection on button click
                window.open(location.mapsUrl, "_blank");
              }}
              className="bg-gray-700 text-white px-4  rounded-md mt-2 hover:bg-blue-600 transition-all text-xs p-3"
            >
              View on Maps
            </button>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="mt-6 p-4 border border-gray-400  rounded-lg">
          <h3 className="text-gray-700 font-semibold">Selected Location:</h3>
          <p className="text-gray-600 mt-1">{selectedLocation.name}</p>
          <p className="text-gray-500">{selectedLocation.address}</p>
        </div>
      )}
      <div className='flex flex-col mt-5 gap-3'>
                            <label htmlFor="mobileNumber" className='text-gray-500'>Pick Up Date</label>
                            <input type="date" className='bg-transparent border border-gray-400  py-3 px-3 text-gray-500' />
                        </div>
                         <div className="flex flex-col gap-3 mt-5">
                            <label htmlFor="mobileNumber" className='text-gray-500'>Order Notes(Optional)</label>
                            <textarea name="" id="" className="bg-transparent border border-gray-400 p-3 " placeholder="Notes about your order... "></textarea>
                         </div>
      </div>
     
  );
};

export default PickUp;
