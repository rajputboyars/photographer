import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Panel } from "./Glass";

export default function Footer() {
  return (
    <footer className="px-4 pb-10 md:px-11">
      <Panel className="mx-auto max-w-site px-7 pb-7 pt-10 md:px-10 md:pt-11">
        <div className="grid gap-9 pb-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-3.5 md:col-span-5">
            <span className="text-xl font-medium">{site.name}</span>
            <p className="max-w-[330px] text-[15px] leading-relaxed text-ink/70">
              {site.tagline} in {site.city}, travelling anywhere you&rsquo;ll have us.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <span className="meta mb-1">Pages</span>
            {nav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="text-[15px] text-ink/80 hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="text-[15px] text-ink/80 hover:text-white">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <span className="meta mb-1">Follow</span>
            {site.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-ink/80 hover:text-white">
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:col-span-3">
            <span className="meta mb-1">Get in touch</span>
            <a href={`mailto:${site.email}`} className="text-[15px] text-ink/80 hover:text-white">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-[15px] text-ink/80 hover:text-white">
              {site.phone}
            </a>
            <span className="text-[15px] text-ink/80">{site.address.join(", ")}</span>
          </div>
        </div>

        <div className="h-px bg-white/15" />
        <div className="flex flex-col gap-2 pt-5 text-[13px] text-ink/55 sm:flex-row sm:justify-between">
          <span>© [YEAR] {site.name}</span>
          <span>Privacy · Terms</span>
        </div>
      </Panel>
    </footer>
  );
}
