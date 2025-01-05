"use client"
import React, { useState } from "react";
import Thumbnail from "./Thumbnail";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";
import Card from "./Card";

const clientData = {
  thumbnail: "/images/home-section/card3.jpg",
  name: "Client A",
  categories: ["Portraits", "Videos", "Events"],
  cards: {
    Portraits: [
      { id: 1, thumbnail: "/images/home-section/card.jpg", title: "Portrait 1" },
      { id: 2, thumbnail: "/images/home-section/card2.jpg", title: "Portrait 2" },
    ],
    Videos: [{ id: 3, thumbnail: "/images/home-section/card.jpg", title: "Video 1" }],
    Events: [{ id: 4, thumbnail: "/images/home-section/card4.jpg", title: "Event 1" }],
  },
};

const ClientWorkPage = () => {
  const [activeCategory, setActiveCategory] = useState("Portraits");

  return (
    <div>
      <Thumbnail thumbnail={clientData.thumbnail} name={clientData.name} />
      <div className="container mx-auto py-12 px-4 flex">
        <Sidebar />
        <div className="flex-1">
          <Tabs
            categories={clientData.categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {clientData.cards[activeCategory].map((card) => (
              <Card key={card.id} work={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientWorkPage;
