import { getAllPosts } from "@/lib/posts";
import { getProjectSlugs } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const urls = [
    absoluteUrl("/"),
    absoluteUrl("/blog"),
    absoluteUrl("/about"),
    ...posts.map((p) => absoluteUrl(`/blog/${p.slug}`)),
    ...getProjectSlugs().map((slug) => absoluteUrl(`/projects/${slug}`)),
  ];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((loc) => `<url><loc>${loc}</loc></url>`).join("") +
    `</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
