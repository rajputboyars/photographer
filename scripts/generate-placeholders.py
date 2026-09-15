#!/usr/bin/env python3
"""Generate the placeholder photography used across the site.

These stand in for the studio's real photographs. They are deliberately
abstract — soft bokeh in the site's palette — so the layout reads correctly
without pretending to be someone's wedding. Replace them with real images
(same filenames, or edit `photos` in src/lib/site.js) before launch.

    python3 scripts/generate-placeholders.py
"""

import math
import random
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent.parent / "public" / "images" / "placeholder"

# name: (width, height, top colour, bottom colour, bokeh colours)
SCENES = {
    "wedding-ceremony":  (1600, 1100, (38, 22, 26), (96, 44, 38), [(255, 196, 120), (255, 150, 90), (255, 232, 190)]),
    "pre-wedding":       (1600, 1100, (28, 34, 58), (132, 96, 74), [(255, 214, 158), (196, 176, 255), (255, 240, 214)]),
    "haldi":             (1600, 1100, (58, 44, 14), (150, 116, 30), [(255, 226, 120), (255, 198, 74), (255, 246, 206)]),
    "mehndi":            (1600, 1100, (22, 40, 32), (58, 104, 76), [(184, 255, 206), (120, 214, 168), (240, 255, 244)]),
    "sangeet":           (1600, 1100, (30, 18, 48), (110, 46, 118), [(226, 144, 255), (142, 152, 255), (255, 214, 246)]),
    "reception":         (1600, 1100, (16, 22, 42), (54, 74, 130), [(156, 199, 255), (120, 232, 226), (236, 246, 255)]),
    "birthday":          (1600, 1100, (44, 20, 34), (142, 62, 88), [(255, 168, 196), (255, 214, 150), (255, 238, 244)]),
    "corporate":         (1600, 1100, (18, 24, 34), (58, 76, 98), [(168, 200, 232), (214, 226, 240), (140, 172, 208)]),
    "portraits":         (1600, 1100, (34, 28, 26), (108, 88, 74), [(255, 224, 186), (236, 200, 168), (255, 244, 226)]),
    "celebration":       (1600, 1100, (26, 20, 40), (96, 64, 120), [(214, 176, 255), (255, 198, 214), (244, 232, 255)]),
    "hero-wide":         (2000, 1200, (14, 18, 34), (86, 58, 92), [(156, 199, 255), (255, 186, 214), (255, 226, 176)]),
    "portrait-tall":     (1100, 1500, (24, 26, 40), (110, 84, 86), [(255, 206, 172), (186, 196, 255), (255, 236, 216)]),
}


def vertical_gradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", (1, h))
    px = base.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        # ease so the midtones sit lower in the frame, like a lit backdrop
        t = t ** 0.85
        px[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    return base.resize(size, Image.BILINEAR)


def add_bokeh(img, colours, rng):
    """Additive bokeh discs: bright core, brighter rim, soft edge."""
    w, h = img.size
    scale = 2  # draw large, shrink down — keeps the discs clean
    layer = Image.new("RGB", (w * scale, h * scale), (0, 0, 0))
    draw = ImageDraw.Draw(layer)

    for _ in range(rng.randint(16, 24)):
        r = int(rng.triangular(w * 0.03, w * 0.14, w * 0.06)) * scale
        x = rng.randint(-r // 2, w * scale + r // 2)
        y = int(abs(rng.gauss(h * scale * 0.4, h * scale * 0.34)))
        colour = rng.choice(colours)
        weight = rng.triangular(0.18, 1.0, 0.45)

        core = tuple(round(c * weight * 0.72) for c in colour)
        rim = tuple(round(min(255, c * weight * 1.15)) for c in colour)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=core, outline=rim, width=max(2, r // 9))

    layer = layer.resize((w, h), Image.LANCZOS)
    layer = layer.filter(ImageFilter.GaussianBlur(radius=w * 0.006))
    return ImageChops.screen(img, layer)


def vignette(img):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse([-w * 0.25, -h * 0.35, w * 1.25, h * 1.35], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=min(w, h) * 0.18))
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.composite(img, dark, mask)


def grain(img, rng, amount=7):
    w, h = img.size
    noise = Image.effect_noise((w, h), amount).convert("L")
    return Image.blend(img, Image.merge("RGB", (noise, noise, noise)), 0.045)


def build(name, spec, seed):
    w, h, top, bottom, colours = spec
    rng = random.Random(seed)

    img = vertical_gradient((w, h), top, bottom)
    img = add_bokeh(img, colours, rng)
    img = img.filter(ImageFilter.GaussianBlur(radius=max(w, h) * 0.0015))
    img = vignette(img)
    img = grain(img, rng)

    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{name}.jpg"
    img.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    return path, path.stat().st_size


if __name__ == "__main__":
    total = 0
    for i, (name, spec) in enumerate(SCENES.items()):
        path, size = build(name, spec, seed=1000 + i * 17)
        total += size
        print(f"{path.name:22} {spec[0]}x{spec[1]}  {size // 1024:4d} KB")
    print(f"{'total':22} {'':12} {total // 1024:4d} KB")
