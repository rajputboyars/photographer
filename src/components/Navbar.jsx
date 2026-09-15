"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="px-4 pt-5 md:px-11 md:pt-6">
      <nav
        aria-label="Main"
        className="glass-pill mx-auto flex max-w-site items-center justify-between gap-4 py-2.5 pl-6 pr-2.5"
      >
        <Link href="/" className="py-2 text-lg font-medium tracking-tight md:text-xl">
          {site.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`rounded-full px-5 py-2.5 text-[15px] transition ${
                isCurrent(item.href) ? "glass-pill" : "hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="bright ml-2 px-6 py-3 text-[15px]">
            Check your date
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="glass-pill flex h-11 w-11 items-center justify-center md:hidden"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
            {open ? (
              <>
                <path d="m6 6 12 12" />
                <path d="M18 6 6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div id="mobile-nav" className="glass mx-auto mt-3 flex max-w-site flex-col gap-1 p-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={`rounded-2xl px-4 py-3.5 text-base ${isCurrent(item.href) ? "bg-white/10" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="bright mt-1 px-5 py-3.5 text-center text-base">
            Check your date
          </Link>
        </div>
      ) : null}
    </header>
  );
}
