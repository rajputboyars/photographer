import Link from "next/link";
import { notFound } from "next/navigation";
import { store } from "@/lib/store";
import { deleteLead, setLeadStatus } from "@/app/(admin)/admin/actions";
import { Card, PageTitle, ghostBtn, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "replied", "booked", "closed"];

export default async function EnquiryPage({ params }) {
  const { id } = await params;
  const lead = await store.getLead(id);
  if (!lead) notFound();

  const rows = [
    ["Event", lead.eventType],
    ["Date", lead.eventDate || "—"],
    ["City or venue", lead.venue || "—"],
    ["Budget", lead.budget || "—"],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Received", new Date(lead.createdAt).toLocaleString("en-GB")],
  ];

  return (
    <>
      <PageTitle
        title={lead.name}
        subtitle={`Status: ${lead.status}`}
        action={
          <Link href="/admin/enquiries" className={ghostBtn}>
            Back to enquiries
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[13px] text-ink/50">{k}</dt>
                <dd className="pt-0.5 text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>

          {lead.notes ? (
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="text-[13px] text-ink/50">Notes</div>
              <p className="pt-1.5 text-[15px] leading-relaxed text-ink/85">{lead.notes}</p>
            </div>
          ) : null}
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3 p-6">
            <div className="text-[13px] text-ink/50">Move to</div>
            <div className="flex flex-wrap gap-2">
              {STATUSES.filter((s) => s !== lead.status).map((status) => (
                <form key={status} action={setLeadStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={status} />
                  <button type="submit" className={ghostBtn}>
                    {status}
                  </button>
                </form>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col gap-3 p-6">
            <div className="text-[13px] text-ink/50">Reply</div>
            <a className={primaryBtn + " text-center"} href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: your enquiry")}`}>
              Email {lead.name.split(" ")[0]}
            </a>
            <a className={ghostBtn + " text-center"} href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Card>

          <form action={deleteLead}>
            <input type="hidden" name="id" value={lead.id} />
            <button type="submit" className="w-full rounded-xl border border-rose-400/30 px-4 py-2.5 text-[14px] text-rose-200 transition hover:border-rose-400/60">
              Delete enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
