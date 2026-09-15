import { notFound } from "next/navigation";
import ClientWorkPage from "@/components/ClientWorkPage";
import { store } from "@/lib/store";

// Galleries come from the store so anything added in the admin appears here.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const client = await store.getGallery(slug);
  if (!client) return { title: "Gallery not found" };

  return {
    title: client.name,
    description: `${client.type} photography and film — ${client.name}.`,
  };
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const clientData = await store.getGallery(slug);

  if (!clientData) notFound();

  return <ClientWorkPage clientData={clientData} />;
}
