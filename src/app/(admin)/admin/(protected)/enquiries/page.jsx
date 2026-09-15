import Link from "next/link";
import Icon from "@/components/Icon";
import { store } from "@/lib/store";
import { Avatar, Card, EmptyState, PageTitle, StatusPill } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

const FILTERS = ["all", "new", "replied", "booked", "closed"];

export default async function EnquiriesPage({ searchParams }) {
  const { status = "all" } = await searchParams;
  const leads = await store.listLeads();
  const shown = status === "all" ? leads : leads.filter((l) => l.status === status);
  const countOf = (s) => (s === "all" ? leads.length : leads.filter((l) => l.status === s).length);

  return (
    <>
      <PageTitle title="Enquiries" subtitle={`${leads.length} in total, newest first.`} />

      <div className="flex flex-wrap gap-2 pb-5">
        {FILTERS.map((f) => {
          const active = f === status;
          return (
            <Link
              key={f}
              href={f === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${f}`}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] capitalize transition ${
                active ? "border-white/70 bg-white/90 text-ground" : "border-white/15 text-ink/70 hover:border-white/35"
              }`}
            >
              {f}
              <span className={active ? "text-ground/60" : "text-ink/40"}>{countOf(f)}</span>
            </Link>
          );
        })}
      </div>

      <Card className="divide-y divide-white/[0.07]">
        {shown.map((lead) => (
          <Link
            key={lead.id}
            href={`/admin/enquiries/${lead.id}`}
            className="group flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 transition hover:bg-white/[0.04]"
          >
            <Avatar name={lead.name} />
            <div className="min-w-[180px] flex-1">
              <div className="text-[15px]">{lead.name}</div>
              <div className="text-[13px] text-ink/45">{lead.email}</div>
            </div>
            <div className="hidden min-w-[150px] flex-col sm:flex">
              <span className="text-[14px] text-ink/75">{lead.eventType}</span>
              <span className="text-[13px] text-ink/40">{lead.eventDate || "No date given"}</span>
            </div>
            <StatusPill status={lead.status} />
            <span className="w-[74px] text-right text-[13px] text-ink/35">
              {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
            </span>
            <Icon name="chevron" className="h-4 w-4 -rotate-90 text-ink/25 transition group-hover:text-ink/60" />
          </Link>
        ))}

        {shown.length === 0 ? (
          <EmptyState title={status === "all" ? "No enquiries yet" : `Nothing ${status}`}>
            {status === "all"
              ? "Anything sent through the contact form lands here."
              : "Try another filter — the counts above show where everything sits."}
          </EmptyState>
        ) : null}
      </Card>
    </>
  );
}
