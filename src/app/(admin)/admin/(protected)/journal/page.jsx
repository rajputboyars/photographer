import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { store } from "@/lib/store";
import { deletePost, savePost } from "@/app/(admin)/admin/actions";
import { Card, EmptyState, PageTitle, field, label, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const posts = await store.listPosts();

  return (
    <>
      <PageTitle title="Journal" subtitle="Posts about recent weddings — the pages that rank for venue names." />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {posts.map((post) => {
            const live = post.status === "published";
            return (
              <Card key={post.id} className="flex gap-4 overflow-hidden p-4">
                <div className="relative hidden h-[104px] w-[132px] shrink-0 overflow-hidden rounded-xl sm:block">
                  <Image src={post.cover} alt="" fill sizes="132px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <span className="text-[16px]">{post.title}</span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[12px] ${
                        live ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-white/18 bg-white/5 text-ink/55"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <span className="text-[13px] text-ink/40">/journal/{post.slug}</span>
                  <p className="line-clamp-2 text-[14px] leading-relaxed text-ink/60">{post.excerpt}</p>
                  <div className="flex items-center gap-4 pt-1.5">
                    {live ? (
                      <Link href={`/journal/${post.slug}`} className="inline-flex items-center gap-1.5 text-[13px] text-accent hover:text-white">
                        <Icon name="external" className="h-3.5 w-3.5" />
                        View
                      </Link>
                    ) : null}
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="inline-flex items-center gap-1.5 text-[13px] text-rose-300/70 transition hover:text-rose-200">
                        <Icon name="trash" className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </Card>
            );
          })}
          {posts.length === 0 ? (
            <Card>
              <EmptyState icon="pen" title="No posts yet">
                A post per wedding is how the site starts ranking for venue names.
              </EmptyState>
            </Card>
          ) : null}
        </div>

        <Card className="h-fit p-6">
          <div className="flex items-center gap-2.5 pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05]">
              <Icon name="pen" className="h-4 w-4 text-accent" />
            </span>
            <h2 className="text-[17px]">New post</h2>
          </div>
          <form action={savePost} className="flex flex-col gap-4">
            <label className={label}>
              Title
              <input name="title" required placeholder="Three days at [Venue]" className={field} />
            </label>
            <label className={label}>
              Slug
              <input name="slug" required pattern="[a-z0-9-]+" placeholder="three-days-at-the-palace" className={field} />
            </label>
            <label className={label}>
              Excerpt
              <textarea name="excerpt" rows={2} className={field} />
            </label>
            <label className={label}>
              Body
              <textarea name="body" rows={6} placeholder="One paragraph per line." className={field} />
            </label>
            <label className={label}>
              Cover image path
              <input name="cover" defaultValue="/images/photos/mehndi.jpg" className={field} />
            </label>
            <label className={label}>
              Status
              <select name="status" defaultValue="draft" className={field}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
            <button type="submit" className={primaryBtn}>
              Save post
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}
