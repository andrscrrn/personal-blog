import type { APIContext } from "astro";
import { getAllPosts } from "../lib/posts";

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = await getAllPosts();
  const items = posts
    .map((post) => {
      const link = new URL(`/blog/${post.id}`, site).href;
      return `\n    <item>\n      <title>${escapeXml(
        post.data.title
      )}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <pubDate>${post.data.date.toUTCString()}</pubDate>\n      <description>${escapeXml(
        post.data.description || ""
      )}</description>\n    </item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Andres Carreño Blog</title>\n    <link>${
    site.href
  }</link>\n    <description>Personal blog</description>\n    ${items}\n  </channel>\n</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
