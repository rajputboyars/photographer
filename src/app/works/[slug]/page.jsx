// app/work/[slug]/page.js

import React from "react";
import ClientWorkPage from "@/components/ClientWorkPage";
import DATA from "../../../data.js";
// import clientsData from "@/data";

DATA
const WorkDetailPage = ({ params }) => {
  const { slug } = params;

  // Find the client data based on the slug
  const clientData = DATA.find((client) => client.slug === slug);

  if (!clientData) {
    return <div className="text-center py-12">Client not found!</div>;
  }

  return <ClientWorkPage clientData={clientData} />;
};

export default WorkDetailPage;
