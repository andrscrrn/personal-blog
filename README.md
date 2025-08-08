This is a personal blog built with Next.js, Tailwind CSS, MDX, and static export for GitHub Pages.

Quick start:

1. Install deps: `npm i`
2. Run dev: `npm run dev`
3. Add posts in `content/posts/*.mdx`
4. Build static site: `npm run build` (output in `out/`)

GitHub Pages:

- For a project page (served at `/REPO`), set a repository variable `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>`.
- For a custom domain, add a `CNAME` file under `public/` and leave `NEXT_PUBLIC_BASE_PATH` empty.
