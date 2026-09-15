import Link from "next/link";
import Icon from "@/components/Icon";
import { store } from "@/lib/store";
import { Avatar, Card, EmptyState, PageTitle, StatusPill, ghostBtn, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

const PIPELINE = [
  { status: "new", tone: "bg-sky-400" },
  { status: "replied", tone: "bg-amber-400" },
  { status: "booked", tone: "bg-emerald-400" },
  { status: "closed", tone: "bg-white/25" },
];

export default async function AdminHome() {
  const [leads, galleries, posts] = await Promise.all([store.listLeads(), store.listGalleries(), store.listPosts()]);

  const count = (status) => leads.filter((l) => l.status === status).length;
  const published = posts.filter((p) => p.status === "published").length;

  const tiles = [
    { label: "New enquiries", value: count("new"), icon: "inbox", href: "/admin/enquiries", accent: "from-sky-400/25" },
    { label: "Booked", value: count("booked"), icon: "check", href: "/admin/enquiries", accent: "from-emerald-400/25" },
    { label: "Galleries", value: galleries.length, icon: "images", href: "/admin/galleries", accent: "from-indigo-400/25" },
    { label: "Posts published", value: published, icon: "pen", href: "/admin/journal", accent: "from-pink-400/25" },
  ];

  return (
    <>
      <PageTitle
        title="Overview"
        subtitle="What has come in, and what is live."
        action={
          <Link href="/admin/enquiries" className={primaryBtn}>
            <Icon name="inbox" className="h-4 w-4" />
            Open the inbox
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.label} href={tile.href}>
            <Card className={`relative overflow-hidden p-5 transition hover:border-white/25`}>
              <div className={`pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${tile.accent} to-transparent blur-2xl`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="text-[2rem] font-light leading-none">{tile.value}</div>
                  <div className="pt-2 text-[13px] text-ink/55">{tile.label}</div>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05]">
                  <Icon name={tile.icon} className="h-[18px] w-[18px] text-ink/70" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {leads.length ? (
        <Card className="mt-4 p-5">
          <div className="flex items-baseline justify-between pb-3">
            <span className="text-[13px] text-ink/55">Pipeline</span>
            <span className="text-[13px] text-ink/40">{leads.length} enquiries</span>
          </div>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
            {PIPELINE.map((seg) => {
              const n = count(seg.status);
              if (!n) return null;
              return <div key={seg.status} className={seg.tone} style={{ width: `${(n / leads.length) * 100}%` }} />;
            })}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3.5">
            {PIPELINE.map((seg) => (
              <span key={seg.status} className="flex items-center gap-2 text-[13px] text-ink/60">
                <span className={`h-2 w-2 rounded-full ${seg.tone}`} />
                {seg.status} <span className="text-ink/40">{count(seg.status)}</span>
              </span>
            ))}
          </div>
        </Card>
      ) : null}

      <div className="flex items-baseline justify-between pb-4 pt-10">
        <h2 className="text-lg font-normal">Latest enquiries</h2>
        <Link href="/admin/enquiries" className="text-[13px] text-accent hover:text-white">
          See all
        </Link>
      </div>

      <Card className="divide-y divide-white/[0.07]">
        {leads.slice(0, 5).map((lead) => (
          <Link
            key={lead.id}
            href={`/admin/enquiries/${lead.id}`}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 transition hover:bg-white/[0.04]"
          >
            <Avatar name={lead.name} />
            <div className="min-w-[140px] flex-1">
              <div className="text-[15px]">{lead.name}</div>
              <div className="text-[13px] text-ink/45">
                {lead.eventType}
                {lead.eventDate ? ` · ${lead.eventDate}` : ""}
              </div>
            </div>
            <StatusPill status={lead.status} />
          </Link>
        ))}
        {leads.length === 0 ? (
          <EmptyState title="No enquiries yet">
            Anything sent through the contact form lands here, newest first.
          </EmptyState>
        ) : null}
      </Card>

      <div className="grid gap-4 pt-10 sm:grid-cols-3">
        <Link href="/admin/journal" className={ghostBtn}>
          <Icon name="plus" className="h-4 w-4" />
          Write a post
        </Link>
        <Link href="/admin/galleries" className={ghostBtn}>
          <Icon name="plus" className="h-4 w-4" />
          Add a gallery
        </Link>
        <Link href="/admin/settings" className={ghostBtn}>
          <Icon name="settings" className="h-4 w-4" />
          Update prices
        </Link>
      </div>
    </>
  );
}
