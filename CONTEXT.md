# Repository Context

Purpose: Personal blog with static export for free hosting on GitHub Pages, custom domain via Squarespace, modern UI with light/dark theme, and MDX posts.

## Stack
- Framework: Next.js (App Router) with output: "export"
- Styling: Tailwind CSS v4 + Typography
- Content: MDX (.mdx) in `content/posts/`
- Theming: `next-themes` (class-based dark mode)
- MDX rendering: `next-mdx-remote/rsc` with `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
- Hosting: GitHub Pages (workflow in `.github/workflows/deploy.yml`)
- Domain: `andrescarreno.co` (Squarespace DNS) with `public/CNAME`
- Analytics: GA4 via `NEXT_PUBLIC_GA_ID`
- Comments: Giscus (optional) via `NEXT_PUBLIC_GISCUS_*`

## Key decisions
- Full static export (no server runtime) to enable GitHub Pages
- `basePath/assetPrefix` controlled by repo variables for project pages; disabled for custom domain
- Robots, sitemap and RSS are prerendered routes (`/robots.txt`, `/sitemap.xml`, `/feed.xml`)

## Core paths
- Pages: `app/`
- Blog index: `app/blog/page.tsx`
- Blog post route: `app/blog/[slug]/page.tsx`
- Content: `content/posts/*.mdx`
- UI: `components/*`
- Config: `next.config.ts`, `tailwind.config.ts`

## Build & deploy
- Dev: `npm run dev`
- Build (static export to `out/`): `npm run build`
- Deploy: GitHub Actions workflow “Deploy to GitHub Pages” publishes `out/`

## Operational vars
- `NEXT_PUBLIC_SITE_URL`: canonical site (currently `https://andrescarreno.co`)
- `NEXT_PUBLIC_GA_ID`: GA4 measurement ID (format `G-XXXXXXXXXX`)
- Giscus (optional): `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## Domain modes
- Custom domain (current): `public/CNAME` = `andrescarreno.co`; leave `NEXT_PUBLIC_BASE_PATH` empty
- Project page (alternative): set `NEXT_PUBLIC_BASE_PATH=/REPO_NAME` and remove `public/CNAME`
