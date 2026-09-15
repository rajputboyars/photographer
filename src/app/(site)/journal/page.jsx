import Link from "next/link";
import PageShell from "@/components/PageShell";
import GalleryCard from "@/components/GalleryCard";
import CtaBand from "@/components/CtaBand";
import { Arrow, Panel } from "@/components/Glass";
import { store } from "@/lib/store";
import { photos, site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journal",
  description: `Recent weddings and celebrations photographed by ${site.name}, written up in full.`,
};

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

export default async function JournalPage() {
  const posts = (await store.listPosts()).filter((post) => post.status === "published");

  return (
    <PageShell image={photos.mehndi}>
      <section className="flex flex-col items-center gap-4 py-10 text-center md:py-14">
        <span className="meta">Journal</span>
        <h1 className="max-w-[820px] text-[clamp(2.2rem,5vw,3.9rem)] font-light leading-[1.05] tracking-tight">
          Days worth <em className="font-extralight">writing down</em>
        </h1>
        <p className="max-w-measure text-[17px] leading-relaxed text-ink/76">
          Recent weddings and celebrations, at more length than a gallery allows — where they happened, what the light
          was doing, and what we would do again.
        </p>
      </section>

      {posts.length === 0 ? (
        <Panel className="mb-14 p-12 text-center">
          <p className="text-ink/65">
            No posts published yet. Write the first one in the{" "}
            <Link href="/admin/journal" className="text-accent hover:text-white">
              admin
            </Link>
            .
          </p>
        </Panel>
      ) : (
        <section className="grid gap-6 pb-14 md:grid-cols-2">
          {posts.map((post, i) => (
            <article key={post.id} className={i === 0 ? "md:col-span-2" : ""}>
              <Link href={`/journal/${post.slug}`} className="group flex flex-col gap-4">
                <GalleryCard
                  src={post.cover}
                  alt=""
                  height={i === 0 ? "h-[280px] md:h-[420px]" : "h-[240px] md:h-[280px]"}
                  sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                />
                <div className="flex flex-col gap-2 px-2">
                  <span className="meta">{formatDate(post.publishedAt)}</span>
                  <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-light tracking-tight">{post.title}</h2>
                  <p className="max-w-[620px] text-[15px] leading-relaxed text-ink/70">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 pt-1 text-[15px] text-accent">
                    Read it
                    <Arrow className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      )}

      <CtaBand />
    </PageShell>
  );
}
