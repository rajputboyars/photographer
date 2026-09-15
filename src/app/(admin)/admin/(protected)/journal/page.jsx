import { store } from "@/lib/store";
import { deletePost, savePost } from "@/app/(admin)/admin/actions";
import { Card, PageTitle, field, label, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const posts = await store.listPosts();

  return (
    <>
      <PageTitle title="Journal" subtitle="Posts about recent weddings — the pages that rank for venue names." />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {posts.map((post) => (
            <Card key={post.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[16px]">{post.title}</div>
                  <div className="pt-0.5 text-[13px] text-ink/45">/journal/{post.slug}</div>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs ${
                    post.status === "published" ? "border-emerald-300/40 text-emerald-200" : "border-white/20 text-ink/55"
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <p className="pt-3 text-sm leading-relaxed text-ink/65">{post.excerpt}</p>
              <form action={deletePost} className="pt-3">
                <input type="hidden" name="id" value={post.id} />
                <button type="submit" className="text-[13px] text-rose-300/80 hover:text-rose-200">
                  Delete
                </button>
              </form>
            </Card>
          ))}
          {posts.length === 0 ? <Card className="p-8 text-sm text-ink/50">No posts yet.</Card> : null}
        </div>

        <Card className="h-fit p-6">
          <h2 className="pb-4 text-lg font-normal">New post</h2>
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
              <textarea name="body" rows={6} className={field} />
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
            <p className="text-[13px] leading-relaxed text-ink/45">
              Posts are stored but there is no public /journal route yet — that is the next piece of work.
            </p>
          </form>
        </Card>
      </div>
    </>
  );
}
