import React from "react";
import cake1 from "../../assets/cake1.jpg";
import cake2 from "../../assets/cake2.jpg";
import cake3 from "../../assets/cake3.jpg";
import cake4 from "../../assets/cake4.jpg";

// Sample Product List
const latestProducts = [
  { id: 1, name: "Armado Cake", image: cake1 },
  { id: 2, name: "Elegant Orange cake", image: cake2 },
  { id: 3, name: "Miror Cake", image: cake3 }, // Reusing the same image
  { id: 4, name: "winto sero", image: cake4 },
  // Reusing the same image
];

const LatestProducts = () => {
  return (
    <div className="px-4 space-y-4">
      {latestProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center  gap-4 border-b border-gray-300 pb-2"
        >
          <div className="w-[80px] h-[80px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-[80px] h-[80px] object-cover rounded-md"
            />
          </div>
          <h1 className="text-gray-600 text-sm">{product.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default LatestProducts;
