"""
Build the Staples print files from the props.

Usage (from the project root):
    python3 print/build.py
    python3 print/build.py --venue "Venue" --date "SAT JUN 25 2005"   # override a ticket field

Every ticket flag is optional; leave them off and the tickets print the prop's own show details.

Output (in print/):
    1-cardstock.pdf     everything on cardstock, one upload, one copy
    2-photo-gloss.pdf   the party-room photograph, for gloss/photo paper
    3-settlement.pdf    optional paper copy of the Articles of Settlement
    4-plain.pdf         the developer's site assessment, on plain paper
    previews/           a JPEG (or PNG) of every page, shown on print/index.html

Needs Google Chrome (headless, for print-to-PDF) and pypdf. Each prop's own
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
    args = ap.parse_args()

    if not os.path.exists(CHROME):
        sys.exit(f"ERROR: Chrome not found at {CHROME}")

    base = serve()
    tickets_q = urlencode({k: v for k, v in vars(args).items() if v})
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
    photo = page("photo/")
    settlement = page("settlement/")
    survey = page("survey/")

    # 1 — cardstock: one upload, one copy, color, single-sided
    w = PdfWriter()
    for p in two_up_invites(invite.pages[0], INVITES):
        w.add_page(p)
    for doc in (deed, badge, tickets, backstory):
        for p in doc.pages:
            w.add_page(p)
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)  # six invites share one set of images
    w.write(os.path.join(OUT, "1-cardstock.pdf"))

    # 2 — the photograph, front only, on gloss
    w = PdfWriter(); w.add_page(photo.pages[0]); w.write(os.path.join(OUT, "2-photo-gloss.pdf"))

    # 3 — optional settlement on plain paper
    w = PdfWriter()
    for p in settlement.pages:
        w.add_page(p)
    w.write(os.path.join(OUT, "3-settlement.pdf"))

    # 4 — the developer's memo, a photocopy, so plain paper
    w = PdfWriter()
    for p in survey.pages:
        w.add_page(p)
    w.write(os.path.join(OUT, "4-plain.pdf"))

    # page previews for print/index.html — clear the old ones first
    os.makedirs(PREVIEWS, exist_ok=True)
    for old in glob.glob(os.path.join(PREVIEWS, "*")):
        if old.endswith((".png", ".jpg", ".json")):
            os.remove(old)
    previews("1-cardstock.pdf", "cardstock")
    previews("2-photo-gloss.pdf", "photo")
    previews("3-settlement.pdf", "settlement")
    previews("4-plain.pdf", "plain")
    manifest = {stem: sorted(os.path.basename(f) for f in glob.glob(os.path.join(PREVIEWS, stem + "-*.*")))
                for stem in ("cardstock", "photo", "settlement", "plain")}
    with open(os.path.join(PREVIEWS, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1)

    counts = {"invite sheets": -(-INVITES // 2), "deed": len(deed.pages), "badge": len(badge.pages),
              "tickets": len(tickets.pages), "backstory": len(backstory.pages)}
    print("1-cardstock.pdf  ", sum(counts.values()), "pages", counts)
    print("2-photo-gloss.pdf ", 1, "page")
    print("3-settlement.pdf  ", len(settlement.pages), "page(s)")
    print("4-plain.pdf       ", len(survey.pages), "page(s)")


if __name__ == "__main__":
    main()
