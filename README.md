# Personal Blog (Next.js + MDX + GitHub Pages)

Live site: https://andrscrrn.github.io/personal-blog

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

## Deploying to GitHub Pages
- Project page (served at `/REPO`): set Actions → Variables → `NEXT_PUBLIC_BASE_PATH=/personal-blog`
- Custom domain: add `public/CNAME` with your domain and leave `NEXT_PUBLIC_BASE_PATH` empty
- The workflow `.github/workflows/deploy.yml` builds and publishes `out/`

## Customize
- Branding/nav: `components/Navbar.tsx`
- Theme/colors: `app/globals.css`, `tailwind.config.ts`
- Home/blog pages: `app/page.tsx`, `app/blog/*`
- Config: `next.config.ts` (static export + basePath/assetPrefix)
