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

## Before launch

1. **Replace the placeholder text.** Everything in `[square brackets]` — prices,
   phone, city, review quotes, couple and venue names — lives in
   `src/lib/site.js` and `src/data.js`. Nothing there is invented; it is all
   waiting for a real value.

2. **Replace the placeholder photography.** `public/images/placeholder/` holds
   generated stand-in images (soft bokeh, no real people), produced by
   `python3 scripts/generate-placeholders.py`. Drop real photographs in at the
   same filenames, or point `photos` in `src/lib/site.js` and the thumbnails in
   `src/data.js` wherever you like.

3. **Point the enquiry form at a real endpoint.** It currently opens a
   pre-filled mail draft; `src/components/EnquiryForm.jsx` marks where to POST
   instead. Until then, leads depend on the visitor having a mail client.

## Design

`design/` holds the design canvas sources — artboards, layout manifest and the
earlier theme explorations kept for reference.
