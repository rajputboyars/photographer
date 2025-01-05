import React from "react";

const Thumbnail = ({ thumbnail, name }) => (
  <div
    className="w-full h-[50vh] md:h-screen bg-cover bg-center relative"
  >
    <div className=" absolute h-full w-full">
        <img
          src={thumbnail}
          alt="Card 1"
          className="h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" /> */}
      </div>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h1 className="text-white text-4xl font-bold">{name}</h1>
    </div>
  </div>
);

export default Thumbnail;
