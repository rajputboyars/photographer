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
| `/collections` | Priced tiers, extras, booking process, FAQ |
| `/studio` | About the studio |
| `/contact` | The enquiry form every CTA points at |
| `/works/[slug]` | A single gallery, by category |
| `/admin` | Overview, enquiries, galleries, journal, settings |

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

3. **Connect a database.** The admin runs on demo data held in memory: edits
   show up but vanish on restart, and on serverless hosting each instance keeps
   its own copy. `src/lib/store/index.js` is the single seam — write a Mongo
   store with the same methods and return it when `MONGODB_URI` is set.

4. **Replace the admin sign-in.** One shared password from `ADMIN_PASSWORD`
   (default `demo`) with an HMAC-signed cookie. Fine behind a demo link, not
   for real enquiries — swap `src/lib/admin-auth.js` for per-user accounts
   with hashed passwords.

## Design

`design/` holds the design canvas sources — artboards, layout manifest and the
earlier theme explorations kept for reference.
