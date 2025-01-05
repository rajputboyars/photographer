"use client"
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`w-full text-white fixed top-0 z-50 bg-black ${isMenuOpen ? "bg-opacity-90" : "bg-opacity-60"}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold">
          MyPortfolio
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
          <a href="#our-works" className="hover:text-gray-400">
            Portfolio
          </a>
          <a href="#contact" className="hover:text-gray-400">
            Contact
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={handleMenuToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Links */}
      {isMenuOpen && (
        <div className="md:hidden h-screen bg-black bg-opacity-90">
          <a
            href="#home"
            className="block px-4 py-2 "
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-4 py-2 "
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#portfolio"
            className="block px-4 py-2 "
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 "
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
