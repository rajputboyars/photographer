# Website design canvas

Source files for the Isha Photography website design, published as a canvas at
https://claude.ai/artifact/76nkQuQ4EE4qZ3eZRCq2vk

- `*.dc.html` — one file per artboard (Home, Portfolio, Services, About, Contact,
  mobile Home, style sheet, and two alternate hero directions).
- `canvas.json` — artboard positions, canvas pages and the launch view.
- `img/` — photographs from `public/images/home-section`, downsampled for the canvas.

The published `isha-photography-website.html` is generated from these files and is
not committed. Anything in [square brackets] is a placeholder for a real fact
(prices, phone number, city, review quotes) and must be filled in before launch.

## Rebuilding the pages

The five desktop pages share a header, nav and footer, kept in `_head.part`,
`_nav.part` and `_footer.part`. `build.py <out.dc.html> <NAV_KEY> <body.part>`
stitches those around a page body. The mobile screen, style sheet and theme
samples are standalone files.

Theme in use: **Ink & Petal** (theme 10). Themes 1–9 are kept as reference
artboards on their own canvas pages.
