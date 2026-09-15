import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import GalleryCard from "@/components/GalleryCard";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import { Arrow, BrightLink, GhostLink, Panel, Pill, SectionHead } from "@/components/Glass";
import { collections, photos, site, testimonials } from "@/lib/site";
import { services } from "@/lib/services";

const FEATURED = [
  { src: photos.mehndi, alt: "Mehndi ceremony", height: "h-[260px] md:h-[300px]" },
  { src: photos.preWedding, alt: "Pre-wedding portrait", height: "h-[300px] md:h-[360px]", className: "md:-mt-10" },
  { src: photos.reception, alt: "Reception", height: "h-[260px] md:h-[300px]" },
];

export default function Home() {
  return (
    <PageShell image={photos.heroHome} imageAlt="">
      {/* HERO */}
      <section className="flex animate-rise flex-col items-center gap-6 py-10 text-center md:py-16">
        <Pill className="px-5 py-2.5 text-sm">
          Booking {site.seasons.join(" & ")} · {site.datesLeft} dates left
        </Pill>
        <h1 className="max-w-[900px] text-[clamp(2.6rem,7vw,5.1rem)] font-light leading-[1.02] tracking-tight">
          The day, kept clear as <em className="font-extralight">the light</em>
        </h1>
        <p className="max-w-measure text-lg leading-relaxed text-ink/78">
          {site.tagline} in {site.city}. Shot on fast primes, graded by hand, delivered in [N] weeks.
        </p>
        <div className="flex flex-col items-stretch gap-3 pt-3 sm:flex-row sm:items-center">
          <BrightLink href="/contact">
            Check your date
            <Arrow />
          </BrightLink>
          <GhostLink href="/portfolio">
            <Icon name="play" className="h-3.5 w-3.5" filled />
            Watch the showreel
          </GhostLink>
        </div>
      </section>

      {/* FLOATING CARDS */}
      <section className="grid gap-5 pb-14 md:grid-cols-3 md:items-center">
        {FEATURED.map((item) => (
          <GalleryCard key={item.src} {...item} sizes="(max-width: 768px) 100vw, 33vw" />
        ))}
      </section>

      {/* COLLECTIONS */}
      <section className="flex flex-col gap-8 pb-14">
        <SectionHead
          kicker="The collections"
          title="Three ways to book"
          blurb="Every collection includes a photographer and a film-maker, so nothing is caught in only one medium."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {collections.map((c) => (
            <Panel key={c.id} strong={c.featured} className="flex flex-col gap-3.5 p-8">
              <span className={`meta ${c.featured ? "text-accent" : ""}`}>{c.kicker}</span>
              <h3 className="text-2xl font-normal">{c.name}</h3>
              <p className="text-[15px] leading-relaxed text-ink/72">{c.blurb}</p>
              <span className="pt-1 text-2xl font-light">{c.price}</span>
            </Panel>
          ))}
        </div>
        <div className="flex justify-center">
          <GhostLink href="/collections">
            See everything included
            <Arrow />
          </GhostLink>
        </div>
      </section>

      {/* SERVICES */}
      <section className="flex flex-col gap-7 pb-14">
        <SectionHead
          kicker="What we shoot"
          title="Six ways people book us"
          blurb="Each has its own page — what it covers, what you get, and the questions that come up every time."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Panel className="flex h-full items-center justify-between gap-4 p-6 transition hover:border-white/35">
                <div className="flex flex-col gap-1">
                  <span className="text-lg">{service.name}</span>
                  <span className="text-sm text-ink/60">From {service.price}</span>
                </div>
                <Arrow className="h-5 w-5 shrink-0 text-accent" />
              </Panel>
            </Link>
          ))}
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="flex flex-col gap-7 pb-14">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <SectionHead
            align="left"
            kicker="Recent celebrations"
            title={
              <>
                A few days we&rsquo;re
                <br className="hidden md:block" /> still thinking about
              </>
            }
          />
          <GhostLink href="/portfolio" className="shrink-0">
            View full portfolio
            <Arrow />
          </GhostLink>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          <GalleryCard
            className="md:col-span-7"
            src={photos.wedding}
            alt="Wedding ceremony"
            caption="[Couple] & [Couple] · [Venue]"
            height="h-[280px] md:h-[400px]"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <GalleryCard
            className="md:col-span-5"
            src={photos.sangeet}
            alt="Sangeet night"
            caption="[Couple] & [Couple] · Sangeet"
            height="h-[280px] md:h-[400px]"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
          <GalleryCard className="md:col-span-4" src={photos.birthday} alt="First birthday" height="h-[240px] md:h-[280px]" />
          <GalleryCard className="md:col-span-4" src={photos.celebration} alt="Birthday celebration" height="h-[240px] md:h-[280px]" />
          <GalleryCard className="md:col-span-4" src={photos.haldi} alt="Haldi ceremony" height="h-[240px] md:h-[280px]" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="pb-14">
        <Panel className="grid gap-10 p-7 md:grid-cols-12 md:items-center md:p-11">
          <div className="relative h-[320px] overflow-hidden rounded-[22px] md:col-span-5 md:h-[440px]">
            <Image
              src={photos.portrait}
              alt="Chandra Shekar, photographer"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 md:col-span-7">
            <span className="meta">Behind the camera</span>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-light tracking-tight">Hi, I&rsquo;m Chandra Shekar</h2>
            <p className="text-base leading-[1.85] text-ink/76">
              I&rsquo;ve spent the last [N] years photographing weddings, and I still shoot the same way I did on day
              one — quietly, from the edge of the room, waiting for the moment rather than arranging it.
            </p>
            <p className="text-base leading-[1.85] text-ink/76">
              My team is small on purpose. On your day you work with me and one film-maker, not a rotating crew.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                ["[N]+", "Weddings"],
                ["[N]", "Cities"],
                ["[N] wks", "Delivery"],
              ].map(([value, label]) => (
                <div key={label} className="glass-pill flex flex-col gap-1 rounded-[20px] px-6 py-4">
                  <span className="text-2xl font-light">{value}</span>
                  <span className="meta text-[11px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      {/* TESTIMONIALS */}
      <section className="flex flex-col gap-7 pb-14">
        <SectionHead kicker="In their words" title="What couples say afterwards" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Panel key={i} className="flex flex-col gap-4 p-8">
              <p className="text-lg font-light leading-relaxed">{t.quote}</p>
              <span className="meta">
                {t.name} · {t.context}
              </span>
            </Panel>
          ))}
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
