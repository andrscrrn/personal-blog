# Architecture

- Astro 5, fully static output (SSG), zero server runtime, zero client JS by default.
- Content source: MDX files in `content/posts/` and `content/projects/`, loaded via Astro content collections (`src/content.config.ts`).
- Markdown pipeline: GFM (Astro default) + `rehype-slug` + autolinked headings (configured in `astro.config.mjs`).
- Styling: Tailwind v4 via `@tailwindcss/vite`, design tokens and post typography in `src/styles/global.css`; dark theme via `prefers-color-scheme` only.
- Fonts: self-hosted WOFF2 latin subsets in `public/fonts/`, declared in `global.css`, 400 normal preloaded in the layout.
- Pages:
  - Home (`src/pages/index.astro`): projects + latest posts.
  - Blog index (`src/pages/blog/index.astro`) and post (`src/pages/blog/[slug].astro`) with `getStaticPaths()`.
  - Projects index and detail under `src/pages/projects/`.
  - SEO endpoints: `/robots.txt`, `/sitemap.xml`, `/feed.xml` (`src/pages/*.ts`).
- Client JS: only the Status Ring hover animation (`src/components/StatusRing.astro`, vanilla module) and Astro's ~1 KB prefetch script. Any new interactivity must be an isolated island with lazy hydration, justified in a comment.
- Deployment: GitHub Actions → Pages. Static output in `dist/`. `public/_headers` carries Cloudflare Pages caching rules.
- Domain: custom CNAME (`public/CNAME`).

## Data flow
- Build-time reads MDX through content collections, validates frontmatter with the Zod schema, and pre-renders every route.
- `scripts/optimize-og.cjs` converts OG images to WebP and generates square list thumbnails.

## Extensibility
- Tags/categories: extend the posts schema and add routes under `src/pages/tags/[tag].astro`.
- Code highlighting: Astro ships Shiki; configure `markdown.shikiConfig`.
- Search: generate a JSON index at build (`/search.json`) and filter in a small island.
