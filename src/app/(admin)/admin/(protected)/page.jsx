import Link from "next/link";
import { store } from "@/lib/store";
import { Card, PageTitle } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

const STATUS_LABEL = { new: "New", replied: "Replied", booked: "Booked", closed: "Closed" };

export default async function AdminHome() {
  const [leads, galleries, posts] = await Promise.all([store.listLeads(), store.listGalleries(), store.listPosts()]);
  const newLeads = leads.filter((l) => l.status === "new");

  const stats = [
    { label: "New enquiries", value: newLeads.length, href: "/admin/enquiries" },
    { label: "Enquiries in total", value: leads.length, href: "/admin/enquiries" },
    { label: "Galleries", value: galleries.length, href: "/admin/galleries" },
    { label: "Journal posts", value: posts.length, href: "/admin/journal" },
  ];

  return (
    <>
      <PageTitle title="Overview" subtitle="What has come in and what is published." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="p-5 transition hover:border-white/25">
              <div className="text-3xl font-light">{s.value}</div>
              <div className="pt-1 text-[13px] text-ink/60">{s.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="pb-4 pt-10 text-lg font-normal">Latest enquiries</h2>
      <Card className="divide-y divide-white/10">
        {leads.slice(0, 5).map((lead) => (
          <Link key={lead.id} href={`/admin/enquiries/${lead.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 transition hover:bg-white/5">
            <span className="min-w-[160px] flex-1 text-[15px]">{lead.name}</span>
            <span className="text-sm text-ink/60">{lead.eventType}</span>
            <span className="text-sm text-ink/45">{lead.eventDate || "—"}</span>
            <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs text-ink/70">
              {STATUS_LABEL[lead.status] ?? lead.status}
            </span>
          </Link>
        ))}
        {leads.length === 0 ? <p className="px-5 py-8 text-sm text-ink/50">No enquiries yet.</p> : null}
      </Card>
    </>
  );
}
