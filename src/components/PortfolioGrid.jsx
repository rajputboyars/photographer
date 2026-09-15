"use client";

import { useMemo, useState } from "react";
import GalleryCard from "./GalleryCard";

// Column span and height per position in a repeating row pattern, so the grid
// keeps the staggered, floating rhythm of the design at any gallery count.
const LAYOUT = [
  { span: "md:col-span-5", height: "h-[280px] md:h-[440px]", offset: "" },
  { span: "md:col-span-4", height: "h-[280px] md:h-[400px]", offset: "md:mt-9" },
  { span: "md:col-span-3", height: "h-[280px] md:h-[340px]", offset: "" },
  { span: "md:col-span-4", height: "h-[280px] md:h-[320px]", offset: "" },
  { span: "md:col-span-4", height: "h-[280px] md:h-[320px]", offset: "md:mt-6" },
  { span: "md:col-span-4", height: "h-[280px] md:h-[320px]", offset: "" },
];

export default function PortfolioGrid({ galleries }) {
  const filters = useMemo(
    () => ["All work", ...Array.from(new Set(galleries.map((g) => g.type)))],
    [galleries]
  );
  const [active, setActive] = useState("All work");

  const shown = active === "All work" ? galleries : galleries.filter((g) => g.type === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5 pb-10">
        {filters.map((filter) => {
          const on = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={on}
              className={`px-5 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                on ? "bright" : "glass-pill hover:border-white/40"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-12 md:items-start">
        {shown.map((gallery, i) => {
          const layout = LAYOUT[i % LAYOUT.length];
          return (
            <GalleryCard
              key={gallery.id}
              className={`${layout.span} ${layout.offset}`}
              src={gallery.thumbnail}
              alt={`${gallery.name} — ${gallery.type}`}
              caption={`${gallery.name} · ${gallery.type}`}
              href={`/works/${gallery.slug}`}
              height={layout.height}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-ink/60">No galleries in this category yet.</p>
      ) : null}
    </>
  );
}
