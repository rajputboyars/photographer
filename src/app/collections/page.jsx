import PageShell from "@/components/PageShell";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import { BrightLink, GhostLink, Panel, SectionHead } from "@/components/Glass";
import { collections, extras, faqs, process, site } from "@/lib/site";

export const metadata = {
  title: "Collections & pricing",
  description: `What ${site.name} charges for weddings, pre-weddings and events, written down before you have to ask.`,
};

export default function CollectionsPage() {
  return (
    <PageShell image="/images/home-section/IMG-20250104-WA0019.jpg">
      <section className="flex flex-col items-center gap-4 py-10 text-center md:py-14">
        <span className="meta">Collections &amp; pricing</span>
        <h1 className="max-w-[820px] text-[clamp(2.2rem,5vw,3.9rem)] font-light leading-[1.05] tracking-tight">
          Clear prices, before you have to <em className="font-extralight">ask</em>
        </h1>
        <p className="max-w-measure text-[17px] leading-relaxed text-ink/76">
          Three ways most people book. Everything is adjustable — extra days, a second shooter, travel outside{" "}
          {site.city}.
        </p>
      </section>

      {/* COLLECTIONS */}
      <section className="grid gap-5 pb-14 md:grid-cols-3 md:items-start">
        {collections.map((c) => (
          <Panel key={c.id} strong={c.featured} className="flex flex-col gap-5 p-8 md:p-9">
            <span className={`meta ${c.featured ? "text-accent" : ""}`}>{c.kicker}</span>
            <h2 className="text-[1.9rem] font-normal">{c.name}</h2>
            <p className="text-[15px] leading-relaxed text-ink/72">{c.blurb}</p>
            <span className="text-[2.1rem] font-extralight">{c.price}</span>
            <div className="h-px bg-white/15" />
            <ul className="flex flex-col gap-3">
              {c.includes.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink/78">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {line}
                </li>
              ))}
            </ul>
            {c.featured ? (
              <BrightLink href="/contact" className="mt-1 self-start">
                Check your date
              </BrightLink>
            ) : (
              <GhostLink href="/contact" className="mt-1 self-start">
                Enquire
              </GhostLink>
            )}
          </Panel>
        ))}
      </section>

      {/* EXTRAS */}
      <section className="flex flex-col gap-7 pb-14">
        <SectionHead kicker="Add to any collection" title="The extras people ask for" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {extras.map((x) => (
            <Panel key={x.name} className="flex flex-col gap-2.5 p-7">
              <h3 className="text-xl font-normal">{x.name}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{x.blurb}</p>
              <span className="pt-1 text-lg font-light">{x.price}</span>
            </Panel>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="flex flex-col gap-7 pb-14">
        <SectionHead kicker="How booking works" title="Four steps, no surprises" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <Panel key={p.step} className="flex flex-col gap-3 p-7">
              <span className="text-[2.2rem] font-extralight text-accent">{p.step}</span>
              <h3 className="text-xl font-normal">{p.name}</h3>
              <p className="text-[15px] leading-relaxed text-ink/70">{p.blurb}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-14">
        <Panel className="grid gap-10 p-7 md:grid-cols-12 md:p-11">
          <div className="flex flex-col gap-3 md:col-span-4">
            <span className="meta">Before you ask</span>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-tight tracking-tight">
              The questions that come up every time
            </h2>
          </div>
          <div className="flex flex-col md:col-span-8">
            {faqs.map((f) => (
              <div key={f.q} className="flex flex-col gap-2.5 border-t border-white/15 py-6 last:border-b">
                <h3 className="text-lg font-normal">{f.q}</h3>
                <p className="text-[15px] leading-[1.8] text-ink/70">{f.a}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <CtaBand
        centered={false}
        title="Not sure which one fits?"
        blurb="Tell me the events and the rough guest count and I'll put together a collection that matches, priced in writing."
        action="Get a custom quote"
      />
    </PageShell>
  );
}
