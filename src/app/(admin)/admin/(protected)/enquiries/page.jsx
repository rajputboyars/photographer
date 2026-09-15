import Link from "next/link";
import { store } from "@/lib/store";
import { Card, PageTitle } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

const STATUS = {
  new: "border-sky-300/40 text-sky-200",
  replied: "border-amber-300/40 text-amber-200",
  booked: "border-emerald-300/40 text-emerald-200",
  closed: "border-white/20 text-ink/50",
};

export default async function EnquiriesPage() {
  const leads = await store.listLeads();

  return (
    <>
      <PageTitle title="Enquiries" subtitle={`${leads.length} in total, newest first.`} />

      <Card className="divide-y divide-white/10">
        {leads.map((lead) => (
          <Link key={lead.id} href={`/admin/enquiries/${lead.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 transition hover:bg-white/5">
            <div className="min-w-[180px] flex-1">
              <div className="text-[15px]">{lead.name}</div>
              <div className="text-[13px] text-ink/50">{lead.email}</div>
            </div>
            <span className="text-sm text-ink/70">{lead.eventType}</span>
            <span className="text-sm text-ink/50">{lead.eventDate || "—"}</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs ${STATUS[lead.status] ?? STATUS.closed}`}>
              {lead.status}
            </span>
            <span className="text-[13px] text-ink/40">{new Date(lead.createdAt).toLocaleDateString("en-GB")}</span>
          </Link>
        ))}
        {leads.length === 0 ? <p className="px-5 py-10 text-sm text-ink/50">Nothing yet. Enquiries from the contact form land here.</p> : null}
      </Card>
    </>
  );
}
