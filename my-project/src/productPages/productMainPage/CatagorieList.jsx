import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const categories = [
  {
    name: "Living",
    subcategories: ["Sofas", "Coffee Tables", "TV Units", "Shelving"],
    image: "/images/living-room.jpg",
  },
  {
    name: "Dining",
    subcategories: ["Dining Sets", "Tables", "Chairs", "Cabinets"],
    image: "/images/dining-room.jpg",
  },
  {
    name: "Bedroom",
    subcategories: ["Beds", "Wardrobes", "Dressers", "Nightstands"],
    image: "/images/bedroom.jpg",
  },
  {
    name: "Kitchen",
    subcategories: ["Cabinets", "Shelving", "Islands", "Carts"],
    image: "/images/kitchen.jpg",
  },
  {
    name: "Study & Office",
    subcategories: ["Desks", "Chairs", "Bookshelves", "Storage"],
    image: "/images/study-office.jpg",
  },
];

const CategorySidebar = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="w-64   px-4  border-t border-gray-300">
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2 border-b border-gray-300">
            <button
              onClick={() => toggleCategory(index)}
              className="w-full flex justify-between items-center p-2 text-left text-gray-600 hover:bg-gray-300 rounded-md"
            > 
              {category.name}
              {openCategory === index ? (
                <FaChevronDown className="text-gray-500" />
              ) : (
                <FaChevronRight className="text-gray-500" />
              )}
            </button>
            {/* Subcategories - Collapsible */}
            {openCategory === index && (
              <ul className="mt-2 ml-4 border-l-2 border-gray-400 pl-3">
                {category.subcategories.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="p-1  text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
