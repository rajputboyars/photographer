"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

const isCurrent = (pathname, href) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

export default function AdminNav({ items, variant = "rail" }) {
  const pathname = usePathname();

  if (variant === "bar") {
    return (
      <nav aria-label="Admin" className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = isCurrent(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] transition ${
                active ? "bg-white/10 text-white" : "text-ink/55"
              }`}
            >
              <Icon name={item.icon} className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {items.map((item) => {
        const active = isCurrent(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition ${
              active ? "bg-white/[0.10] text-white" : "text-ink/60 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {active ? (
              <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent" />
            ) : null}
            <Icon name={item.icon} className="h-[18px] w-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
