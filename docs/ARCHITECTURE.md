# Architecture

- Next.js App Router, static export (output: "export"), zero server runtime.
- Content source: MDX files in `content/posts/`; parsed with `gray-matter`.
- Rendering: `next-mdx-remote/rsc` + `remark-gfm` + `rehype-slug` + autolinked headings.
- Styling: Tailwind v4 + Typography, theme via `next-themes` using class strategy.
- Pages:
  - Home (`app/page.tsx`): lists latest posts.
  - Blog index (`app/blog/page.tsx`).
  - Blog post (`app/blog/[slug]/page.tsx`) with `generateStaticParams()`.
  - SEO: `/robots.txt`, `/sitemap.xml`, `/feed.xml`.
- Deployment: GitHub Actions → Pages. Static output in `out/`.
- Domain: custom CNAME (`public/CNAME`).

## Data flow
- Build-time reads MDX, extracts frontmatter, and pre-renders routes.
- Client-only pieces: theme toggle, analytics snippet, comments (Giscus).

## Extensibility
- Tags/categories: extend `PostMeta` and add routes under `app/tags/[tag]/page.tsx`.
- Code highlighting: add `rehype-pretty-code`.
- Search: generate JSON index at build (`/search.json`) and client filtering.
