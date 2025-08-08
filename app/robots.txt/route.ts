import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const host = getSiteUrl();
  const body = `User-agent: *\nAllow: /\nSitemap: ${host}/sitemap.xml`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}


