import { notFound } from "next/navigation";
import ClientWorkPage from "@/components/ClientWorkPage";
import DATA from "@/data.js";

export function generateStaticParams() {
  return DATA.map((client) => ({ slug: client.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const client = DATA.find((c) => c.slug === slug);
  if (!client) return { title: "Gallery not found" };

  return {
    title: client.name,
    description: `${client.type} photography and film — ${client.name}.`,
  };
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const clientData = DATA.find((client) => client.slug === slug);

  if (!clientData) notFound();

  return <ClientWorkPage clientData={clientData} />;
}
