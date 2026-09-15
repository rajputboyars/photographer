import Image from "next/image";
import PageShell from "@/components/PageShell";
import GalleryCard from "@/components/GalleryCard";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import { Arrow, BrightLink, Panel, Pill, SectionHead } from "@/components/Glass";
import { photos, principles, site, venues } from "@/lib/site";

export const metadata = {
  title: "Studio",
  description: `About ${site.name} — a small wedding photography and film studio in ${site.city}.`,
};

const ON_THE_DAY = [
  { src: photos.sangeet, alt: "Sangeet night" },
  { src: photos.wedding, alt: "Wedding ceremony" },
  { src: photos.celebration, alt: "Guests celebrating" },
  { src: photos.haldi, alt: "Haldi ceremony" },
];

export default function StudioPage() {
  return (
    <PageShell image={photos.heroStudio}>
      {/* INTRO */}
      <section className="grid gap-10 py-10 md:grid-cols-12 md:items-center md:py-14">
        <div className="flex flex-col gap-5 md:col-span-7">
          <span className="meta">About the studio</span>
          <h1 className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-light leading-[1.08] tracking-tight">
            I&rsquo;d rather wait ten minutes for a real moment than <em className="font-extralight">stage one</em>
          </h1>
          <p className="max-w-[580px] text-base leading-[1.9] text-ink/78">
            I&rsquo;m Chandra Shekar. I started photographing weddings [N] years ago, mostly because I liked the parts
            nobody was pointing a camera at — a grandmother straightening someone&rsquo;s dupatta, two cousins laughing
            through a ceremony they were meant to be solemn for.
          </p>
          <p className="max-w-[580px] text-base leading-[1.9] text-ink/78">
            That&rsquo;s still what I look for. {site.name} is a small studio in {site.city}: me, one film-maker, and a
            second shooter on the bigger days. Small enough that you always know who&rsquo;s coming.
          </p>
          <BrightLink href="/contact" className="mt-2 self-start">
            Check your date
            <Arrow />
          </BrightLink>
        </div>
        <Panel className="p-3 md:col-span-5">
          <div className="relative h-[380px] overflow-hidden rounded-[20px] md:h-[520px]">
            <Image
              src={photos.heroStudio}
              alt="Chandra Shekar at work"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Panel>
      </section>

      {/* PRINCIPLES */}
      <section className="flex flex-col gap-7 pb-14">
        <SectionHead kicker="How I work" title="Three things I won't compromise on" />
        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((p) => (
            <Panel key={p.name} className="flex flex-col gap-3.5 p-8">
              <Pill className="h-[52px] w-[52px] justify-center">
                <Icon name={p.icon} className="h-6 w-6 text-accent" />
              </Pill>
              <h3 className="text-2xl font-normal">{p.name}</h3>
              <p className="text-[15px] leading-[1.8] text-ink/72">{p.blurb}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* ON THE DAY */}
      <section className="flex flex-col gap-7 pb-14">
        <SectionHead
          kicker="On the day"
          title="What it looks like from where I stand"
          blurb="Frames from recent weddings — no styling, no second takes."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ON_THE_DAY.map((photo) => (
            <GalleryCard
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              height="h-[240px] md:h-[260px]"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          ))}
        </div>
      </section>

      {/* VENUES */}
      <section className="flex flex-col items-center gap-5 pb-14">
        <span className="meta">Recently photographed at</span>
        <div className="flex flex-wrap justify-center gap-3">
          {venues.map((venue, i) => (
            <Pill key={i} className="px-6 py-3 text-[15px]">
              {venue}
            </Pill>
          ))}
        </div>
      </section>

      <CtaBand
        centered={false}
        title="Let's see if we're a fit"
        blurb="Most couples start with a short call. No pitch — just your date, your events and what you're hoping to remember."
        action="Book a call"
      />
    </PageShell>
  );
}
