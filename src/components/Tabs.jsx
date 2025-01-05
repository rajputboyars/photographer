import React from "react";

const Tabs = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap">
    {categories.map((category) => (
      <button
        key={category}
        className={`px-4 py-2 rounded-full text-nowrap ${
          activeCategory === category
            ? "underline text-blue-600"
            : " text-gray-700"
        }`}
        onClick={() => onCategoryChange(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default Tabs;
