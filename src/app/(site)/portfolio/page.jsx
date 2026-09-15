import PageShell from "@/components/PageShell";
import PortfolioGrid from "@/components/PortfolioGrid";
import CtaBand from "@/components/CtaBand";
import { GhostLink, Arrow, SectionHead } from "@/components/Glass";
import { photos, site } from "@/lib/site";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio",
  description: `Recent weddings, pre-weddings and celebrations photographed and filmed by ${site.name}.`,
};

export default async function PortfolioPage() {
  const galleries = await store.listGalleries();

  return (
    <PageShell image={photos.heroPortfolio}>
      <section className="flex flex-col items-center gap-4 py-10 text-center md:py-14">
        <span className="meta">Portfolio</span>
        <h1 className="max-w-[820px] text-[clamp(2.2rem,5vw,3.9rem)] font-light leading-[1.05] tracking-tight">
          Every gallery here is someone&rsquo;s <em className="font-extralight">whole year</em>
        </h1>
        <p className="max-w-measure text-[17px] leading-relaxed text-ink/76">
          Filter by the kind of day you&rsquo;re planning. Each cover opens the full set — ceremony, portraits and the
          film.
        </p>
      </section>

      <PortfolioGrid galleries={galleries} />

      <div className="flex justify-center py-12">
        <GhostLink href="/contact">
          Ask about a gallery like yours
          <Arrow />
        </GhostLink>
      </div>

      <CtaBand
        centered={false}
        title="Like what you see?"
        blurb={`Send your date and I'll tell you within ${site.replyHours} hours whether it's free — and what a day like yours usually costs.`}
      />
    </PageShell>
  );
}
