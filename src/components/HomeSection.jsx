"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

const HomeSection = () => {
  useEffect(() => {
    // GSAP animation for cards
    gsap.from(".card", {
      y: 100, // Start from 100px below
      opacity: 0, // Start invisible
      stagger: 1, // Delay between each card's animation
      duration: 1, // Duration for each card animation
      ease: "power3.out", // Smooth easing
    });
  }, []);

  return (
    <section className="relative w-full h-[50vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Centered Text */}
      <div className="absolute z-10 text-center">
        <h1 className="text-lg md:text-4xl font-bold text-white md:mb-4">Isha Photography</h1>
        <p className="text-sm md:text-lg text-white">Making Your Special Moments Unforgettable</p>
      </div>
      <div className=" absolute h-full w-full">
        <img
          src="/images/home-section/home1.jpg"
          alt="Card 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
      </div>
      {/* Full-Screen Overlapping Cards with Images */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="card absolute h-full w-full">
          <img
            src="/images/home-section/home1.jpg"
            alt="Card 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" />


        </div>
        <div className="card absolute h-full w-full">
          <img
            src="/images/home-section/home2.jpg"
            alt="Card 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
        </div>
        <div className="card absolute h-full w-full">
          <img
            src="/images/home-section/home3.jpg"
            alt="Card 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
        </div>
        <div className="card absolute h-full w-full">
          <img
            src="/images/home-section/home4.jpg"
            alt="Card 4"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
