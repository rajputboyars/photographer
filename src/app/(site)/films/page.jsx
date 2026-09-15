import PageShell from "@/components/PageShell";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import { Arrow, BrightLink, GhostLink, Panel, Pill, SectionHead } from "@/components/Glass";
import { photos, site } from "@/lib/site";

export const metadata = {
  title: "Wedding films",
  description: `Wedding films and event cinema in ${site.city} — highlight films, full ceremony edits, same-day edits and save-the-date reels.`,
};

const FILMS = [
  {
    length: "[N] min",
    name: "The highlight film",
    blurb:
      "The one everybody watches. Vows and speeches carry it, cut against the parts of the day you were too busy to see.",
    still: photos.wedding,
  },
  {
    length: "[N] min",
    name: "The full ceremony",
    blurb:
      "Unhurried and complete, multi-camera, for the people who could not be there and the ones who will want it in twenty years.",
    still: photos.reception,
  },
  {
    length: "60 sec",
    name: "The reel",
    blurb: "Vertical, cut for a phone, in your hands within 48 hours — while everybody is still asking to see something.",
    still: photos.sangeet,
  },
];

const CRAFT = [
  { icon: "camera", name: "Fast primes, available light", blurb: "No video light in anyone's face during a ceremony. Grain over glare." },
  { icon: "play", name: "Real sound", blurb: "Lapel mics on whoever is speaking, plus a board feed where there is one. Vows you can actually hear." },
  { icon: "clock", name: "Graded by hand", blurb: "Every clip matched by eye, not a preset dropped over the timeline." },
];

export default function FilmsPage() {
  return (
    <PageShell image={photos.sangeet}>
      <section className="flex flex-col items-center gap-5 py-10 text-center md:py-16">
        <Pill className="px-5 py-2.5 text-sm">Half of what we do is moving</Pill>
        <h1 className="max-w-[900px] text-[clamp(2.4rem,6vw,4.4rem)] font-light leading-[1.02] tracking-tight">
          Photographs stop the day. <em className="font-extralight">Film lets it run.</em>
        </h1>
        <p className="max-w-measure text-lg leading-relaxed text-ink/78">
          A film-maker is on every booking, not sold separately — so the way your mother&rsquo;s voice cracked during the
          speech is kept, not just how her face looked.
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

      <section className="pb-14">
        <Panel className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center md:py-28">
          <Pill className="h-16 w-16 justify-center">
            <Icon name="play" className="h-6 w-6" filled />
          </Pill>
          <p className="text-lg">The showreel goes here</p>
          <p className="max-w-[420px] text-[15px] leading-relaxed text-ink/60">
            Drop in a YouTube or Vimeo embed — [paste the showreel link] — and this becomes the first thing visitors
            press.
          </p>
        </Panel>
      </section>

      <section className="flex flex-col gap-8 pb-14">
        <SectionHead
          kicker="What you get"
          title="Three cuts of the same day"
          blurb="Every wedding booking includes the first two. The reel is what your family will actually share."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {FILMS.map((film) => (
            <Panel key={film.name} className="flex flex-col overflow-hidden">
              <div className="relative h-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={film.still} alt="" className="h-full w-full object-cover" />
                <Pill className="absolute bottom-4 left-4 px-4 py-2 text-sm">
                  <Icon name="play" className="h-3 w-3" filled />
                  {film.length}
                </Pill>
              </div>
              <div className="flex flex-col gap-3 p-7">
                <h2 className="text-2xl font-normal">{film.name}</h2>
                <p className="text-[15px] leading-relaxed text-ink/72">{film.blurb}</p>
              </div>
            </Panel>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-7 pb-14">
        <SectionHead kicker="How they are made" title="Three decisions that change everything" />
        <div className="grid gap-5 md:grid-cols-3">
          {CRAFT.map((item) => (
            <Panel key={item.name} className="flex flex-col gap-3.5 p-8">
              <Pill className="h-[52px] w-[52px] justify-center">
                <Icon name={item.icon} className="h-6 w-6 text-accent" filled={item.icon === "play"} />
              </Pill>
              <h3 className="text-xl font-normal">{item.name}</h3>
              <p className="text-[15px] leading-[1.8] text-ink/72">{item.blurb}</p>
            </Panel>
          ))}
        </div>
      </section>

      <section className="pb-14">
        <Panel strong className="flex flex-col gap-4 p-8 md:p-10">
          <span className="meta text-accent">Add on</span>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-light tracking-tight">The same-day edit</h2>
          <p className="max-w-[640px] text-base leading-relaxed text-ink/78">
            A two-minute film shot in the morning, cut during the afternoon and screened at the reception that night.
            The room goes quiet, then very loud. [YOUR PRICE], and it needs to be booked in advance — not decided on the
            day.
          </p>
          <BrightLink href="/contact" className="mt-2 self-start">
            Ask about it
            <Arrow />
          </BrightLink>
        </Panel>
      </section>

      <CtaBand
        title="Tell me about the day you want filmed"
        blurb={`Send the date and the events and I'll reply within ${site.replyHours} hours with availability and what the films would cost.`}
      />
    </PageShell>
  );
}
