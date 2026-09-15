import PageShell from "@/components/PageShell";
import GalleryCard from "@/components/GalleryCard";
import CtaBand from "@/components/CtaBand";
import { Arrow, GhostLink, Panel } from "@/components/Glass";
import Link from "next/link";
import { services } from "@/lib/services";
import { photos, site } from "@/lib/site";

export const metadata = {
  title: "Services",
  description: `Wedding photography, pre-wedding shoots, ceremony coverage, events and portraits in ${site.city}.`,
};

export default function ServicesPage() {
  return (
    <PageShell image={photos.heroCollections}>
      <section className="flex flex-col items-center gap-4 py-10 text-center md:py-14">
        <span className="meta">Services</span>
        <h1 className="max-w-[820px] text-[clamp(2.2rem,5vw,3.9rem)] font-light leading-[1.05] tracking-tight">
          Whatever you&rsquo;re planning, <em className="font-extralight">start here</em>
        </h1>
        <p className="max-w-measure text-[17px] leading-relaxed text-ink/76">
          Six ways people book us. Each one has its own page — what it covers, what you get, and the questions that
          come up every time.
        </p>
      </section>

      <section className="grid gap-5 pb-14 md:grid-cols-2">
        {services.map((service) => (
          <Panel key={service.slug} className="flex flex-col overflow-hidden">
            <Link href={`/services/${service.slug}`} className="group flex flex-col">
              <div className="p-3">
                <GalleryCard src={service.hero} alt={service.name} height="h-[220px]" className="!border-0 !bg-transparent !shadow-none !p-0" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="flex flex-col gap-3 px-7 pb-7 pt-2">
                <span className="meta">{service.kicker}</span>
                <h2 className="text-2xl font-normal">{service.name}</h2>
                <p className="text-[15px] leading-relaxed text-ink/72">{service.intro}</p>
                <span className="inline-flex items-center gap-2 pt-1 text-[15px] text-accent">
                  From {service.price}
                  <Arrow className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Panel>
        ))}
      </section>

      <div className="flex justify-center pb-14">
        <GhostLink href="/collections">
          See the priced collections
          <Arrow />
        </GhostLink>
      </div>

      <CtaBand />
    </PageShell>
  );
}
