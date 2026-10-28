# Deployment

## GitHub Pages (current)

- Static build: `npm run build` → output `dist/`.
- CI: `.github/workflows/deploy.yml` builds and uploads `dist/` to the Pages artifact; the deploy job publishes.
- Repository Pages settings: Build & deployment = GitHub Actions.
- Limitation: GitHub Pages ignores `public/_headers` and serves everything with a fixed short cache.

## Cloudflare Pages (planned)

- Connect the repo in the Cloudflare dashboard: build command `npm run build`, output directory `dist`.
- `public/_headers` already sets `immutable` caching for `/_astro/*` and `/fonts/*` and revalidation for HTML.
- Point DNS at Cloudflare Pages; afterwards remove the GitHub Pages workflow and `public/CNAME`.

## Domain modes

- Custom domain (current):
  - `public/CNAME` = `andrescarreno.co`
  - Leave `BASE_PATH` empty
  - DNS (Squarespace):
    - Apex `andrescarreno.co`: A records to GitHub Pages IPs (or CNAME flatten to `andrscrrn.github.io` if supported)
    - `www` CNAME → `andrscrrn.github.io` (optional)
    - 301 forwarding rule: `blog.andrescarreno.co/*` → `https://andrescarreno.co/blog/$1`
- Project page (alternative):
  - Remove `public/CNAME`
  - Set repo variable `BASE_PATH=/personal-blog`

## Variables

- `SITE_URL` (e.g., `https://andrescarreno.co`); the workflow falls back to the old `NEXT_PUBLIC_SITE_URL` repo variable
- `BASE_PATH` (only for project-pages hosting; falls back to `NEXT_PUBLIC_BASE_PATH`)
- Analytics and comments variables were removed with the Astro migration

## Commands

- Trigger deploy:
  ```bash
  gh workflow run "Deploy to GitHub Pages" -R andrscrrn/personal-blog
  gh run list --workflow "Deploy to GitHub Pages" -R andrscrrn/personal-blog --limit 1
  ```
