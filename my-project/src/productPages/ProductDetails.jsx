import React, { useEffect, useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import image from "../assets/cake10.jpg"; // fallback/related image

const ProductDetail = ({count,setCount}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    if (id) fetchProductById();
  }, [id]);

  if (!product) {
    return (
      <div className="mt-48 text-center text-gray-600 font-semibold">
        Loading product details...
      </div>
    );
  }

  const isInStock = product.stock > 0;


  const handleAddToCart = async (productId,quantity, price) => {
    if(product.quantity>=quantity){

    

    const userId = localStorage.getItem("userId");
    setCount((count)=>count+1);
    console.log(count);
   
 
  
    if (!userId) {
      alert("User not logged in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          
          productId,
          userId,
          quantity,
          price
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Item added to cart!");
        navigate("/checkout")
        console.log("Cart item ID:", data.id);
      } else {
        alert(data.message || "Failed to add item to cart.");
      }
  
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding item to cart.");
    }
  }else{
    alert("In Sufficient Product Count")
  }
  };
  

  return (
    <div className="mt-48">
      <div className="mx-10 md:mx-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="w-full flex flex-col gap-5">
            <img
              src={`http://localhost:5000${product.imageUrl}`}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = image;
              }}
            />
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Heart className="text-neutral-600 w-4" />
                  <span className="text-neutral-600 text-xs font-bold">
                    ADD TO FAVOURITE
                  </span>
                </div>
                <span className="text-sm text-neutral-600 font-semibold">
                  Please login to add items to wishlist
                </span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl font-bold text-gray-700">{product.name}</h1>
            <p className="text-gray-500 text-lg">
              Rs {product.price.toLocaleString()}
            </p>

            {/* Type and Category */}
            <div className="flex gap-10">
              <p className="text-gray-600 text-md">
                <span className="font-semibold text-gray-700">Type:</span>{" "}
                {product.type || "N/A"}
              </p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold text-gray-700">Category:</span>{" "}
                {product.category || "N/A"}
              </p>
            </div>

            {/* Stock Status */}
            <p>
              Availability:
              <span className={`ml-2 font-medium ${isInStock ? "text-pink-500" : "text-red-500"}`}>
                {isInStock ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            {/* Quantity & Cart */}
            <div className="flex items-center gap-6 border-b border-gray-300 pb-4">
              <div className="flex items-center bg-gray-200 rounded">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 hover:bg-gray-300 rounded-l"
                  disabled={!isInStock}
                >
                  <Minus size={18} className="text-gray-700" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center bg-transparent text-gray-700 text-lg font-semibold"
                />
                <button
                  onClick={increaseQuantity}
                  className="p-2 hover:bg-gray-300 rounded-r"
                  disabled={!isInStock}
                >
                  <Plus size={18} className="text-gray-700" />
                </button>
              </div>

              
                <button
                  disabled={!isInStock}
                  onClick={()=>handleAddToCart(product.id,quantity,product.price)}
                  className={`px-6 py-2 text-sm font-bold rounded ${
                    isInStock
                      ? "bg-gray-700 hover:bg-gray-800 text-white"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                >
                  ADD TO CART
                </button>
              
            </div>

            {/* Description Section */}
            <div className="mt-4">
              <h2 className="text-xl font-bold text-gray-700 mb-1">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Item */}
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-gray-700 border-b border-gray-300 pb-4">
            Related Items
          </h1>
          <div className="w-72 mt-10 shadow-md hover:shadow-lg transition rounded-lg overflow-hidden">
            <img src={image} className="w-full h-48 object-cover" alt="Related Item" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Aspen Wardrobe</h3>
              <p className="text-gray-500">Rs 1234</p>
              <button className="mt-4 w-full bg-gray-700 text-white py-2 hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
