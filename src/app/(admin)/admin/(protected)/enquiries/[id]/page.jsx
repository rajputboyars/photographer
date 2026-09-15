import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { store } from "@/lib/store";
import { deleteLead, setLeadStatus } from "@/app/(admin)/admin/actions";
import { Avatar, Card, PageTitle, StatusPill, ghostBtn, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "replied", "booked", "closed"];

export default async function EnquiryPage({ params }) {
  const { id } = await params;
  const lead = await store.getLead(id);
  if (!lead) notFound();

  const rows = [
    ["Event", lead.eventType, "camera"],
    ["Date", lead.eventDate || "Not given", "calendar"],
    ["City or venue", lead.venue || "Not given", "pin"],
    ["Budget", lead.budget || "Not given", "list"],
  ];

  return (
    <>
      <Link href="/admin/enquiries" className="mb-6 inline-flex items-center gap-2 text-[13px] text-ink/55 hover:text-white">
        <Icon name="back" className="h-4 w-4" />
        All enquiries
      </Link>

      <div className="flex flex-wrap items-center gap-4 pb-7">
        <Avatar name={lead.name} className="h-14 w-14 text-[15px]" />
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[1.6rem] font-light tracking-tight">{lead.name}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill status={lead.status} />
            <span className="text-[13px] text-ink/45">
              Received {new Date(lead.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card className="p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {rows.map(([k, v, icon]) => (
                <div key={k} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04]">
                    <Icon name={icon} className="h-4 w-4 text-ink/60" />
                  </span>
                  <div>
                    <div className="text-[12px] uppercase tracking-[0.12em] text-ink/40">{k}</div>
                    <div className="pt-0.5 text-[15px]">{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {lead.notes ? (
            <Card className="p-6">
              <div className="text-[12px] uppercase tracking-[0.12em] text-ink/40">In their words</div>
              <p className="pt-2.5 text-[16px] leading-[1.75] text-ink/85">{lead.notes}</p>
            </Card>
          ) : null}
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3 p-6">
            <div className="text-[12px] uppercase tracking-[0.12em] text-ink/40">Reply</div>
            <a className={primaryBtn} href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: your enquiry")}`}>
              <Icon name="mail" className="h-4 w-4" />
              Email
            </a>
            <a
              className={ghostBtn}
              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="phone" className="h-4 w-4" />
              WhatsApp
            </a>
            <div className="flex flex-col gap-1 pt-1 text-[13px] text-ink/50">
              <span className="break-all">{lead.email}</span>
              <span>{lead.phone}</span>
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-6">
            <div className="text-[12px] uppercase tracking-[0.12em] text-ink/40">Move to</div>
            <div className="flex flex-wrap gap-2">
              {STATUSES.filter((s) => s !== lead.status).map((status) => (
                <form key={status} action={setLeadStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={status} />
                  <button
                    type="submit"
                    className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] capitalize text-ink/75 transition hover:border-white/40 hover:text-white"
                  >
                    {status}
                  </button>
                </form>
              ))}
            </div>
          </Card>

          <form action={deleteLead}>
            <input type="hidden" name="id" value={lead.id} />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/25 px-4 py-2.5 text-[14px] text-rose-200/90 transition hover:border-rose-400/60 hover:text-rose-100"
            >
              <Icon name="trash" className="h-4 w-4" />
              Delete enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
