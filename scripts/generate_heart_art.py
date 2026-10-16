"""Generate the reusable connected-heart SVG used by the birthday site."""
from pathlib import Path
import math
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "generated" / "colorful-heart.svg"
NODE_OUT = ROOT / "src" / "data" / "heart-nodes.json"
PUBLIC_NODE_OUT = ROOT / "public" / "generated" / "heart-nodes.json"

def heart(t):
    x = 16 * math.sin(t) ** 3
    y = 13 * math.cos(t) - 5 * math.cos(2*t) - 2 * math.cos(3*t) - math.cos(4*t)
    return (150 + x * 5.2, 132 - y * 5.2)

points = [heart(i * 2 * math.pi / 96) for i in range(97)]
segments = []
colors = ["#ff78ad", "#ff9b9d", "#ffc28a", "#c99cff", "#8edfd1", "#ff78ad"]
for i, (a, b) in enumerate(zip(points, points[1:])):
    segments.append(f'<line class="segment" style="--delay:{i * .065:.3f}s" pathLength="1" x1="{a[0]:.2f}" y1="{a[1]:.2f}" x2="{b[0]:.2f}" y2="{b[1]:.2f}" stroke="{colors[i % len(colors)]}"/>')
nodes = "".join(f'<circle cx="{points[i][0]:.2f}" cy="{points[i][1]:.2f}" r="{3.2 if i % 8 == 0 else 1.5}" class="node" style="--delay:{i * .065 + .12:.3f}s"/>' for i in range(0, 96, 4))
svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 280" fill="none" role="img" aria-label="A heart made from connected pastel lines">
<defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>.segment{opacity:0;stroke-dasharray:1;stroke-dashoffset:1;animation:connect .18s var(--delay) forwards}.node{opacity:0;animation:connect .2s var(--delay) forwards}.inner{stroke-dasharray:190;stroke-dashoffset:190;animation:draw 1.15s 6.3s ease forwards}@keyframes connect{to{opacity:1;stroke-dashoffset:0}}@keyframes draw{to{stroke-dashoffset:0}}@media(prefers-reduced-motion:reduce){.segment,.node{opacity:1;stroke-dashoffset:0;animation:none}.inner{stroke-dashoffset:0;animation:none}}</style>
<g class="outer" stroke-linecap="round" stroke-width="3.5" filter="url(#glow)">'''+"".join(segments)+'''</g><g fill="#fff8fc">'''+nodes+'''</g>
<path class="inner" d="M150 185 C132 169 119 157 119 144 C119 128 139 123 150 140 C161 123 181 128 181 144 C181 157 168 169 150 185Z" stroke="#ff8aba" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(svg, encoding="utf-8")
messages = [
    "You make ordinary days feel special.",
    "You deserve kindness, love, and beautiful opportunities.",
    "I hope you never forget how precious you are.",
    "21 August 2025 — the beginning of our story.",
    "One more reason to smile.",
    "This little universe was made just for you.",
    "Of all the little things in this universe, you’re my favourite.",
]
nodes = []
for node_id, point_index in enumerate([0, 12, 24, 36, 48, 60, 78]):
    x, y = points[point_index]
    nodes.append({"id": node_id, "x": round(x, 2), "y": round(y, 2), "left": round(x / 300 * 100, 2), "top": round(y / 280 * 100, 2), "message": messages[node_id], "next": (node_id + 1) % 7})
data = {"viewBox": [300, 280], "nodes": nodes, "edges": [[n["id"], n["next"]] for n in nodes]}
NODE_OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
PUBLIC_NODE_OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Generated {OUT}")
print(f"Generated {NODE_OUT}")
