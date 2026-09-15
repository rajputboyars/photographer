import Image from "next/image";
import Icon from "@/components/Icon";
import { store } from "@/lib/store";
import { deleteGallery, saveGallery } from "@/app/(admin)/admin/actions";
import { Card, EmptyState, PageTitle, field, label, primaryBtn } from "@/components/admin/AdminChrome";
import PhotoUploader from "@/components/admin/PhotoUploader";
import { storageIsPersistent } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function GalleriesPage() {
  const [galleries, uploads, persistent] = await Promise.all([
    store.listGalleries(),
    store.listUploads(),
    storageIsPersistent(),
  ]);

  return (
    <>
      <PageTitle title="Galleries" subtitle="What shows on the portfolio, and what each cover looks like." />

      <Card className="mb-5 p-6">
        <div className="flex items-center gap-2.5 pb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05]">
            <Icon name="images" className="h-4 w-4 text-accent" />
          </span>
          <h2 className="text-[17px]">Photographs</h2>
        </div>
        <PhotoUploader uploads={uploads} persistent={persistent} targetInputId="gallery-cover" />
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {galleries.map((g) => (
            <Card key={g.slug} className="group overflow-hidden">
              <div className="relative h-44">
                <Image src={g.thumbnail} alt="" fill sizes="(max-width: 1024px) 50vw, 25vw" unoptimized={g.thumbnail.startsWith("/api/")} className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ground/90 via-ground/10 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[12px] backdrop-blur">
                  {g.type}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <span className="text-[15px]">{g.name}</span>
                <span className="text-[13px] text-ink/40">/works/{g.slug}</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {g.categories.length ? (
                    g.categories.map((c) => (
                      <span key={c} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[12px] text-ink/60">
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-[12px] text-ink/35">No categories</span>
                  )}
                </div>
                <form action={deleteGallery} className="pt-2">
                  <input type="hidden" name="slug" value={g.slug} />
                  <button type="submit" className="inline-flex items-center gap-1.5 text-[13px] text-rose-300/70 transition hover:text-rose-200">
                    <Icon name="trash" className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </form>
              </div>
            </Card>
          ))}
          {galleries.length === 0 ? (
            <Card className="sm:col-span-2">
              <EmptyState icon="images" title="No galleries yet">
                Add one with the form — it appears on the portfolio straight away.
              </EmptyState>
            </Card>
          ) : null}
        </div>

        <Card className="h-fit p-6">
          <div className="flex items-center gap-2.5 pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.05]">
              <Icon name="plus" className="h-4 w-4 text-accent" />
            </span>
            <h2 className="text-[17px]">Add or update</h2>
          </div>
          <form action={saveGallery} className="flex flex-col gap-4">
            <label className={label}>
              Couple or client
              <input name="name" required placeholder="Priya &amp; Arjun" className={field} />
            </label>
            <label className={label}>
              Slug
              <input name="slug" required placeholder="priya-arjun" pattern="[a-z0-9]+(-[a-z0-9]+)*" className={field} />
            </label>
            <label className={label}>
              Type
              <input name="type" required placeholder="Wedding" className={field} />
            </label>
            <label className={label}>
              Cover image path
              <input
                id="gallery-cover"
                name="thumbnail"
                required
                defaultValue={uploads[0]?.url ?? "/images/photos/wedding-ceremony.jpg"}
                className={field}
              />
            </label>
            <label className={label}>
              Categories, comma separated
              <input name="categories" placeholder="Haldi, Mehndi, Reception" className={field} />
            </label>
            <button type="submit" className={primaryBtn}>
              Save gallery
            </button>
            <p className="text-[13px] leading-relaxed text-ink/40">
              Upload a photograph above and copy its path, or point at any file in{" "}
              <code className="rounded bg-black/30 px-1">public/images</code>.
            </p>
          </form>
        </Card>
      </div>
    </>
  );
}
