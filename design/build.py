import sys, pathlib
HEAD = pathlib.Path("_head.part").read_text()
NAV  = pathlib.Path("_nav.part").read_text()
FOOT = pathlib.Path("_footer.part").read_text()
NAVKEYS = ["NAV_HOME","NAV_PORTFOLIO","NAV_SERVICES","NAV_ABOUT"]

def build(out, active, body, width=1440):
    nav = NAV
    for k in NAVKEYS:
        nav = nav.replace(k, "nav-on" if k == active else "")
    page = f'''<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
{HEAD}
<div style="width: {width}px; background: #FBF7EF; overflow: hidden;">
{nav}{body}{FOOT}
</div>
</x-dc>
</body>
</html>
'''
    pathlib.Path(out).write_text(page)
    print("built", out, len(page), "bytes")

if __name__ == "__main__":
    out, active, bodyfile = sys.argv[1], sys.argv[2], sys.argv[3]
    build(out, active, pathlib.Path(bodyfile).read_text())
