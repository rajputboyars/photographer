import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { store } from "@/lib/store";
import { addCategory, removeCategory, removePhoto, updateGalleryDetails } from "@/app/(admin)/admin/actions";
import CategoryPhotos from "@/components/admin/CategoryPhotos";
import { Card, EmptyState, field, label, primaryBtn } from "@/components/admin/AdminChrome";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const gallery = await store.getGallery(slug);
  return { title: gallery ? `${gallery.name} — galleries` : "Gallery not found" };
}

export default async function GalleryEditPage({ params }) {
  const { slug } = await params;
  const gallery = await store.getGallery(slug);
  if (!gallery) notFound();

  const categories = gallery.categories ?? [];
  const total = Object.values(gallery.cards ?? {}).flat().length;

  return (
    <>
      <Link href="/admin/galleries" className="mb-6 inline-flex items-center gap-2 text-[13px] text-ink/55 hover:text-white">
        <Icon name="back" className="h-4 w-4" />
        All galleries
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4 pb-7">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[1.75rem] font-light tracking-tight">{gallery.name}</h1>
          <p className="text-sm text-ink/55">
            {gallery.type} · {categories.length} categories · {total} photographs
          </p>
        </div>
        <Link
          href={`/works/${gallery.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-[14px] text-ink/80 transition hover:border-white/35 hover:text-white"
        >
          <Icon name="external" className="h-4 w-4" />
          View on the site
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          {categories.map((category) => {
            const cards = gallery.cards?.[category] ?? [];
            return (
              <Card key={category} className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
                  <div className="flex items-baseline gap-2.5">
                    <h2 className="text-[17px]">{category}</h2>
                    <span className="text-[13px] text-ink/40">{cards.length}</span>
                  </div>
                  <form action={removeCategory}>
                    <input type="hidden" name="slug" value={gallery.slug} />
                    <input type="hidden" name="category" value={category} />
                    <button type="submit" className="inline-flex items-center gap-1.5 text-[13px] text-rose-300/70 transition hover:text-rose-200">
                      <Icon name="trash" className="h-3.5 w-3.5" />
                      {cards.length ? `Delete category and ${cards.length} photograph${cards.length === 1 ? "" : "s"}` : "Delete category"}
                    </button>
                  </form>
                </div>

                {cards.length ? (
                  <div className="grid grid-cols-3 gap-3 pb-4 sm:grid-cols-4">
                    {cards.map((card) => (
                      <div key={card.id} className="group relative aspect-square overflow-hidden rounded-xl border border-white/12">
                        <Image
                          src={card.thumbnail}
                          alt={card.title}
                          fill
                          sizes="160px"
                          unoptimized={card.thumbnail.startsWith("/api/")}
                          className="object-cover"
                        />
                        <form
                          action={removePhoto}
                          className="absolute inset-0 flex items-center justify-center bg-ground/70 opacity-0 transition group-hover:opacity-100"
                        >
                          <input type="hidden" name="slug" value={gallery.slug} />
                          <input type="hidden" name="category" value={category} />
                          <input type="hidden" name="cardId" value={card.id} />
                          <button type="submit" className="inline-flex items-center gap-1.5 text-[12px] text-rose-200">
                            <Icon name="trash" className="h-3.5 w-3.5" />
                            Remove photo
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="pb-4 text-[13px] text-ink/40">Nothing in this category yet.</p>
                )}

                <CategoryPhotos slug={gallery.slug} category={category} />
              </Card>
            );
          })}

          {categories.length === 0 ? (
            <Card>
              <EmptyState icon="images" title="No categories yet">
                Add one — haldi, mehndi, reception — then upload photographs into it.
              </EmptyState>
            </Card>
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          <Card className="p-6">
            <h2 className="pb-4 text-[17px]">Add a category</h2>
            <form action={addCategory} className="flex flex-col gap-3">
              <input type="hidden" name="slug" value={gallery.slug} />
              <input name="category" required placeholder="Reception" className={field} />
              <button type="submit" className={primaryBtn}>
                Add category
              </button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="pb-4 text-[17px]">Gallery details</h2>
            <form action={updateGalleryDetails} className="flex flex-col gap-4">
              <input type="hidden" name="slug" value={gallery.slug} />
              <label className={label}>
                Couple or client
                <input name="name" defaultValue={gallery.name} className={field} />
              </label>
              <label className={label}>
                Type
                <input name="type" defaultValue={gallery.type} className={field} />
              </label>
              <label className={label}>
                Cover image path
                <input name="thumbnail" defaultValue={gallery.thumbnail} className={field} />
              </label>
              <div className="relative h-28 overflow-hidden rounded-xl border border-white/12">
                <Image
                  src={gallery.thumbnail}
                  alt=""
                  fill
                  sizes="320px"
                  unoptimized={gallery.thumbnail.startsWith("/api/")}
                  className="object-cover"
                />
              </div>
              <button type="submit" className={primaryBtn}>
                Save details
              </button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
