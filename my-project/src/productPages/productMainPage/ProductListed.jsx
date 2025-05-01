import React from "react";
import PriceRange from "./PriceRange";
import CategoryList from "./CategoryList";
import OfferList from "./OfferList";
import LatestProducts from "./LatestProducts";
import { Grid3x3 } from 'lucide-react';
import { List } from 'lucide-react';
import { useState } from 'react'
import ListProduct from "./ListProduct";
import GridProduct from "./GridProduct";

const ProductListed = () => {

  const [displayType,setDisplayedType]=useState(true);

  const handleDisplayType = () =>{
           setDisplayedType(!displayType);
      
  }
  return (
    <div className="mt-48 mx-16">
      
      <div className="flex  gap-5 ">
        <div className="flex flex-col w-1/6 gap-4 border border-gray-300  ">
          <div>
            <h1 className="text-gray-500 font-semibold text-lg">PRICE RANGE</h1>
            <div>
              <PriceRange />
            </div>
          </div>
          <div>
            <h1 className="text-gray-500 font-semibold text-lg py-4">CATAGORIES</h1>
            <div>
                <CategoryList />
            </div>
          </div>
          <div>
            <h1 className="text-gray-500 font-semibold text-lg py-4">OFFERS</h1>
            <div>
                <OfferList />
            </div>
          </div>
          <div>
            <h1 className="text-gray-500 font-semibold text-lg py-4">LATEST PRODUCTS</h1>
            <div>
                <LatestProducts/>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-3/4 gap-3 border-l border-gray-300 px-3">
            <div className="flex items-center gap-3 border-b border-gray-300 py-3 border-l ">
               <Grid3x3 className="text-gray-500 cursor-pointer" onClick={handleDisplayType}/>
               <List  className="text-gray-500 cursor-pointer" onClick={handleDisplayType}/>
            </div>
             {displayType? <div>
                  <div className="">
                      <GridProduct/>
                  </div>
                </div>:
                <div>
                  <div className="">
                     <ListProduct/>
                  </div>
                </div>
            }
        
        </div>
        
      </div>
    </div>
  );
};

export default ProductListed;
