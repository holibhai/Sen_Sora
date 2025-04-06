import React from "react";
import image from "../assets/cake10.jpg";
import { Heart } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate=useNavigate()

  const productData = [
    {
      id: 1,
      name: "Product 1",
      price: 150,
      image: "https://via.placeholder.com/150",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim vel erat tincidunt dignissim vitae vel ex. Sed lobortis, purus non ultrices pulvinar, metus urna tristique neque, vel aliquet neque arcu sed massa. Sed non enim vel velit fermentum gravida non vel est.",
    },
    {
      id: 2,
      name: "Product 2",
      price: 230,
      image: "https://via.placeholder.com/150",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim vel erat tincidunt dignissim vitae vel ex. Sed lobortis, purus non ultrices pulvinar, metus urna tristique neque, vel aliquet neque arcu sed massa. Sed non enim vel velit fermentum gravida non vel est.",
    },
    {
      id: 3,
      name: "Product 3",
      price: 900,
      image: "https://via.placeholder.com/150",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim vel erat tincidunt dignissim vitae vel ex. Sed lobortis, purus non ultrices pulvinar, metus urna tristique neque, vel aliquet neque arcu sed massa. Sed non enim vel velit fermentum gravida non vel est.",
    },
  ];

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="mt-48">
      <div className="mx-36">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-[400px] mx-28 flex flex-col gap-5">
            <img src={image} alt="Product Image" />
            <div className="flex justify-between items-center ">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span>
                    <Heart className="text-neutral-600 w-[15px]" />
                  </span>
                  <span className="text-neutral-600 text-xs font-bold">
                    ADD TO FAVAURITE
                  </span>
                </div>
                <span className="text-sm text-neutral-600 font-semibold">
                  Please login to add items to wishlist
                </span>
              </div>
              {/* <div>
                    <span className="text-neutral-600 font-semibold">Share</span>
                  </div> */}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-bold text-gray-700">
                Aspen Wardrobe
              </h1>
              <p className="text-gray-500">Rs 225,000.00 - Rs 340,000.00</p>
              <h1 className="font-semibold">Rs 225,000.00</h1>
              <p>
                Availability: <span className="text-pink-500"> In Stock</span>
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <h1 className="font-bold text-gray-700 text-xl">Dimentions</h1>
                {/* <h1>Width: 2 Door - 44 inches, 3 Door - 66 inches, Custom</h1>
                <h1>Height: 78 inches</h1>
                <h1>Depth: 24 inches</h1> */}
              </div>
              <div className="flex items-center gap-12 border-b border-gray-400 pb-4">
                <div className="flex items-center -space-x-1  bg-gray-600  my-3">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2  bg-gray-400 shadow hover:bg-gray-200 transition"
                  >
                    <Minus size={18} className="text-gray-600" />
                  </button>

                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 mx-2 text-center bg-transparent text-white  text-lg font-semibold focus:outline-none"
                  />

                  <button
                    onClick={increaseQuantity}
                    className="p-2 bg-gray-400 shadow hover:bg-gray-200 transition"
                  >
                    <Plus size={18} className="text-gray-600" />
                  </button>
                </div>
                <div>
                  <button className="bg-gray-600 p-2  text-white text-xs font-bold">
                   <Link to="/checkout">ADD TO CART</Link> 
                  </button>
                </div>
              </div>

              <div>
                <h1 className="font-bold text-gray-700 text-xl">
                  Warranty Information
                </h1>
                <p className="mt-5 text-gray-700">
                  All locally manufactured solid wood products will have a
                  warranty of 5 years against poor quality of timber and
                  manufacturing defects. All locally manufactured PVC and fabric
                  sofa sets will have a warranty for 5 years on the timbre
                  frame. All furniture manufactured in melamine, plywood,
                  veneer, MDF or any other material will have a warranty of 1
                  year against manufacturing defects other than solid wood.{" "}
                </p>
              </div>

              <p className="text-gray-500 mt-3">
                Bright and elegant, the Aspen wardrobe is a brilliantly crafted
                furniture piece which brightens up any space it is positioned
                in. Its spacious element along with the excellent design makes
                it the ideal choice for your bedroom space.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold text-gray-700 border-b border-gray-400 pb-6">
            Related Items
          </h1>
          <div className=" shadow-lg   w-72 hover:shadow-xl transition duration-300 mt-10">
            <img src={image} className="w-full h-48 object-cover " />
            <div className="mt-4 px-4">
              <h3 className="text-lg font-semibold">Aspen Wardrobe</h3>
              <p className="text-gray-500">$1234</p>
            </div>
            <button className="mt-4 w-full  bg-gray-600 text-white py-2 hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
