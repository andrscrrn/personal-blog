# Personal Blog (Next.js + MDX + GitHub Pages)

Live site: https://blog.andrescarreno.co

[![Deploy to GitHub Pages](https://github.com/andrscrrn/personal-blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/andrscrrn/personal-blog/actions/workflows/deploy.yml)

## Features

- Next.js App Router (static export)
- Tailwind CSS v4, modern light/dark theme
- MDX posts with GFM, slugged/autolinked headings
- Deployed via GitHub Actions to GitHub Pages

## Quick start

1. Install deps: `npm i`
2. Dev server: `npm run dev`
3. Add posts: place `.mdx` files in `content/posts/`
4. Build static site: `npm run build` (outputs to `out/`)

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
- Deployment (Pages, dominio, variables): `docs/DEPLOYMENT.md`
- Agent playbooks (GA4, Squarespace DNS): `docs/AGENT_PLAYBOOKS.md`
- ADRs: `docs/adrs/`

## Customize

- Branding/nav: `components/Navbar.tsx`
- Theme/colors: `app/globals.css`, `tailwind.config.ts`
- Home/blog pages: `app/page.tsx`, `app/blog/*`
- Config: `next.config.ts`
