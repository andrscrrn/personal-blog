import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const items = await Promise.all(
    posts.map(async (p) => {
      const link = absoluteUrl(`/blog/${p.slug}`);
      return `\n    <item>\n      <title>${escapeXml(
        p.title
      )}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <pubDate>${new Date(
        p.date
      ).toUTCString()}</pubDate>\n      <description>${escapeXml(
        p.description || ""
      )}</description>\n    </item>`;
    })
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Andres Carreño Blog</title>\n    <link>${absoluteUrl(
    "/"
  )}</link>\n    <description>Personal blog</description>\n    ${items.join(
    ""
  )}\n  </channel>\n</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
