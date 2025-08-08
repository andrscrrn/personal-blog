# Deployment

## GitHub Pages
- Static export: `npm run build` → output `out/`.
- CI: `.github/workflows/deploy.yml` builds and uploads `out/` to Pages artifact; deploy job publishes.
- Repository Pages settings: Build & deployment = GitHub Actions.

## Domain modes
- Custom domain (recommended):
  - `public/CNAME` = `blog.andrescarreno.co`
  - Leave `NEXT_PUBLIC_BASE_PATH` empty
  - DNS (Squarespace):
    - CNAME `blog` → `andrscrrn.github.io`
    - Optional apex A records → GitHub Pages IPs
- Project page (alternative):
  - Remove `public/CNAME`
  - Set repo variable `NEXT_PUBLIC_BASE_PATH=/personal-blog`

## Variables
- `NEXT_PUBLIC_SITE_URL` (e.g., `https://blog.andrescarreno.co`)
- `NEXT_PUBLIC_GA_ID` (GA4)
- Giscus (comments): `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## Commands
- Trigger deploy:
  ```bash
  gh workflow run "Deploy to GitHub Pages" -R andrscrrn/personal-blog
  gh run list --workflow "Deploy to GitHub Pages" -R andrscrrn/personal-blog --limit 1
  ```
