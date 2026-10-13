"""
Builds the TechNest Pharma ERP case-study images from the client's user-manual screenshots.

  python3 design/pharma-erp/build.py

- Tour images: cropped, supplier names blurred (the supplier directory is the client's data). The project page
  already wraps them in a browser frame, so they carry no frame of their own.
- Banner: a marketing-style composite (dashboard + floating comparison card + phone) on a brand gradient.

Blur boxes are written in the coordinates of the preview each box was measured on (see `D`, `P` scale factors).
Upload the results from design/pharma-erp/out/ in the admin panel (Media: banner; In-depth -> Product Tour: screens).
Needs Pillow. Never publish an output without looking at it: the blur boxes are hand-measured.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageChops

SRC = Path("/Users/sabbirahmad/Projects/PharmaSourcingERP/docs-user-manual/screens")
OUT = Path(__file__).parent / "out"
OUT.mkdir(exist_ok=True)

D = 1.08      # 2000px-wide previews of the 2160x1350 screens
P = 1.5429    # 1400px-wide previews of the 2160x1350 screens
M = 1.618     # 1641px-wide preview of 18-quotation-review


def load(name):
    return Image.open(SRC / name).convert("RGB")


def blur(img, boxes, scale):
    """Heavy blur + a light wash over each box, so names are unreadable and the page still looks intact."""
    for x0, y0, x1, y1 in boxes:
        b = tuple(int(v * scale) for v in (x0, y0, x1, y1))
        region = img.crop(b).filter(ImageFilter.GaussianBlur(14))
        wash = Image.new("RGB", region.size, (238, 241, 245))
        img.paste(Image.blend(region, wash, 0.35), b[:2])
    return img


def save(img, name, width=2000, quality=88):
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img.save(OUT / name, "WEBP", quality=quality, method=6)
    print("wrote", name, img.size)
    return img


# ---------------------------------------------------------------- tour images
tour = {}

tour["01-tender-notice-review"] = load("10-notice-detail.jpg")

im = load("12-tender-detail.jpg")
tour["02-tender-shortlist"] = blur(im, [(592, 557, 820, 575), (592, 634, 820, 652), (592, 721, 820, 739), (592, 799, 820, 817)], P)

im = load("14-enquiry-detail.jpg")
tour["03-supplier-enquiry"] = blur(im, [(430, 100, 1160, 123), (230, 146, 955, 218)], P)

im = load("18-quotation-review.jpg")
im = blur(im, [(47, 88, 1385, 112), (62, 365, 715, 420), (62, 982, 640, 1065)], M)
tour["04-quotation-review"] = im.crop((int(26 * M), int(26 * M), int(1614 * M), int(1122 * M)))

im = load("19-comparison.jpg")
comparison = blur(im, [(415, 720, 640, 755), (415, 1097, 640, 1130), (415, 1188, 760, 1250)], D)
tour["05-quotation-comparison"] = comparison

im = load("22-po-detail.jpg")
tour["06-purchase-order"] = blur(im, [(1150, 505, 1360, 552)], P)

tour["07-finance-overview"] = load("20-finance-overview.jpg").crop((0, 0, 2160, 1150))

tour["08-activity-audit-log"] = load("35-activity.jpg")

for name, img in tour.items():
    save(img, f"{name}.webp")


# ---------------------------------------------------------------- banner composite
W, H = 2400, 1500


def gradient():
    top, bottom = (11, 66, 52), (30, 120, 84)          # brand greens
    g = Image.new("RGB", (W, H))
    px = g.load()
    for y in range(H):
        for x in range(W):
            t = (x / W * 0.6 + y / H * 0.4)
            px[x, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    # soft amber glow, bottom-right
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    ImageDraw.Draw(glow).ellipse((1500, 800, 2700, 1900), fill=(70, 55, 10))
    glow = glow.filter(ImageFilter.GaussianBlur(220))
    return ImageChops.add(g, glow)


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, img.width - 1, img.height - 1), radius, fill=255)
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def shadow(canvas, layer, xy, blur_r=40, offset=(0, 30), opacity=120):
    s = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    a = layer.split()[3].point(lambda v: v * opacity // 255)
    sh = Image.new("RGBA", layer.size, (0, 0, 0, 255))
    sh.putalpha(a)
    s.paste(sh, (xy[0] + offset[0], xy[1] + offset[1]), sh)
    s = s.filter(ImageFilter.GaussianBlur(blur_r))
    canvas.alpha_composite(s)
    canvas.alpha_composite(layer, xy)


canvas = gradient().convert("RGBA")

dash = load("02-dashboard.jpg").crop((0, 0, 2160, 1190))
dash = rounded(dash.resize((1560, round(1190 * 1560 / 2160)), Image.LANCZOS), 26)
shadow(canvas, dash, (110, 130))

card = comparison.crop((int(333 * D), int(893 * D), int(1955 * D), 1350))
card = rounded(card.resize((1180, round(card.height * 1180 / card.width)), Image.LANCZOS), 22)
shadow(canvas, card, (250, 880), offset=(0, 24))

phone_src = load("39-mobile-dashboard.jpg")
ph_h = 1130
ph = phone_src.resize((round(phone_src.width * ph_h / phone_src.height), ph_h), Image.LANCZOS)
ph = ph.crop((0, 0, ph.width, ph_h))
bezel = 16
body = Image.new("RGBA", (ph.width + bezel * 2, ph.height + bezel * 2), (14, 18, 22, 255))
body = rounded(body, 74)
screen = rounded(ph, 60)
body.alpha_composite(screen, (bezel, bezel))
shadow(canvas, body, (1790, 190), blur_r=50, offset=(0, 40), opacity=150)

save(canvas.convert("RGB"), "00-banner.webp", width=2400, quality=90)
