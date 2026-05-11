# Gavel IQ Platform Build v3

One-page Vite/React demo for Gavel IQ: Distressed Asset Intelligence for Florida Judicial Foreclosure Markets.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy through existing repo

Copy `src/App.jsx`, `src/main.jsx`, `src/styles.css`, `index.html`, and the package dependencies into your existing `gavel-iq` project, then run:

```bash
npm install
npm run build
git add .
git commit -m "Platform Build v3"
git push origin master
```

Vercel should redeploy automatically.
