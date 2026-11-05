"""
Build the Staples print files from the props.

Usage (from the project root):
    python3 print/build.py
    python3 print/build.py --venue "Venue" --date "SAT JUN 25 2005"   # override a ticket field
    python3 print/build.py --photo-only                                # just remake photo-4x6.jpg
    python3 print/build.py --combat-only                               # just remake 6-combat.pdf

Every ticket flag is optional; leave them off and the tickets print the prop's own show details.

Output (in print/):
    1-cardstock.pdf     everything on cardstock (Spencer's invitations first, Yobo's two secret cards, then the battle tokens, last), one upload, one copy
    3-deed.pdf          the deed, on its own: cream or parchment cardstock
    4-plain.pdf         plain or ivory paper: the site assessment, the Articles of Settlement, Orlok's ledger
    5-poster.pdf        Spencer's DJ poster, on plain white paper
    6-combat.pdf        the combat cheat sheet, one page per day, on plain paper (the Run of Show's fight cards on paper)
    photo-4x6.jpg       the party-room photograph, full bleed, as a Staples 4x6 photo print (1200x1800, 300dpi)
    previews/           a JPEG (or PNG) of every page, shown on print/index.html

Needs Google Chrome (headless, for print-to-PDF and the photo screenshot), pypdf and ImageMagick. Each prop's own
@media print rules decide its layout, so fix a prop's print CSS, not this file.
"""
import argparse, functools, glob, http.server, json, os, shutil, socket, subprocess, sys, tempfile, threading
from urllib.parse import urlencode

from pypdf import PdfReader, PdfWriter

# ---------------- knobs ----------------
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
INVITES = 6          # five lockers + one spare; two per sheet
PREVIEW_DPI = 110    # sharp on an iPad, still small
PHOTO = (1200, 1800, 300)  # 4x6 in portrait at 300dpi
# ---------------------------------------

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "print")
PREVIEWS = os.path.join(OUT, "previews")


def serve():
    """Serve the repo root on a free port; fetch() and fonts need http://, not file://."""
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    handler = functools.partial(Quiet, directory=ROOT)
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return f"http://127.0.0.1:{port}"


def render(url, dest):
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    "--virtual-time-budget=4000", f"--print-to-pdf={dest}", url],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return PdfReader(dest)


def photo_print(base):
    """Screenshot print/photo-4x6.html at exactly 4x6 in, 300dpi, into print/photo-4x6.jpg,
    plus its gallery preview at previews/photo-1.jpg."""
    w, h, dpi = PHOTO
    magick = shutil.which("magick") or "/opt/homebrew/bin/magick"
    if not os.path.exists(magick):
        sys.exit("ERROR: ImageMagick not found (brew install imagemagick); it bakes the photo's JPG.")
    png = os.path.join(tempfile.mkdtemp(), "photo.png")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--force-device-scale-factor=1", f"--window-size={w},{h}",
                    "--virtual-time-budget=4000", f"--screenshot={png}", f"{base}/print/photo-4x6.html"],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    jpg = os.path.join(OUT, "photo-4x6.jpg")
    # crop/extent pins the size even if Chrome's viewport is off by a scrollbar
    subprocess.run([magick, png, "-gravity", "northwest", "-crop", f"{w}x{h}+0+0", "+repage",
                    "-background", "#f5f2ea", "-extent", f"{w}x{h}", "-strip",
                    "-units", "PixelsPerInch", "-density", str(dpi), "-quality", "93", jpg], check=True)
    os.makedirs(PREVIEWS, exist_ok=True)
    subprocess.run([magick, jpg, "-resize", f"{4 * PREVIEW_DPI}x", "-quality", "82",
                    os.path.join(PREVIEWS, "photo-1.jpg")], check=True)


def write_manifest():
    manifest = {stem: sorted(os.path.basename(f) for f in glob.glob(os.path.join(PREVIEWS, stem + "-*.*")))
                for stem in ("cardstock", "photo", "deed", "plain", "poster", "combat")}
    with open(os.path.join(PREVIEWS, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1)


def previews(pdf_name, stem):
    """Render every page of a print PDF to previews/<stem>-NN.jpg (PNG if ImageMagick is missing)."""
    pdftoppm = shutil.which("pdftoppm") or "/opt/homebrew/bin/pdftoppm"
    if not os.path.exists(pdftoppm):
        print("WARNING: pdftoppm not found (brew install poppler); skipping previews.")
        return
    prefix = os.path.join(PREVIEWS, stem)
    subprocess.run([pdftoppm, "-r", str(PREVIEW_DPI), "-png", os.path.join(OUT, pdf_name), prefix], check=True)
    magick = shutil.which("magick") or "/opt/homebrew/bin/magick"
    if os.path.exists(magick):
        for png in sorted(glob.glob(prefix + "-*.png")):
            subprocess.run([magick, png, "-quality", "82", png[:-4] + ".jpg"], check=True)
            os.remove(png)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    for k in ("band", "tour", "venue", "city", "date", "time"):
        ap.add_argument("--" + k, default="")
    ap.add_argument("--photo-only", action="store_true", help="only remake photo-4x6.jpg and its preview")
    ap.add_argument("--combat-only", action="store_true", help="only remake 6-combat.pdf and its previews")
    args = ap.parse_args()

    if not os.path.exists(CHROME):
        sys.exit(f"ERROR: Chrome not found at {CHROME}")

    base = serve()
    if args.photo_only:
        photo_print(base)
        write_manifest()
        print("photo-4x6.jpg     ", "%dx%d at %ddpi" % PHOTO)
        return
    tickets_q = urlencode({k: v for k, v in vars(args).items() if v and k not in ("photo_only", "combat_only")})
    tmp = tempfile.mkdtemp()

    def page(path, query=""):
        name = path.strip("/").replace("/", "_") or "root"
        return render(f"{base}/{path}{'?' + query if query else ''}", os.path.join(tmp, name + ".pdf"))

    def combat_sheet():
        # 6 — the combat cheat sheet, plain paper: reads run/fights.js, the Run of Show's own fight data
        sheet = page("print/src/combat.html")
        w = PdfWriter()
        for p in sheet.pages:
            w.add_page(p)
        w.write(os.path.join(OUT, "6-combat.pdf"))
        return sheet

    if args.combat_only:
        sheet = combat_sheet()
        os.makedirs(PREVIEWS, exist_ok=True)
        for old in glob.glob(os.path.join(PREVIEWS, "combat-*")):
            os.remove(old)
        previews("6-combat.pdf", "combat")
        write_manifest()
        print("6-combat.pdf      ", len(sheet.pages), "page(s)")
        return

    print("Rendering props...")
    invite = page("print/src/invite.html", urlencode({"n": INVITES}))
    deed = page("print/src/deed.html")
    badge = page("print/src/badge.html")
    tickets = page("print/src/tickets.html", tickets_q)
    backstory = page("backstory/")
    settlement = page("print/src/settlement.html")
    survey = page("survey/")
    ledger = page("ledger/")
    yobo = page("yobo/")
    poster = page("print/src/poster.html")
    tokens = page("print/src/tokens.html")

    # 1 — cardstock: one upload, one copy, color, single-sided
    w = PdfWriter()
    for doc in (invite, badge, tickets, backstory, yobo, tokens):
        for p in doc.pages:
            w.add_page(p)
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)  # six invites share one image
    w.write(os.path.join(OUT, "1-cardstock.pdf"))

    # 3 — the deed on its own, for cream or parchment cardstock
    w = PdfWriter()
    for p in deed.pages:
        w.add_page(p)
    w.write(os.path.join(OUT, "3-deed.pdf"))

    # 4 — plain or ivory paper: the developer's memo (a photocopy), the settlement, Orlok's ledger
    w = PdfWriter()
    for doc in (survey, settlement, ledger):
        for p in doc.pages:
            w.add_page(p)
    w.write(os.path.join(OUT, "4-plain.pdf"))

    # 5 — Spencer's DJ poster, plain white paper
    w = PdfWriter()
    for p in poster.pages:
        w.add_page(p)
    w.write(os.path.join(OUT, "5-poster.pdf"))

    sheet = combat_sheet()

    # page previews for print/index.html — clear the old ones first
    os.makedirs(PREVIEWS, exist_ok=True)
    for old in glob.glob(os.path.join(PREVIEWS, "*")):
        if old.endswith((".png", ".jpg", ".json")):
            os.remove(old)
    previews("1-cardstock.pdf", "cardstock")
    photo_print(base)
    previews("3-deed.pdf", "deed")
    previews("4-plain.pdf", "plain")
    previews("5-poster.pdf", "poster")
    previews("6-combat.pdf", "combat")
    write_manifest()

    counts = {"invite sheets": len(invite.pages), "badge": len(badge.pages),
              "tickets": len(tickets.pages), "backstory": len(backstory.pages), "yobo cards": len(yobo.pages),
              "tokens": len(tokens.pages)}
    print("1-cardstock.pdf  ", sum(counts.values()), "pages", counts)
    print("photo-4x6.jpg     ", "%dx%d at %ddpi" % PHOTO)
    print("3-deed.pdf        ", len(deed.pages), "page(s)")
    print("4-plain.pdf       ", len(survey.pages) + len(settlement.pages) + len(ledger.pages), "pages",
          {"survey": len(survey.pages), "settlement": len(settlement.pages), "ledger": len(ledger.pages)})
    print("5-poster.pdf      ", len(poster.pages), "page(s)")
    print("6-combat.pdf      ", len(sheet.pages), "page(s)")


if __name__ == "__main__":
    main()
