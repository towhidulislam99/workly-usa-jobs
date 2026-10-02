# Workly

USA-focused responsive job discovery website built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy

This repository includes `netlify.toml` with the Vite build command, `dist` publish directory, Node 22, and SPA fallback routing. See [DEPLOY_GITHUB_NETLIFY.md](DEPLOY_GITHUB_NETLIFY.md) for the complete GitHub and Netlify guide.

Before final deployment, replace the Manus preview origin in the SEO files with the final Netlify or custom domain.
