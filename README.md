# Personal Blog (Astro + MDX)

Live site: https://andrescarreno.co

[![Deploy to GitHub Pages](https://github.com/andrscrrn/personal-blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/andrscrrn/personal-blog/actions/workflows/deploy.yml)

## Features

- Astro 5, fully static output with zero client JavaScript by default
- Tailwind CSS v4 (build-time only), light/dark theme via `prefers-color-scheme`
- MDX posts with GFM, slugged/autolinked headings
- Self-hosted subset fonts, all CSS inlined, internal links prefetched
- Deployed via GitHub Actions to GitHub Pages (`public/_headers` ready for Cloudflare Pages)

## Quick start

1. Install deps: `npm i`
2. Dev server: `npm run dev`
3. Add posts: place `.mdx` files in `content/posts/`
4. Build static site: `npm run build` (outputs to `dist/`), preview it with `npm run preview`

## Writing posts (MDX)

Create a file like `content/posts/my-first-post.mdx` with frontmatter:

```md
---
title: My First Post
date: 2025-01-05
description: Short summary
tags: [notes]
---

Your content here...
```

### Open Graph images per post

- Place images in `public/og/` named after the post slug.
- Preferred format: WebP. If you drop a JPG/PNG, run the optimizer and it will convert and resize.
- Recommended size: 1200×630 px.
- The optimizer also generates a square `<slug>-thumb.webp` used by the post lists.

Add to frontmatter (optional; auto-detected if the file exists):

```md
image: /og/my-first-post.webp
```

Optimize and update frontmatter automatically:

```bash
npm run optimize:og
```

## Docs

- Context: `CONTEXT.md`
- Architecture: `docs/ARCHITECTURE.md`
- Deployment (Pages, domain, variables): `docs/DEPLOYMENT.md`
- Agent playbooks: `docs/AGENT_PLAYBOOKS.md`
- ADRs: `docs/adrs/`

## Customize

- Branding/nav: `src/components/SiteHeader.astro`
- Theme/colors: `src/styles/global.css`
- Home/blog pages: `src/pages/index.astro`, `src/pages/blog/*`
- Head, meta and Open Graph: `src/layouts/BaseLayout.astro`
- Config: `astro.config.mjs`
