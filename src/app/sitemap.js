import { services } from "@/lib/services";
import { store } from "@/lib/store";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default async function sitemap() {
  const [galleries, posts] = await Promise.all([store.listGalleries(), store.listPosts()]);

  const staticPages = ["", "/portfolio", "/services", "/films", "/collections", "/studio", "/journal", "/contact"];

  return [
    ...staticPages.map((path) => ({ url: `${BASE}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${BASE}/services/${s.slug}`, changeFrequency: "monthly", priority: 0.9 })),
    ...galleries.map((g) => ({ url: `${BASE}/works/${g.slug}`, changeFrequency: "yearly", priority: 0.6 })),
    ...posts
      .filter((p) => p.status === "published")
      .map((p) => ({ url: `${BASE}/journal/${p.slug}`, lastModified: p.publishedAt, priority: 0.7 })),
  ];
}
