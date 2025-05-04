// src/layouts/TrackLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TrackHeader from "./TrackHeader";
import TrackSideBar from "./TrackSideBar";
 
const TrackLayout = ({countt,setCountt}) => {
  const [count,setCount]=useState(0);
  return (
    <div className="flex h-screen">
      <TrackSideBar />
      <div className="flex flex-col flex-1">
        <TrackHeader  />
        <div className="p-4  overflow-y-auto  h-full  pt-24">
           
          <Outlet count={count} setCount={setCount} />
        </div>
      </div>
    </div>
  );
};

export default TrackLayout;
