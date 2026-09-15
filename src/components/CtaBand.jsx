import { BrightLink, GhostLink, Panel, Arrow } from "./Glass";
import Icon from "./Icon";
import { site } from "@/lib/site";

export default function CtaBand({
  kicker = `Now booking ${site.seasons.join(" & ")}`,
  title = "Tell me about your day",
  blurb = `Send the date and the venue and I'll reply within ${site.replyHours} hours with availability and a full price list. No advance to ask.`,
  centered = true,
  action = "Check your date",
  showWhatsApp = true,
}) {
  if (!centered) {
    return (
      <Panel strong className="flex flex-col items-start justify-between gap-7 px-7 py-11 md:flex-row md:items-center md:px-11">
        <div className="flex flex-col gap-3">
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-light tracking-tight">{title}</h2>
          <p className="max-w-[520px] text-base leading-relaxed text-ink/75">{blurb}</p>
        </div>
        <BrightLink href="/contact" className="shrink-0">
          {action}
          <Arrow />
        </BrightLink>
      </Panel>
    );
  }

  return (
    <Panel strong className="flex flex-col items-center gap-5 px-6 py-12 text-center md:px-11 md:py-14">
      <span className="meta text-accent">{kicker}</span>
      <h2 className="text-[clamp(2rem,4vw,2.9rem)] font-light tracking-tight">{title}</h2>
      <p className="max-w-measure text-base leading-relaxed text-ink/75">{blurb}</p>
      <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
        <BrightLink href="/contact">
          {action}
          <Arrow />
        </BrightLink>
        {showWhatsApp ? (
          <GhostLink href={`tel:${site.phone.replace(/\s/g, "")}`}>
            <Icon name="phone" className="h-4 w-4" />
            WhatsApp {site.phone}
          </GhostLink>
        ) : null}
      </div>
    </Panel>
  );
}
