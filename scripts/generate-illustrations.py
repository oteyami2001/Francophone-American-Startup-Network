"""Generate FASN illustrations: python3 scripts/generate-illustrations.py public/images/illustrations"""
"""Generate FASN's original flat SVG illustrations (navy/teal brand palette)."""
import math, os, sys

OUT = sys.argv[1]
NAVY, NAVY2, NAVY3 = "#0B2D5B", "#1D4F8F", "#3B6CB0"
TEAL, TEAL2, TEAL_L = "#00C2A8", "#00A38D", "#D5F6F1"
SKY, SKY2 = "#E3EBF6", "#F2F6FB"
WARM = "#FFB84D"
SKINS = ["#8D5524", "#C68642", "#5C3A21", "#E0AC69", "#A0662F", "#F1C27D"]


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" '
            f'aria-labelledby="t"><title id="t">{title}</title>{body}</svg>\n')


def person(x, y, s=1.0, skin=SKINS[0], shirt=NAVY, hair=NAVY, wave=False, laptop=False):
    """Standing bust/figure anchored at (x, y) = feet-ish baseline of torso."""
    g = [f'<g transform="translate({x} {y}) scale({s})">']
    # torso
    g.append(f'<path d="M-34 0 C-34 -46 -22 -62 0 -62 C22 -62 34 -46 34 0 Z" fill="{shirt}"/>')
    # collar
    g.append(f'<path d="M-9 -61 L0 -48 L9 -61 Z" fill="#fff" opacity=".85"/>')
    # neck + head
    g.append(f'<rect x="-6" y="-72" width="12" height="12" rx="4" fill="{skin}"/>')
    g.append(f'<circle cx="0" cy="-88" r="20" fill="{skin}"/>')
    g.append(f'<path d="M-20 -90 C-20 -112 20 -114 20 -92 C12 -100 -6 -102 -20 -90 Z" fill="{hair}"/>')
    if wave:
        g.append(f'<path d="M26 -40 C40 -60 44 -78 40 -96" stroke="{shirt}" stroke-width="13" stroke-linecap="round" fill="none"/>')
        g.append(f'<circle cx="40" cy="-100" r="8" fill="{skin}"/>')
    if laptop:
        g.append(f'<rect x="-30" y="-30" width="60" height="36" rx="4" fill="{SKY}" stroke="{NAVY}" stroke-width="3"/>')
        g.append(f'<circle cx="0" cy="-12" r="5" fill="{TEAL}"/>')
    g.append('</g>')
    return "".join(g)


def globe(cx, cy, r, ocean=NAVY2, land="#fff", lines=True):
    g = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{ocean}"/>']
    # stylized continents (abstract blobs, Americas left / Africa-Europe right)
    k = r / 100
    def p(d):
        return f'<path transform="translate({cx} {cy}) scale({k})" d="{d}" fill="{land}" opacity=".92"/>'
    g.append(p("M-62 -58 C-40 -76 -10 -70 -14 -52 C-18 -38 -36 -40 -40 -22 C-44 -8 -30 0 -36 10 C-46 22 -66 4 -72 -16 C-76 -32 -74 -48 -62 -58 Z"))
    g.append(p("M-30 18 C-14 14 -6 30 -12 48 C-18 66 -28 84 -36 80 C-42 66 -46 44 -40 30 C-38 22 -36 20 -30 18 Z"))
    g.append(p("M20 -60 C36 -66 54 -60 52 -48 C50 -40 38 -40 30 -44 C22 -48 14 -54 20 -60 Z"))
    g.append(p("M18 -30 C40 -36 62 -26 62 -6 C62 14 50 26 44 46 C40 60 30 62 26 48 C22 32 12 22 10 6 C8 -10 6 -26 18 -30 Z"))
    if lines:
        g.append(f'<g fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="{max(1, r/80):.1f}">')
        g.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{r*0.45}" ry="{r}"/><ellipse cx="{cx}" cy="{cy}" rx="{r}" ry="{r*0.35}"/>')
        g.append(f'<line x1="{cx-r}" y1="{cy}" x2="{cx+r}" y2="{cy}"/><line x1="{cx}" y1="{cy-r}" x2="{cx}" y2="{cy+r}"/></g>')
    g.append(f'<circle cx="{cx-r*0.3}" cy="{cy-r*0.35}" r="{r*0.9}" fill="#fff" opacity=".06"/>')
    return "".join(g)


def blob(cx, cy, rx, ry, fill, rot=0):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" transform="rotate({rot} {cx} {cy})"/>'


def card(x, y, w, h, inner="", fill="#fff"):
    return (f'<g transform="translate({x} {y})"><rect width="{w}" height="{h}" rx="14" fill="{fill}" '
            f'stroke="{SKY}" stroke-width="2"/>{inner}</g>')


def bubble(x, y, text, fill=TEAL, color=NAVY, w=None):
    w = w or (len(text) * 9.5 + 28)
    return (f'<g transform="translate({x} {y})"><rect width="{w}" height="38" rx="19" fill="{fill}"/>'
            f'<path d="M18 36 L14 50 L30 37 Z" fill="{fill}"/>'
            f'<text x="{w/2}" y="25" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="16" '
            f'font-weight="700" fill="{color}">{text}</text></g>')


def node(x, y, r=7, fill=TEAL):
    return f'<circle cx="{x}" cy="{y}" r="{r+5}" fill="{fill}" opacity=".25"/><circle cx="{x}" cy="{y}" r="{r}" fill="{fill}"/>'


def arc(x1, y1, x2, y2, lift=60, color=TEAL, dash=True):
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2 - lift
    d = ' stroke-dasharray="6 7"' if dash else ""
    return f'<path d="M{x1} {y1} Q{mx} {my} {x2} {y2}" fill="none" stroke="{color}" stroke-width="3" stroke-linecap="round"{d}/>'


def bars(x, y, vals, w=14, gap=8, color=TEAL):
    out = []
    for i, v in enumerate(vals):
        out.append(f'<rect x="{x+i*(w+gap)}" y="{y-v}" width="{w}" height="{v}" rx="4" fill="{color if i==len(vals)-1 else NAVY3}"/>')
    return "".join(out)


def lines(x, y, widths, color=SKY, h=8, gap=14):
    return "".join(f'<rect x="{x}" y="{y+i*gap}" width="{w}" height="{h}" rx="4" fill="{color}"/>' for i, w in enumerate(widths))


def write(name, w, h, body, title):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(svg(w, h, body, title))


# ── Hero ───────────────────────────────────────────────────────────
b = [blob(320, 270, 270, 230, SKY2), blob(470, 120, 90, 70, TEAL_L, -20)]
b.append(globe(320, 270, 165))
pts = [(230, 200), (300, 330), (400, 210), (430, 300), (350, 160)]
b += [arc(230, 200, 400, 210, 70), arc(300, 330, 430, 300, 40), arc(230, 200, 300, 330, -20), arc(350, 160, 430, 300, 30)]
b += [node(x, y) for x, y in pts]
b.append(node(262, 228, 9, WARM))  # DMV highlight
b.append(person(118, 520, 1.3, SKINS[0], NAVY, NAVY, wave=True))
b.append(person(530, 520, 1.3, SKINS[3], TEAL2, "#3a2a1a"))
b.append(person(430, 520, 0.95, SKINS[2], NAVY2, "#111"))
b.append(bubble(40, 70, "Bonjour !", TEAL, NAVY))
b.append(bubble(470, 26, "Hello!", NAVY, "#fff"))
b.append(card(486, 190, 150, 92, bars(20, 76, [20, 32, 28, 46, 58]) +
              '<path d="M18 30 L60 22 L92 26 L132 10" stroke="%s" stroke-width="3" fill="none" stroke-linecap="round"/>' % TEAL2))
b.append(card(4, 150, 140, 74, f'<circle cx="30" cy="37" r="16" fill="{TEAL_L}"/><path d="M30 26 a8 8 0 0 1 8 8 c0 7 -8 14 -8 14 s-8 -7 -8 -14 a8 8 0 0 1 8 -8z" fill="{NAVY}"/>'
              f'<text x="56" y="34" font-family="Inter, Arial" font-size="14" font-weight="800" fill="{NAVY}">DMV</text>'
              f'<text x="56" y="52" font-family="Inter, Arial" font-size="11" fill="#4a5a70">DC · MD · VA</text>'))
write("hero-network.svg", 640, 520, "".join(b), "Entrepreneurs connected around a globe")

# ── Connect ────────────────────────────────────────────────────────
b = [blob(160, 120, 150, 105, TEAL_L)]
b.append(person(95, 200, 0.95, SKINS[1], NAVY, "#2b1a10"))
b.append(person(225, 200, 0.95, SKINS[2], TEAL2, "#111"))
b.append(f'<path d="M125 160 C140 150 180 150 195 160" stroke="{NAVY}" stroke-width="10" stroke-linecap="round" fill="none"/>')
b.append(bubble(40, 20, "Salut", NAVY, "#fff"))
b.append(bubble(190, 34, "Hi!", TEAL, NAVY))
write("connect.svg", 320, 230, "".join(b), "Two entrepreneurs meeting and shaking hands")

# ── Build ──────────────────────────────────────────────────────────
b = [blob(160, 125, 150, 100, SKY)]
for i, (x, c) in enumerate([(70, NAVY), (130, NAVY2), (190, TEAL)]):
    hgt = 50 + i * 35
    b.append(f'<rect x="{x}" y="{200-hgt}" width="52" height="{hgt}" rx="8" fill="{c}"/>')
    b.append(lines(x + 12, 210 - hgt, [28, 20], "#fff", 5, 11).replace('rx="4"', 'rx="2" opacity=".5"'))
b.append(f'<g transform="translate(250 60) rotate(30)"><rect x="-6" y="0" width="12" height="70" rx="5" fill="{WARM}"/><rect x="-22" y="-14" width="44" height="22" rx="6" fill="{NAVY}"/></g>')
b.append(f'<rect x="40" y="198" width="240" height="8" rx="4" fill="{NAVY}"/>')
write("build.svg", 320, 230, "".join(b), "Building blocks and a tool representing building a business")

# ── Grow ───────────────────────────────────────────────────────────
b = [blob(160, 120, 150, 100, TEAL_L)]
b.append(bars(70, 190, [40, 62, 84, 120], 34, 16, TEAL))
b.append(f'<path d="M64 150 L120 120 L170 128 L250 54" stroke="{NAVY}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
b.append(f'<path d="M234 50 L256 48 L252 70" stroke="{NAVY}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
b.append(f'<path d="M270 190 C270 160 286 150 290 130 C280 140 262 140 262 160 M270 190 C270 170 256 166 250 156" stroke="{TEAL2}" stroke-width="5" fill="none" stroke-linecap="round"/>')
b.append(f'<rect x="40" y="190" width="240" height="8" rx="4" fill="{NAVY}"/>')
write("grow.svg", 320, 230, "".join(b), "Rising bar chart showing growth")


# ── Section illustrations (480x300) ───────────────────────────────
def scene(name, title, inner, bg=SKY2, accent=TEAL_L):
    body = [blob(240, 160, 220, 130, bg), blob(380, 70, 70, 50, accent, 15)] + inner
    write(name, 480, 300, "".join(body), title)


# startups: rocket + laptop founder
scene("startups.svg", "A founder at a laptop with a rocket launching", [
    f'<g transform="translate(330 150) rotate(35)"><path d="M0 -80 C24 -56 26 -10 18 20 L-18 20 C-26 -10 -24 -56 0 -80 Z" fill="#fff" stroke="{NAVY}" stroke-width="5"/>'
    f'<circle cx="0" cy="-30" r="11" fill="{TEAL}" stroke="{NAVY}" stroke-width="4"/>'
    f'<path d="M-18 0 L-36 26 L-16 22 Z M18 0 L36 26 L16 22 Z" fill="{NAVY}"/><path d="M-10 24 Q0 60 10 24 Z" fill="{WARM}"/></g>',
    person(170, 268, 1.15, SKINS[4], NAVY, "#1b120c", laptop=True),
    node(420, 230, 6), node(80, 70, 5, WARM),
])

# businesses: storefront
scene("businesses.svg", "A small-business storefront with an open sign", [
    f'<rect x="110" y="110" width="260" height="160" rx="10" fill="#fff" stroke="{NAVY}" stroke-width="5"/>',
    "".join(f'<path d="M{110+i*52} 110 L{136+i*52} 70 L{162+i*52} 110 Z" fill="{TEAL if i%2==0 else NAVY}"/>' for i in range(5)),
    f'<rect x="100" y="64" width="280" height="12" rx="6" fill="{NAVY}"/>',
    f'<rect x="135" y="140" width="110" height="80" rx="6" fill="{SKY}" stroke="{NAVY}" stroke-width="4"/>',
    f'<rect x="270" y="140" width="70" height="130" rx="6" fill="{NAVY2}"/><circle cx="328" cy="208" r="4" fill="#fff"/>',
    f'<rect x="150" y="160" width="80" height="26" rx="13" fill="{TEAL}"/><text x="190" y="178" text-anchor="middle" font-family="Inter, Arial" font-size="13" font-weight="800" fill="{NAVY}">OUVERT</text>',
    person(410, 272, 0.75, SKINS[0], TEAL2, "#111"),
])

# professionals: briefcase + documents + people
scene("professionals.svg", "Professionals reviewing documents and charts", [
    card(150, 60, 180, 130, lines(20, 24, [90, 130, 110], SKY) + bars(30, 116, [18, 30, 24, 42], 18, 10)),
    f'<g transform="translate(330 200)"><rect x="-44" y="-30" width="88" height="62" rx="10" fill="{NAVY}"/><rect x="-16" y="-44" width="32" height="18" rx="5" fill="none" stroke="{NAVY}" stroke-width="6"/><rect x="-44" y="-6" width="88" height="6" fill="{TEAL}"/></g>',
    person(110, 272, 1.0, SKINS[3], NAVY2, "#3a2a1a"),
    person(220, 280, 0.9, SKINS[2], TEAL2, "#111"),
])

# contractors: house + tools
scene("contractors.svg", "A house under renovation with a contractor and tools", [
    f'<path d="M150 150 L250 70 L350 150 Z" fill="{NAVY}"/>',
    f'<rect x="170" y="150" width="160" height="120" fill="#fff" stroke="{NAVY}" stroke-width="5"/>',
    f'<rect x="230" y="200" width="40" height="70" rx="4" fill="{TEAL}"/>',
    f'<rect x="186" y="170" width="34" height="30" rx="3" fill="{SKY}" stroke="{NAVY}" stroke-width="3"/><rect x="280" y="170" width="34" height="30" rx="3" fill="{SKY}" stroke="{NAVY}" stroke-width="3"/>',
    f'<g transform="translate(380 120) rotate(20)"><rect x="-5" y="0" width="10" height="70" rx="4" fill="{WARM}"/><rect x="-20" y="-12" width="40" height="18" rx="5" fill="{NAVY2}"/></g>',
    f'<g transform="translate(100 120) rotate(-25)"><rect x="-4" y="0" width="8" height="64" rx="4" fill="{NAVY2}"/><path d="M-14 -16 a14 14 0 1 0 28 0 l-8 0 l0 8 l-12 0 l0 -8 z" fill="{NAVY}"/></g>',
    person(400, 275, 0.85, SKINS[0], WARM, "#111"),
])

# events: stage, mic, audience
scene("events.svg", "A speaker on stage presenting to an audience", [
    f'<rect x="120" y="60" width="240" height="120" rx="12" fill="{NAVY}"/>',
    f'<text x="240" y="112" text-anchor="middle" font-family="Inter, Arial" font-size="22" font-weight="800" fill="#fff">FASN</text>',
    f'<text x="240" y="140" text-anchor="middle" font-family="Inter, Arial" font-size="13" font-weight="600" fill="{TEAL}">CONNECT • BUILD • GROW</text>',
    person(240, 252, 0.8, SKINS[1], TEAL2, "#2b1a10"),
    "".join(person(110 + i * 65, 300, 0.62, SKINS[i % 6], [NAVY, NAVY2, TEAL2, NAVY3][i % 4], "#111") for i in range(5)),
])

# opportunities: open door with path + stars
scene("opportunities.svg", "An open door with a path leading to new opportunities", [
    f'<rect x="180" y="50" width="120" height="210" rx="10" fill="{NAVY}"/>',
    f'<rect x="192" y="62" width="96" height="198" fill="{TEAL_L}"/>',
    f'<path d="M192 62 L240 80 L240 266 L192 260 Z" fill="{NAVY2}"/><circle cx="230" cy="170" r="5" fill="{WARM}"/>',
    f'<path d="M120 300 C180 270 200 268 240 260 C280 268 300 270 360 300 Z" fill="{TEAL}" opacity=".5"/>',
    "".join(f'<path transform="translate({x} {y}) scale({s})" d="M0 -12 L3.5 -3.5 L12 0 L3.5 3.5 L0 12 L-3.5 3.5 L-12 0 L-3.5 -3.5 Z" fill="{c}"/>'
            for x, y, s, c in [(130, 90, 1.2, WARM), (350, 110, 1.0, TEAL), (330, 60, 0.7, NAVY2), (110, 170, 0.8, TEAL)]),
])

# resources: books + lightbulb
scene("resources.svg", "Books and a lightbulb representing learning resources", [
    "".join(f'<rect x="{120+i*44}" y="{130-(i%2)*20}" width="38" height="{140+(i%2)*20}" rx="5" fill="{c}"/>' for i, c in enumerate([NAVY, TEAL, NAVY2, TEAL2, NAVY3])),
    f'<rect x="110" y="268" width="250" height="8" rx="4" fill="{NAVY}"/>',
    f'<g transform="translate(370 120)"><circle r="34" fill="{WARM}"/><rect x="-14" y="30" width="28" height="22" rx="5" fill="{NAVY}"/>'
    f'<path d="M-10 4 L0 -10 L10 4" stroke="{NAVY}" stroke-width="4" fill="none" stroke-linecap="round"/>'
    + "".join(f'<line x1="{math.cos(a)*44:.1f}" y1="{math.sin(a)*44:.1f}" x2="{math.cos(a)*58:.1f}" y2="{math.sin(a)*58:.1f}" stroke="{WARM}" stroke-width="4" stroke-linecap="round"/>' for a in [math.radians(d) for d in (-150, -110, -70, -30, 10)]) + '</g>',
])

# community: circle of people with bubbles
scene("community.svg", "A diverse group of community members talking", [
    person(150, 260, 0.9, SKINS[0], NAVY, "#111", wave=True),
    person(240, 280, 1.0, SKINS[3], TEAL2, "#3a2a1a"),
    person(330, 260, 0.9, SKINS[2], NAVY2, "#111"),
    bubble(70, 60, "#MardiTech", NAVY, "#fff"),
    bubble(270, 40, "#FounderFriday", TEAL, NAVY),
])

# about / expansion: US network of cities
cities = [(110, 170), (150, 120), (210, 200), (260, 150), (330, 120), (360, 170), (390, 140), (300, 220), (180, 150)]
dmv = (372, 160)
inner = [f'<path d="M70 120 C90 80 160 70 220 80 C280 70 360 60 410 90 C440 110 420 160 400 200 C380 240 330 250 300 240 C250 260 200 240 160 236 C120 230 80 200 70 170 Z" fill="{SKY}" stroke="{NAVY2}" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/>']
inner += [arc(dmv[0], dmv[1], x, y, 40, TEAL) for x, y in cities]
inner += [node(x, y, 5, NAVY2) for x, y in cities]
inner.append(node(dmv[0], dmv[1], 10, WARM))
inner.append(f'<text x="{dmv[0]+6}" y="{dmv[1]+38}" font-family="Inter, Arial" font-size="14" font-weight="800" fill="{NAVY}">DMV</text>')
scene("expansion.svg", "Map of the United States with the DMV region connected to other cities", inner)

print("ok", sorted(os.listdir(OUT)))
