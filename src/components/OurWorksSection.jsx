"use client";
import React, { useState } from "react";
import Tab from "./Tab";
import Card from "./Card";
import data from "../data.js"; // Importing the JSON file

const OurWorksSection = () => {
  // Generate worksData dynamically from the imported JSON
  const worksData = data.reduce(
    (acc, item) => {
      // Add to "All" tab
      acc.All.push(item);

      // Add to specific type tab
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);

      return acc;
    },
    { All: [] } // Initial object with "All" tab
  );

  const [activeTab, setActiveTab] = useState("All");

  return (
    <section className=" py-4 md:py-16 px-8" id="our-works">
      <div className="container mx-auto">
        <h2 className="text-lg md:text-4xl font-bold text-center mb-4 md:mb-12">Our Works</h2>

        {/* Tabs */}
        <div className="flex md:justify-center space-x-4 mb-8 overflow-auto">
          {Object.keys(worksData).map((tab) => (
            <Tab
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {/* Cards */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worksData[activeTab].map((work) => (
            <Card key={work.id} work={work}  />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorksSection;
