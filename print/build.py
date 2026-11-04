"""
Build the Staples print files from the props.

Usage (from the project root):
    python3 print/build.py
    python3 print/build.py --venue "Venue" --date "SAT JUN 25 2005"   # override a ticket field
    python3 print/build.py --photo-only                                # just remake photo-4x6.jpg

Every ticket flag is optional; leave them off and the tickets print the prop's own show details.

Output (in print/):
    1-cardstock.pdf     everything on cardstock (Yobo's two secret cards last), one upload, one copy
    3-settlement.pdf    optional paper copy of the Articles of Settlement
    4-plain.pdf         plain paper: the site assessment, Orlok's ledger
    photo-4x6.jpg       the party-room photograph as a Staples 4x6 photo print (1200x1800, 300dpi)
    previews/           a JPEG (or PNG) of every page, shown on print/index.html

Needs Google Chrome (headless, for print-to-PDF and the photo screenshot), pypdf and ImageMagick. Each prop's own
@media print rules decide its layout, so fix a prop's print CSS, not this file.
"""
import argparse, functools, glob, http.server, json, os, shutil, socket, subprocess, sys, tempfile, threading
from urllib.parse import urlencode

from pypdf import PdfReader, PdfWriter, Transformation, PageObject

# ---------------- knobs ----------------
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
INVITES = 6          # five lockers + one spare; two per sheet
LETTER = (612, 792)  # points
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
                for stem in ("cardstock", "photo", "settlement", "plain")}
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


def two_up_invites(invite_page, count):
    """The invite is a 5x7 page. Turn it sideways and stack two per letter sheet;
    the card is black to the edge, so its own border is the cut line."""
    w = float(invite_page.mediabox.width)    # 360
    h = float(invite_page.mediabox.height)   # 504
    x = (LETTER[0] - h) / 2
    gap = 18
    y0 = (LETTER[1] - 2 * w - gap) / 2
    sheets = []
    for i in range(0, count, 2):
        sheet = PageObject.create_blank_page(width=LETTER[0], height=LETTER[1])
        for slot in range(min(2, count - i)):
            y = y0 + slot * (w + gap)
            # rotate 90deg CCW about the origin, then move into the slot
            sheet.merge_transformed_page(invite_page, Transformation().rotate(90).translate(x + h, y))
        sheets.append(sheet)
    return sheets


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    for k in ("band", "tour", "venue", "city", "date", "time"):
        ap.add_argument("--" + k, default="")
    ap.add_argument("--photo-only", action="store_true", help="only remake photo-4x6.jpg and its preview")
    args = ap.parse_args()

    if not os.path.exists(CHROME):
        sys.exit(f"ERROR: Chrome not found at {CHROME}")

    base = serve()
    if args.photo_only:
        photo_print(base)
        write_manifest()
        print("photo-4x6.jpg     ", "%dx%d at %ddpi" % PHOTO)
        return
    tickets_q = urlencode({k: v for k, v in vars(args).items() if v and k != "photo_only"})
    tmp = tempfile.mkdtemp()

    def page(path, query=""):
        name = path.strip("/").replace("/", "_") or "root"
        return render(f"{base}/{path}{'?' + query if query else ''}", os.path.join(tmp, name + ".pdf"))

    print("Rendering props...")
    invite = page("invite/")
    deed = page("deed/")
    badge = page("badge/")
    tickets = page("tickets/", tickets_q)
    backstory = page("backstory/")
    settlement = page("settlement/")
    survey = page("survey/")
    ledger = page("ledger/")
    yobo = page("yobo/")

    # 1 — cardstock: one upload, one copy, color, single-sided
    w = PdfWriter()
    for p in two_up_invites(invite.pages[0], INVITES):
        w.add_page(p)
    for doc in (deed, badge, tickets, backstory, yobo):
        for p in doc.pages:
            w.add_page(p)
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)  # six invites share one set of images
    w.write(os.path.join(OUT, "1-cardstock.pdf"))

    # 3 — optional settlement on plain paper
    w = PdfWriter()
    for p in settlement.pages:
        w.add_page(p)
    w.write(os.path.join(OUT, "3-settlement.pdf"))

    # 4 — plain paper: the developer's memo (a photocopy), Orlok's ledger
    w = PdfWriter()
    for doc in (survey, ledger):
        for p in doc.pages:
            w.add_page(p)
    w.write(os.path.join(OUT, "4-plain.pdf"))

    # page previews for print/index.html — clear the old ones first
    os.makedirs(PREVIEWS, exist_ok=True)
    for old in glob.glob(os.path.join(PREVIEWS, "*")):
        if old.endswith((".png", ".jpg", ".json")):
            os.remove(old)
    previews("1-cardstock.pdf", "cardstock")
    photo_print(base)
    previews("3-settlement.pdf", "settlement")
    previews("4-plain.pdf", "plain")
    write_manifest()

    counts = {"invite sheets": -(-INVITES // 2), "deed": len(deed.pages), "badge": len(badge.pages),
              "tickets": len(tickets.pages), "backstory": len(backstory.pages), "yobo cards": len(yobo.pages)}
    print("1-cardstock.pdf  ", sum(counts.values()), "pages", counts)
    print("photo-4x6.jpg     ", "%dx%d at %ddpi" % PHOTO)
    print("3-settlement.pdf  ", len(settlement.pages), "page(s)")
    print("4-plain.pdf       ", len(survey.pages) + len(ledger.pages), "pages",
          {"survey": len(survey.pages), "ledger": len(ledger.pages)})


if __name__ == "__main__":
    main()
