import Image from "next/image";
import PageShell from "@/components/PageShell";
import EnquiryForm from "@/components/EnquiryForm";
import Icon from "@/components/Icon";
import { Panel, Pill } from "@/components/Glass";
import { photos, site } from "@/lib/site";

export const metadata = {
  title: "Check your date",
  description: `Send your date and venue and ${site.name} will reply within ${site.replyHours} hours with availability and a full price list.`,
};

const NEXT_STEPS = [
  { step: "01", text: `I check the date against the calendar and reply within ${site.replyHours} hours.` },
  { step: "02", text: "You get the full price list and two or three galleries like your day." },
  { step: "03", text: "If it feels right, we talk. If not, no follow-ups from me." },
];

const SOCIAL_ICONS = { Instagram: "instagram", Facebook: "facebook", YouTube: "youtube" };

export default function ContactPage() {
  return (
    <PageShell image={photos.heroContact}>
      <div className="grid gap-6 py-8 md:grid-cols-12 md:items-start md:py-10">
        {/* FORM */}
        <Panel className="flex flex-col gap-7 p-7 md:col-span-7 md:p-11">
          <div className="flex flex-col gap-3.5">
            <span className="meta">Check your date</span>
            <h1 className="text-[clamp(2rem,4vw,3.1rem)] font-light leading-[1.08] tracking-tight">
              Tell me about your <em className="font-extralight">celebration</em>
            </h1>
            <p className="max-w-[500px] text-base leading-relaxed text-ink/76">
              Six fields, one minute. You&rsquo;ll get availability and a full price list back within {site.replyHours}{" "}
              hours — and nothing else, ever.
            </p>
          </div>
          <EnquiryForm />
        </Panel>

        {/* SIDE RAIL */}
        <div className="flex flex-col gap-6 md:col-span-5">
          <Panel className="p-3">
            <div className="relative h-[240px] overflow-hidden rounded-[20px] md:h-[280px]">
              <Image
                src={photos.heroContact}
                alt="Couple at their pre-wedding shoot"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Panel>

          <Panel strong className="flex flex-col gap-5 p-8">
            <span className="meta text-accent">Rather just talk?</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-3.5 text-[17px] hover:text-white">
              <Icon name="phone" className="h-5 w-5 shrink-0 text-accent" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3.5 break-all text-[17px] hover:text-white">
              <Icon name="mail" className="h-5 w-5 shrink-0 text-accent" />
              {site.email}
            </a>
            <div className="flex items-start gap-3.5 text-base leading-relaxed text-ink/82">
              <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                {site.address[0]}
                <br />
                {site.address[1]}
              </span>
            </div>
            <div className="h-px bg-white/[0.18]" />
            <div className="flex gap-3">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass-pill flex h-11 w-11 items-center justify-center transition hover:border-white/45"
                >
                  <Icon name={SOCIAL_ICONS[s.label] ?? "instagram"} />
                </a>
              ))}
            </div>
          </Panel>

          <Panel className="flex flex-col gap-5 p-8">
            <span className="meta">What happens next</span>
            {NEXT_STEPS.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <span className="text-2xl font-extralight leading-none text-accent">{s.step}</span>
                <p className="text-[15px] leading-relaxed text-ink/74">{s.text}</p>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}
