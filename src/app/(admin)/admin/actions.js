"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, checkPassword, createSession } from "@/lib/admin-auth";
import { store } from "@/lib/store";

export async function signIn(_state, formData) {
  if (!checkPassword(formData.get("password"))) {
    return { error: "That password is not right." };
  }

  const session = await createSession();
  (await cookies()).set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });

  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function setLeadStatus(formData) {
  await store.setLeadStatus(formData.get("id"), formData.get("status"));
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteLead(formData) {
  await store.deleteLead(formData.get("id"));
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  redirect("/admin/enquiries");
}

export async function savePost(formData) {
  const id = formData.get("id");
  await store.savePost({
    ...(id ? { id } : {}),
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    cover: formData.get("cover"),
    status: formData.get("status"),
    publishedAt: formData.get("status") === "published" ? new Date().toISOString() : null,
  });
  revalidatePath("/admin/journal");
  redirect("/admin/journal");
}

export async function deletePost(formData) {
  await store.deletePost(formData.get("id"));
  revalidatePath("/admin/journal");
}

export async function saveGallery(formData) {
  const categories = String(formData.get("categories") || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  await store.saveGallery({
    name: formData.get("name"),
    slug: formData.get("slug"),
    type: formData.get("type"),
    thumbnail: formData.get("thumbnail"),
    categories,
  });
  revalidatePath("/admin/galleries");
  redirect("/admin/galleries");
}

export async function deleteGallery(formData) {
  await store.deleteGallery(formData.get("slug"));
  revalidatePath("/admin/galleries");
}

export async function saveSettings(formData) {
  await store.saveSettings({
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    city: formData.get("city"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    replyHours: formData.get("replyHours"),
    datesLeft: formData.get("datesLeft"),
  });
  revalidatePath("/admin/settings");
}

export async function saveCollection(formData) {
  await store.saveCollection({
    id: formData.get("id"),
    name: formData.get("name"),
    price: formData.get("price"),
    blurb: formData.get("blurb"),
  });
  revalidatePath("/admin/settings");
}

export async function addCategory(formData) {
  const slug = formData.get("slug");
  await store.addGalleryCategory(slug, formData.get("category"));
  revalidatePath(`/admin/galleries/${slug}`);
  revalidatePath("/admin/galleries");
}

export async function removeCategory(formData) {
  const slug = formData.get("slug");
  await store.removeGalleryCategory(slug, formData.get("category"));
  revalidatePath(`/admin/galleries/${slug}`);
  revalidatePath("/admin/galleries");
}

/** Attach photographs already uploaded via /api/uploads to one category. */
export async function attachPhotos({ slug, category, photos }) {
  if (!slug || !category || !Array.isArray(photos) || photos.length === 0) {
    return { error: "Nothing to attach." };
  }

  await store.addGalleryCards(
    slug,
    category,
    photos.map((photo) => ({ thumbnail: photo.url, title: photo.title }))
  );

  revalidatePath(`/admin/galleries/${slug}`);
  revalidatePath("/admin/galleries");
  revalidatePath(`/works/${slug}`);
  revalidatePath("/portfolio");
  return { ok: true };
}

export async function removePhoto(formData) {
  const slug = formData.get("slug");
  await store.removeGalleryCard(slug, formData.get("category"), formData.get("cardId"));
  revalidatePath(`/admin/galleries/${slug}`);
  revalidatePath(`/works/${slug}`);
}

export async function updateGalleryDetails(formData) {
  const slug = formData.get("slug");
  const existing = await store.getGallery(slug);
  if (!existing) return;

  await store.saveGallery({
    ...existing,
    name: formData.get("name") || existing.name,
    type: formData.get("type") || existing.type,
    thumbnail: formData.get("thumbnail") || existing.thumbnail,
  });

  revalidatePath(`/admin/galleries/${slug}`);
  revalidatePath("/admin/galleries");
  revalidatePath(`/works/${slug}`);
  revalidatePath("/portfolio");
}
