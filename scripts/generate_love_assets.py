"""Create original, lightweight SVG accents used by the love-universe scenes."""
from pathlib import Path
import random

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "generated"
OUT.mkdir(parents=True, exist_ok=True)
rng = random.Random(16102026)

clouds = []
for i in range(9):
    x, y = rng.randint(15, 985), rng.randint(15, 385)
    scale, tint = rng.uniform(.48, 1.12), rng.choice(["#ffffff", "#fff8fc", "#f9efff"])
    clouds.append(f'<g transform="translate({x} {y}) scale({scale:.2f})" fill="{tint}" opacity=".78"><ellipse cx="58" cy="25" rx="58" ry="24"/><circle cx="38" cy="15" r="25"/><circle cx="69" cy="9" r="31"/><circle cx="94" cy="19" r="22"/></g>')
flowers = []
for i in range(12):
    x, y, radius = rng.randint(25, 975), rng.randint(20, 370), rng.randint(6, 12)
    color = rng.choice(["#f39ab9", "#d5a8eb", "#f6cb80", "#f4a68f"])
    petals = "".join(f'<ellipse cx="0" cy="{-radius*1.15}" rx="{radius*.48:.1f}" ry="{radius:.1f}" transform="rotate({a})"/>' for a in range(0, 360, 60))
    flowers.append(f'<g transform="translate({x} {y})" fill="{color}" opacity=".66">{petals}<circle r="{radius*.34:.1f}" fill="#fff2bd"/></g>')

(OUT / "pastel-clouds.svg").write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" fill="none" aria-hidden="true">''' + "".join(clouds) + """</svg>""", encoding="utf-8")
(OUT / "flower-doodles.svg").write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" fill="none" aria-hidden="true">''' + "".join(flowers) + """</svg>""", encoding="utf-8")

# A simple original bear couple doodle: geometric faces, blush, and a shared heart.
bear = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 250" fill="none" role="img" aria-label="Two original little bear sweethearts">
<g stroke="#a77569" stroke-width="3"><g transform="translate(28 34)"><circle cx="92" cy="42" r="34" fill="#efd0b6"/><circle cx="36" cy="27" r="22" fill="#efd0b6"/><circle cx="148" cy="27" r="22" fill="#efd0b6"/><ellipse cx="92" cy="132" rx="66" ry="72" fill="#f4dfcf"/><circle cx="78" cy="41" r="4" fill="#634758"/><circle cx="107" cy="41" r="4" fill="#634758"/><ellipse cx="93" cy="55" rx="10" ry="7" fill="#ba7a79"/><ellipse cx="61" cy="57" rx="11" ry="6" fill="#e99eaa" stroke="none"/><ellipse cx="124" cy="57" rx="11" ry="6" fill="#e99eaa" stroke="none"/></g>
<g transform="translate(199 42)"><circle cx="92" cy="42" r="34" fill="#f3dcd1"/><circle cx="36" cy="27" r="22" fill="#f3dcd1"/><circle cx="148" cy="27" r="22" fill="#f3dcd1"/><ellipse cx="92" cy="132" rx="66" ry="72" fill="#fff0e7"/><circle cx="78" cy="41" r="4" fill="#634758"/><circle cx="107" cy="41" r="4" fill="#634758"/><ellipse cx="93" cy="55" rx="10" ry="7" fill="#ba7a79"/><ellipse cx="61" cy="57" rx="11" ry="6" fill="#e99eaa" stroke="none"/><ellipse cx="124" cy="57" rx="11" ry="6" fill="#e99eaa" stroke="none"/></g></g>
<path d="M210 153c-14-16-35-5-22 12l22 21 22-21c13-17-8-28-22-12Z" fill="#f178a4"/><path d="M74 224c25 12 52 13 77 0m116 0c25 12 52 13 77 0" stroke="#d39ab0" stroke-width="3" stroke-linecap="round"/>
</svg>'''
(OUT / "bear-doodles.svg").write_text(bear, encoding="utf-8")
print(f"Generated pastel clouds, flower doodles, and original bear art in {OUT}")
