import Link from "next/link";

const cx = (...parts) => parts.filter(Boolean).join(" ");

export function Panel({ as: Tag = "div", strong = false, className, children, ...rest }) {
  return (
    <Tag className={cx(strong ? "glass-strong" : "glass", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Pill({ className, children, ...rest }) {
  return (
    <span className={cx("glass-pill inline-flex items-center gap-2", className)} {...rest}>
      {children}
    </span>
  );
}

/** Primary call to action — the one bright surface on the page. */
export function BrightLink({ href, className, children, ...rest }) {
  return (
    <Link
      href={href}
      className={cx(
        "bright inline-flex items-center gap-2.5 px-7 py-4 text-[15px] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function GhostLink({ href, className, children, ...rest }) {
  return (
    <Link
      href={href}
      className={cx(
        "glass-pill inline-flex items-center gap-2.5 px-6 py-3.5 text-[15px] transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function SectionHead({ kicker, title, blurb, align = "center", className }) {
  return (
    <div
      className={cx(
        "flex flex-col gap-2.5",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {kicker ? <span className="meta">{kicker}</span> : null}
      <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] font-light leading-tight tracking-tight">{title}</h2>
      {blurb ? (
        <p className="max-w-measure pt-1 text-base leading-relaxed text-ink/70">{blurb}</p>
      ) : null}
    </div>
  );
}

export function Arrow({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
