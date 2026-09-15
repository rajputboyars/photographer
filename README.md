# Isha Photography

Wedding and event photography website — Next.js App Router, Tailwind, and the
Liquid Glass design (frosted panels floating over a photograph and blurred
colour fields).

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, collections, recent work, about, testimonials |
| `/portfolio` | Filterable galleries |
| `/services` | Index of the six services |
| `/services/[slug]` | One service — what it covers, price, FAQs |
| `/films` | The videography side: cuts, craft, same-day edit |
| `/journal` | Published posts |
| `/journal/[slug]` | A single post |
| `/collections` | Priced tiers, extras, booking process, FAQ |
| `/studio` | About the studio |
| `/contact` | The enquiry form every CTA points at |
| `/works/[slug]` | A single gallery, by category |
| `/admin` | Overview, enquiries, galleries, journal, settings |
| `/admin/galleries/[slug]` | One gallery: categories and the photographs in each |

Sign in to the admin with the password in `ADMIN_PASSWORD` (default `demo`).
Enquiries from the contact form POST to `/api/enquiries` and land in the
admin inbox.

## Before launch

1. **Replace the placeholder text.** Everything in `[square brackets]` — prices,
   phone, city, review quotes, couple and venue names — lives in
   `src/lib/site.js` and `src/data.js`. Nothing there is invented; it is all
   waiting for a real value.

2. **Check the photography.** `public/images/photos/` holds the studio's own
   photographs, cropped to the aspect ratios the layout uses and with the
   watermarked promotional versions left out. Several images repeat across
   sections because only a handful of clean originals existed — swap in more
   as they become available, by dropping files in at the same names or
   pointing `photos` in `src/lib/site.js` and the thumbnails in `src/data.js`
   elsewhere.

3. **Add object storage for uploads.** Photographs uploaded in the admin are
   resized to 2000px and stored on the filesystem (`public/uploads`, gitignored)
   where that is writable, and in memory where it is not — which includes
   Vercel and most serverless hosts, so uploads there vanish on restart.
   `src/lib/storage.js` is the seam: point `saveUpload`/`readUpload` at Vercel
   Blob, S3 or Cloudinary and nothing else changes.

4. **Connect a database.** The admin runs on demo data held in memory: edits
   show up but vanish on restart, and on serverless hosting each instance keeps
   its own copy. `src/lib/store/index.js` is the single seam — write a Mongo
   store with the same methods and return it when `MONGODB_URI` is set.

5. **Replace the admin sign-in.** One shared password from `ADMIN_PASSWORD`
   (default `demo`) with an HMAC-signed cookie. Fine behind a demo link, not
   for real enquiries — swap `src/lib/admin-auth.js` for per-user accounts
   with hashed passwords.

Set `NEXT_PUBLIC_SITE_URL` so `/sitemap.xml` and `/robots.txt` carry the real
domain. The sitemap lists every service, gallery and published post.

## Design

`design/` holds the design canvas sources — artboards, layout manifest and the
earlier theme explorations kept for reference.
