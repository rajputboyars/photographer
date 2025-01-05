import React from "react";

const Tab = ({ label, isActive, onClick }) => (
  <button
    className={`px-2 md:px-6 py-2 max-md:text-sm ${
      isActive ? "text-blue-600 underline" : " text-gray-700"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Tab;
