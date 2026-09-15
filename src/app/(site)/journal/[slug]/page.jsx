import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import GalleryCard from "@/components/GalleryCard";
import CtaBand from "@/components/CtaBand";
import { Arrow, GhostLink } from "@/components/Glass";
import { store } from "@/lib/store";

export const dynamic = "force-dynamic";

const published = async (slug) => {
  const posts = await store.listPosts();
  return posts.find((post) => post.slug === slug && post.status === "published") ?? null;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await published(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPost({ params }) {
  const { slug } = await params;
  const post = await published(slug);
  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <PageShell image={post.cover}>
      <nav aria-label="Breadcrumb" className="pt-6 text-[13px] text-ink/55">
        <Link href="/journal" className="hover:text-white">
          Journal
        </Link>
        <span className="px-2">/</span>
        <span className="text-ink/80">{post.title}</span>
      </nav>

      <article className="flex flex-col items-center gap-6 py-10 text-center md:py-14">
        <span className="meta">{date}</span>
        <h1 className="max-w-[880px] text-[clamp(2.1rem,4.6vw,3.5rem)] font-light leading-[1.06] tracking-tight">
          {post.title}
        </h1>
        <p className="max-w-[620px] text-[17px] leading-[1.8] text-ink/78">{post.excerpt}</p>
      </article>

      <GalleryCard src={post.cover} alt="" height="h-[300px] md:h-[520px]" sizes="100vw" className="mb-12" />

      <div className="mx-auto max-w-[680px] pb-14">
        {String(post.body || "")
          .split("\n")
          .filter(Boolean)
          .map((paragraph, i) => (
            <p key={i} className="pb-5 text-[17px] leading-[1.9] text-ink/82">
              {paragraph}
            </p>
          ))}
      </div>

      <div className="flex justify-center pb-14">
        <GhostLink href="/journal">
          More from the journal
          <Arrow />
        </GhostLink>
      </div>

      <CtaBand />
    </PageShell>
  );
}
