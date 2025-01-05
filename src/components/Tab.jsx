import React from "react";

const Tab = ({ label, isActive, onClick }) => (
  <button
    className={`px-6 py-2 rounded-full ${
      isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Tab;
