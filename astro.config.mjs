// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// SITE_URL overrides for previews; BASE_PATH only for project-pages hosting.
const site =
  process.env.SITE_URL?.trim().replace(/\/$/, "") || "https://andrescarreno.co";
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site,
  base,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        { behavior: "wrap", properties: { className: ["anchor"] } },
      ],
    ],
  },
  integrations: [mdx()],
  build: {
    // The whole stylesheet is ~5 KB gzipped, so "critical CSS" is all of it:
    // inlining removes the only render-blocking request.
    inlineStylesheets: "always",
  },
  vite: {
    // The cast papers over @tailwindcss/vite and Astro bundling two copies
    // of Vite's Plugin type; the plugin itself works unchanged.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
