import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import GalleryCard from "@/components/GalleryCard";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import { Arrow, BrightLink, GhostLink, Panel, SectionHead } from "@/components/Glass";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Not found" };

  return {
    title: `${service.name} in ${site.city}`,
    description: service.intro,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related.map(getService).filter(Boolean);

  return (
    <PageShell image={service.hero}>
      <nav aria-label="Breadcrumb" className="pt-6 text-[13px] text-ink/55">
        <Link href="/services" className="hover:text-white">
          Services
        </Link>
        <span className="px-2">/</span>
        <span className="text-ink/80">{service.name}</span>
      </nav>

      <section className="flex flex-col items-center gap-5 py-10 text-center md:py-14">
        <span className="meta">{service.kicker}</span>
        <h1 className="max-w-[880px] text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.06] tracking-tight">
          {service.headline}
        </h1>
        <p className="max-w-[620px] text-[17px] leading-[1.8] text-ink/78">{service.intro}</p>
        <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
          <BrightLink href="/contact">
            Check your date
            <Arrow />
          </BrightLink>
          <GhostLink href="/portfolio">See the work</GhostLink>
        </div>
      </section>

      <section className="grid gap-5 pb-14 md:grid-cols-3">
        {service.gallery.map((src, i) => (
          <GalleryCard
            key={`${src}-${i}`}
            src={src}
            alt={`${service.name} — example ${i + 1}`}
            height="h-[240px] md:h-[300px]"
            className={i === 1 ? "md:-mt-8" : ""}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ))}
      </section>

      <section className="grid gap-5 pb-14 md:grid-cols-12">
        <Panel strong className="flex flex-col gap-5 p-8 md:col-span-7 md:p-10">
          <span className="meta text-accent">What&rsquo;s included</span>
          <ul className="flex flex-col gap-3.5">
            {service.includes.map((line) => (
              <li key={line} className="flex items-start gap-3 text-base leading-relaxed text-ink/85">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                {line}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="flex h-fit flex-col gap-4 p-8 md:col-span-5 md:p-10">
          <span className="meta">From</span>
          <span className="text-[2.4rem] font-extralight leading-none">{service.price}</span>
          <p className="text-[15px] leading-relaxed text-ink/70">
            Adjustable for extra days, a second shooter or travel outside {site.city}. Written down before anything is
            paid.
          </p>
          <BrightLink href="/contact" className="mt-2 self-start">
            Ask about your date
            <Arrow />
          </BrightLink>
        </Panel>
      </section>

      <section className="pb-14">
        <Panel className="grid gap-10 p-7 md:grid-cols-12 md:p-11">
          <div className="flex flex-col gap-3 md:col-span-4">
            <span className="meta">Before you ask</span>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-tight tracking-tight">
              Questions about {service.name.toLowerCase()}
            </h2>
          </div>
          <div className="flex flex-col md:col-span-8">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="flex flex-col gap-2.5 border-t border-white/15 py-6 last:border-b">
                <h3 className="text-lg font-normal">{faq.q}</h3>
                <p className="text-[15px] leading-[1.8] text-ink/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {related.length ? (
        <section className="flex flex-col gap-6 pb-14">
          <SectionHead align="left" kicker="Also worth a look" title="People who book this also ask about" />
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`}>
                <Panel className="flex items-center justify-between gap-4 p-6 transition hover:border-white/35">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg">{item.name}</span>
                    <span className="text-sm text-ink/60">From {item.price}</span>
                  </div>
                  <Arrow className="h-5 w-5 text-accent" />
                </Panel>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBand />
    </PageShell>
  );
}
