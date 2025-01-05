"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  useEffect(() => {
    gsap.from(".about-text", {
      x: -100, // Text slides in from the left
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-section",
        toggleActions: "play reverse play reverse", // Repeats animation on entering and leaving
        start: "top 80%", // Trigger when the section enters 80% of the viewport
      },
    });

    gsap.from(".about-image", {
      x: -100, // Image slides in from the right
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-section",
        toggleActions: "play reverse play reverse", // Repeats animation on entering and leaving
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      className="md:about-section w-full py-4 md:py-16 flex flex-col items-center justify-center"
      id="about"
    >
      {/* Heading */}
      <h2 className="text-lg md:text-4xl font-bold text-gray-800 md:mb-12 text-center">
        About Me
      </h2>

      {/* Content */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row gap-10 items-center justify-between px-4 md:px-16">
        {/* Text */}
        <div className="about-text text-gray-700 md:flex-1 text-sm md:text-lg text-justify md:text-left leading-relaxed">
          <p>
            Hi, I’m Chandra Shekar , a passionate photographer with a knack for capturing
            life’s beautiful moments. With years of experience in portrait,
            landscape, and event photography, I believe every photograph tells
            a story. Let me help you preserve your cherished memories with
            timeless images.
          </p>
          <p className="mt-4">
            Whether you need a professional photoshoot, wedding photography, or
            event coverage, I’m here to bring your vision to life through my
            lens.
          </p>
        </div>

        {/* Image */}
        <div className="about-image md:flex-1 mt-8 md:mt-0 h-[50vh] md:h-[400px]">
          <img
            src="/images/home-section/about.jpg"
            alt="Photographer"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
