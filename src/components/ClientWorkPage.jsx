"use client";

import React, { useState } from "react";
import Thumbnail from "./Thumbnail";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";
import Card from "./Card";

const ClientWorkPage = ({ clientData }) => {
  const [activeCategory, setActiveCategory] = useState(clientData.categories[0]);

  return (
    <div>
      <Thumbnail thumbnail={clientData.thumbnail} name={clientData.name} />
      <div className="flex flex-col-reverse md:flex-row justify-between pt-2">
        <Tabs
          categories={clientData.categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <Sidebar />
      </div>
      <div className="container mx-auto pb-12  px-4 flex">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {clientData.cards[activeCategory].map((card) => (
              <Card key={card.id} work={card} inside={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientWorkPage;
