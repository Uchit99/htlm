# Mottoo's Birthday Love Universe

A static React + Vite birthday experience for Mottoo. Reasons, poems, letters, and promises live in `src/data/content.js`. The site has no relationship timeline or photo-memory section. Its connected heart is generated locally as SVG.

The opening scene progressively draws a large connected heart. The Heart Catcher game lets Mottoo catch seven floating hearts to reveal a birthday gift message.

## Requirements

- Node.js 18 or newer
- Python 3.9 or newer (only needed to regenerate the SVG artwork)

## Start the site

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The app is a static frontend and does not need a server-side database or Python backend.

## Regenerate the connected heart

```sh
npm run art:heart
npm run art:love
```

`art:heart` writes the connected SVG and its deterministic node graph, used by the interactive heart. `art:love` creates original pastel cloud, flower, and bear doodle SVGs for the scene decorations.

## Production build

```sh
npm run build
npm run preview
```

The deployable site is in `dist/`. Publish the contents of that directory on any static host that supports SPA assets. The current site has no router, so ordinary section links work without host rewrites.

## Personalize

Edit the arrays in `src/data/content.js` for reasons, poems, letters, promises, and affectionate notes. Optional music and photos are not required; the experience is complete without them. The five-heart hunt and saved poem/letter state use `sessionStorage` and reset with the browser session.
