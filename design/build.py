import sys, pathlib
HEAD = pathlib.Path("_head.part").read_text()
NAV  = pathlib.Path("_nav.part").read_text()
FOOT = pathlib.Path("_footer.part").read_text()
NAVKEYS = ["NAV_HOME","NAV_PORTFOLIO","NAV_SERVICES","NAV_ABOUT"]

def backdrop(img, height):
    blobs = []
    specs = [(-180, 120, 620, "rgba(92,132,255,0.5)", "left"),
             (-140, 460, 560, "rgba(226,114,196,0.4)", "right"),
             (300, 1200, 700, "rgba(64,196,208,0.3)", "left"),
             (-200, 1900, 640, "rgba(126,110,255,0.34)", "right"),
             (200, 2600, 680, "rgba(64,196,208,0.26)", "left"),
             (-160, 3300, 600, "rgba(226,114,196,0.3)", "right")]
    for x, y, size, color, side in specs:
        if y > height + 200:
            continue
        blobs.append(f'<div class="blob" style="{side}: {x}px; top: {y}px; width: {size}px; height: {size}px; '
                     f'background: {color}; filter: blur(130px);"></div>')
    return (f'<img src="{img}" alt="" style="position: absolute; left: 0; top: 0; width: 100%; height: 760px; '
            f'object-fit: cover; opacity: 0.5;">\n    '
            + "\n    ".join(blobs)
            + '\n    <div style="position: absolute; left: 0; top: 560px; right: 0; height: 360px; '
              'background: linear-gradient(180deg, rgba(10,15,28,0) 0%, #0A0F1C 72%);"></div>')

def build(out, active, body, img="hero-d.jpg", height=2600, width=1440):
    nav = NAV
    for k in NAVKEYS:
        nav = nav.replace(k, "glass-sm" if k == active else "")
    page = f'''<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
{HEAD}
<div style="width: {width}px; background: #0A0F1C; position: relative; overflow: hidden;">
    {backdrop(img, height)}
  <div style="position: relative;">
{nav}{body}{FOOT}
  </div>
</div>
</x-dc>
</body>
</html>
'''
    pathlib.Path(out).write_text(page)
    print("built", out, len(page), "bytes")

if __name__ == "__main__":
    out, active, bodyfile, img, height = sys.argv[1:6]
    build(out, active, pathlib.Path(bodyfile).read_text(), img, int(height))
