import React from "react";

const Tabs = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex space-x-4">
    {categories.map((category) => (
      <button
        key={category}
        className={`px-6 py-2 rounded-full ${
          activeCategory === category
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => onCategoryChange(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default Tabs;
