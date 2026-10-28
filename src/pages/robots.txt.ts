import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const sitemap = new URL("/sitemap.xml", context.site).href;
  const body = `User-agent: *\nAllow: /\nSitemap: ${sitemap}`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
