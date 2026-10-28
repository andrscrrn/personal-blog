import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { getAllPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = await getAllPosts();
  const projects = await getCollection("projects");
  const urls = [
    "/",
    "/blog",
    "/projects",
    "/about",
    ...posts.map((post) => `/blog/${post.id}`),
    ...projects.map((project) => `/projects/${project.id}`),
  ].map((path) => new URL(path, site).href);
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((loc) => `<url><loc>${loc}</loc></url>`).join("") +
    `</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
