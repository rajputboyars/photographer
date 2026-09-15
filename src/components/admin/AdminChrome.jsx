import Link from "next/link";
import { signOut } from "@/app/(admin)/admin/actions";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/galleries", label: "Galleries" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ground/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 md:px-8">
        <Link href="/admin" className="text-[15px] font-medium">
          Isha <span className="text-ink/50">admin</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-1.5 text-ink/70 transition hover:bg-white/10 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 text-sm">
          <Link href="/" className="text-ink/60 hover:text-white">
            View site ↗
          </Link>
          <form action={signOut}>
            <button type="submit" className="rounded-lg border border-white/20 px-3 py-1.5 text-ink/80 transition hover:border-white/40 hover:text-white">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export function DemoBanner() {
  return (
    <div className="border-b border-amber-300/25 bg-amber-300/10">
      <p className="mx-auto max-w-6xl px-4 py-2.5 text-[13px] leading-relaxed text-amber-100/90 md:px-8">
        <strong className="font-medium">Demo data.</strong> Changes are held in memory only — they vanish when the
        server restarts and are not shared between visitors. Add{" "}
        <code className="rounded bg-black/30 px-1">MONGODB_URI</code> and a Mongo store to make them stick.
      </p>
    </div>
  );
}

export function Card({ className = "", children }) {
  return <div className={`rounded-2xl border border-white/12 bg-white/[0.045] ${className}`}>{children}</div>;
}

export function PageTitle({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-normal tracking-tight">{title}</h1>
        {subtitle ? <p className="text-sm text-ink/60">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/40 focus:border-white/45 focus:outline-none";

export const label = "flex flex-col gap-1.5 text-[13px] text-ink/60";

export const primaryBtn =
  "rounded-xl bg-white/90 px-4 py-2.5 text-[14px] font-medium text-ground transition hover:bg-white";

export const ghostBtn =
  "rounded-xl border border-white/20 px-4 py-2.5 text-[14px] text-ink/80 transition hover:border-white/40 hover:text-white";
