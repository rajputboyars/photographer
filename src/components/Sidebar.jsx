import React from "react";

const Sidebar = () => (
  <div className="flex flex-col items-center space-y-4 mr-12">
    <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
      Download
    </button>
    <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
      Share
    </button>
    <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
      Slideshow
    </button>
  </div>
);

export default Sidebar;
