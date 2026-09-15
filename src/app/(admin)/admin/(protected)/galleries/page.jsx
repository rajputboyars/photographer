import Image from "next/image";
import { store } from "@/lib/store";
import { deleteGallery, saveGallery } from "@/app/(admin)/admin/actions";
import { Card, PageTitle, field, ghostBtn, label, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export default async function GalleriesPage() {
  const galleries = await store.listGalleries();

  return (
    <>
      <PageTitle title="Galleries" subtitle="What shows on the portfolio, and what each cover looks like." />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {galleries.map((g) => (
            <Card key={g.slug} className="overflow-hidden">
              <div className="relative h-40">
                <Image src={g.thumbnail} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px]">{g.name}</span>
                  <span className="text-[13px] text-ink/50">{g.type}</span>
                </div>
                <div className="text-[13px] text-ink/45">/works/{g.slug}</div>
                <div className="text-[13px] text-ink/45">{g.categories.join(" · ") || "No categories"}</div>
                <form action={deleteGallery} className="pt-1">
                  <input type="hidden" name="slug" value={g.slug} />
                  <button type="submit" className="text-[13px] text-rose-300/80 hover:text-rose-200">
                    Remove
                  </button>
                </form>
              </div>
            </Card>
          ))}
        </div>

        <Card className="h-fit p-6">
          <h2 className="pb-4 text-lg font-normal">Add or update a gallery</h2>
          <form action={saveGallery} className="flex flex-col gap-4">
            <label className={label}>
              Couple or client
              <input name="name" required placeholder="Priya &amp; Arjun" className={field} />
            </label>
            <label className={label}>
              Slug
              <input name="slug" required placeholder="priya-arjun" pattern="[a-z0-9-]+" className={field} />
            </label>
            <label className={label}>
              Type
              <input name="type" required placeholder="Wedding" className={field} />
            </label>
            <label className={label}>
              Cover image path
              <input name="thumbnail" required defaultValue="/images/photos/wedding-ceremony.jpg" className={field} />
            </label>
            <label className={label}>
              Categories, comma separated
              <input name="categories" placeholder="Haldi, Mehndi, Reception" className={field} />
            </label>
            <button type="submit" className={primaryBtn}>
              Save gallery
            </button>
            <p className="text-[13px] leading-relaxed text-ink/45">
              Photo uploads need file storage, so for now covers point at files already in{" "}
              <code className="rounded bg-black/30 px-1">public/images/photos</code>.
            </p>
          </form>
        </Card>
      </div>
    </>
  );
}
