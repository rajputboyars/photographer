"use client";

import { useState } from "react";
import Image from "next/image";
import PageShell from "./PageShell";
import GalleryCard from "./GalleryCard";
import CtaBand from "./CtaBand";
import { GhostLink, Arrow } from "./Glass";

export default function ClientWorkPage({ clientData }) {
  const categories = clientData.categories ?? [];
  const [active, setActive] = useState(categories[0] ?? null);
  const cards = (active && clientData.cards?.[active]) || [];

  return (
    <PageShell image={clientData.thumbnail}>
      <section className="flex flex-col items-center gap-4 py-10 text-center md:py-14">
        <span className="meta">{clientData.type}</span>
        <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.06] tracking-tight">{clientData.name}</h1>
      </section>

      <div className="flex flex-wrap justify-center gap-2.5 pb-10">
        {categories.map((category) => {
          const on = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={on}
              className={`px-5 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                on ? "bright" : "glass-pill hover:border-white/40"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {cards.length === 0 ? (
        <p className="pb-14 text-center text-ink/60">No photographs in this gallery yet.</p>
      ) : null}

      <div className="grid gap-5 pb-14 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <GalleryCard
            key={card.id}
            src={card.thumbnail}
            alt={card.title}
            caption={card.title}
            height="h-[260px] md:h-[320px]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ))}
      </div>

      <div className="flex justify-center pb-14">
        <GhostLink href="/portfolio">
          Back to the portfolio
          <Arrow />
        </GhostLink>
      </div>

      <CtaBand centered={false} title="Planning something like this?" />
    </PageShell>
  );
}
