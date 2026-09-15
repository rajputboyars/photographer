import Link from "next/link";
import Icon from "@/components/Icon";
import { signOut } from "@/app/(admin)/admin/actions";
import AdminNav from "./AdminNav";

export const NAV = [
  { href: "/admin", label: "Overview", icon: "gauge" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "inbox" },
  { href: "/admin/galleries", label: "Galleries", icon: "images" },
  { href: "/admin/journal", label: "Journal", icon: "pen" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-white/[0.08] bg-white/[0.02] px-4 py-6 lg:flex">
      <Link href="/admin" className="flex items-center gap-3 px-3 pb-8">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent/80 to-indigo-400/70 text-[13px] font-semibold text-ground">
          IP
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[15px] font-medium">Isha</span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-ink/40">Studio admin</span>
        </span>
      </Link>

      <AdminNav items={NAV} />

      <div className="mt-auto flex flex-col gap-1 border-t border-white/[0.08] pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-ink/60 transition hover:bg-white/[0.06] hover:text-white"
        >
          <Icon name="external" className="h-[18px] w-[18px]" />
          View site
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-ink/60 transition hover:bg-white/[0.06] hover:text-white"
          >
            <Icon name="back" className="h-[18px] w-[18px]" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

export function MobileBar() {
  return (
    <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/[0.08] bg-ground/90 px-4 py-3 backdrop-blur lg:hidden">
      <Link href="/admin" className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent/80 to-indigo-400/70 text-[12px] font-semibold text-ground">
          IP
        </span>
        <span className="text-[15px] font-medium">Isha admin</span>
      </Link>
      <form action={signOut} className="ml-auto">
        <button type="submit" className="rounded-lg border border-white/15 px-3 py-1.5 text-[13px] text-ink/75">
          Sign out
        </button>
      </form>
    </div>
  );
}

export function MobileNav() {
  return (
    <div className="sticky bottom-0 z-30 border-t border-white/[0.08] bg-ground/95 px-2 py-2 backdrop-blur lg:hidden">
      <AdminNav items={NAV} variant="bar" />
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-300/25 bg-amber-300/[0.08] px-5 py-3.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-amber-300/50 text-[11px] text-amber-200">
        !
      </span>
      <p className="text-[13px] leading-relaxed text-amber-100/85">
        <strong className="font-medium">Demo data.</strong> Changes are held in memory only — they vanish when the
        server restarts and are not shared between visitors. Add{" "}
        <code className="rounded bg-black/30 px-1">MONGODB_URI</code> and a Mongo store to make them stick.
      </p>
    </div>
  );
}

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl border border-white/[0.10] bg-white/[0.035] ${className}`}>{children}</div>
  );
}

export function PageTitle({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-7">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[1.75rem] font-light tracking-tight">{title}</h1>
        {subtitle ? <p className="text-sm text-ink/55">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

/** Coloured status pill, shared by the inbox, the detail page and the dashboard. */
export const STATUS_STYLE = {
  new: "border-sky-400/40 bg-sky-400/10 text-sky-200",
  replied: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  booked: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  closed: "border-white/20 bg-white/5 text-ink/55",
};

export function StatusPill({ status, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] capitalize ${
        STATUS_STYLE[status] ?? STATUS_STYLE.closed
      } ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/** Initials avatar — gives the inbox a scannable left edge. */
export function Avatar({ name, className = "" }) {
  const initials = String(name || "?")
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.04] text-[13px] font-medium text-ink/85 ${className}`}
    >
      {initials}
    </span>
  );
}

export function EmptyState({ icon = "inbox", title, children }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04]">
        <Icon name={icon} className="h-5 w-5 text-ink/50" />
      </span>
      <p className="text-[15px]">{title}</p>
      {children ? <p className="max-w-[360px] text-sm leading-relaxed text-ink/55">{children}</p> : null}
    </div>
  );
}

export const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink/35 transition focus:border-accent/60 focus:bg-white/[0.08] focus:outline-none";

export const label = "flex flex-col gap-1.5 text-[13px] text-ink/55";

export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 text-[14px] font-medium text-ground transition hover:bg-white";

export const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-[14px] text-ink/80 transition hover:border-white/35 hover:text-white";
