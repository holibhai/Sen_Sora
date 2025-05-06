// import React, { useState, useEffect } from "react";
// import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// import axios from "axios";

// const CategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const [hoveredCategory, setHoveredCategory] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/categories/getAll")
//       .then((res) => {
//         setCategories(res.data); // This will update later
       
//       })
//       .catch((err) => console.error("Fetch error:", e2 gtrr));
//   }, []);

//   return (
//     <div className="w-64 px-4 border-t border-gray-300">
//       <ul>
//         {categories.map((category, index) => (
//           <li
//             key={index}
//             className="mb-2 border-b border-gray-300 relative"
//             onMouseEnter={() => setHoveredCategory(index)}
//             onMouseLeave={() => setHoveredCategory(null)}
//           >
//             <div className="w-full flex justify-between items-center p-2 text-left text-gray-600 hover:bg-gray-300 rounded-md cursor-pointer">
//               {category.name}
//               {hoveredCategory === index ? (
//                 <FaChevronDown className="text-gray-500" />
//               ) : (
//                 <FaChevronRight className="text-gray-500" />
//               )}
//             </div>
//             {hoveredCategory === index && (
//               <ul className="absolute left-full top-0 mt-0 ml-2 bg-white border border-gray-300 shadow-lg rounded-md p-2 z-10">
//                 {category.subcategories.map((sub, subIndex) => (
//                   <li
//                     key={subIndex}
//                     className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
//                   >
//                     {sub}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryList;

import React from 'react'

const CategoryList = () => {
  return (
    <div>CategoryList</div>
  )
}

export default CategoryList
