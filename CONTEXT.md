# Repository Context

Purpose: Personal blog as fully static HTML with near-zero client JavaScript, modern editorial UI with light/dark theme, and MDX posts.

## Stack
- Framework: Astro 5 (SSG, zero client JS by default)
- Styling: Tailwind CSS v4 via `@tailwindcss/vite` (build-time only, no runtime)
- Content: MDX (.mdx) in `content/posts/` and `content/projects/` via Astro content collections
- Theming: CSS `prefers-color-scheme` (no JS theme toggle)
- Markdown pipeline: GFM (Astro default) + `rehype-slug` + `rehype-autolink-headings`
- Fonts: self-hosted WOFF2 latin subsets in `public/fonts/` (Newsreader 400/400i/500/600, JetBrains Mono 400), `font-display: swap`, only 400 normal is preloaded
- Hosting: Cloudflare Pages (project `personal-blog`, builds `npm run build` from `main`, serves `dist/`); caching rules in `public/_headers`
- Domain: `andrescarreno.co`, registered at Porkbun, DNS on Cloudflare
- Analytics: none (GA4 was removed in the Astro migration)
- Comments: none (the Giscus component was removed; re-add as an island if ever needed)

## Key decisions
- Zero client-side JS by default. The only script on the site is the Status Ring hover animation in `src/components/StatusRing.astro`: a small vanilla module, no framework and no hydration. Any new interactive component must be an isolated island (`client:visible` / `client:idle`) justified in a comment.
- No analytics, chat widgets, embeds, or third-party scripts without explicit approval.
- All CSS is inlined into each page (`build.inlineStylesheets: "always"`): the whole stylesheet is ~5 KB gzipped, so there is no render-blocking CSS request.
- `astro.config.mjs` enables prefetching all internal links on viewport entry, so navigation feels instant.
- Robots, sitemap and RSS are static endpoints (`/robots.txt`, `/sitemap.xml`, `/feed.xml`).
- Post list thumbnails use generated 336px `-thumb.webp` files (see `scripts/optimize-og.cjs`), not the full OG images.

## Core paths
- Pages: `src/pages/`
- Layout and head/meta/OG: `src/layouts/BaseLayout.astro`
- UI components: `src/components/*.astro`
- Content collections schema: `src/content.config.ts`
- Content: `content/posts/*.mdx`, `content/projects/*.mdx`
- Global CSS and design tokens: `src/styles/global.css`
- Helpers: `src/lib/`
- Config: `astro.config.mjs`

## Build & deploy
- Dev: `npm run dev`
- Build (static output to `dist/`): `npm run build`
- Preview the built site: `npm run preview`
- Type check: `npm run check`
- OG images and thumbnails: `npm run optimize:og`
- Deploy: push to `main`; Cloudflare Pages builds and publishes automatically (previews per branch at `*.personal-blog-vjv.pages.dev`)

## Operational vars
- `SITE_URL`: canonical site, defaults to `https://andrescarreno.co` in `astro.config.mjs` (override only for previews)
- `BASE_PATH`: only if the site ever needs to live under a subpath

## Hosting history
- Migrated from GitHub Pages to Cloudflare Pages in October 2026; the old deploy workflow and `public/CNAME` were removed then
