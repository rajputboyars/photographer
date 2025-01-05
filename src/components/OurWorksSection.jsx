"use client"
import React, { useState } from "react";
import Tab from "./Tab";
import Card from "./Card";

const worksData = {
  All: [
    { id: 1, name: "Client A", thumbnail: "/images/home-section/card.jpg", slug: "clienta" },
    { id: 2, name: "Client B", thumbnail: "/images/home-section/card4.jpg", slug: "clientb" },
  ],
  Wedding: [{ id: 1, name: "Client A", thumbnail: "/images/home-section/card2.jpg", slug: "clienta" }],
  Birthday: [{ id: 2, name: "Client B", thumbnail: "/images/home-section/card3.jpg", slug: "clientb" }],
};

const OurWorksSection = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <section className="py-16 " id="our-works">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Works</h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worksData[activeTab].map((work) => (
            <Card key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorksSection;
