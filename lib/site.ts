export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (envUrl) return envUrl;
  // Fallbacks
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || basePath || "";
  if (prefix && prefix.startsWith("/")) {
    return `https://andrscrrn.github.io${prefix}`;
  }
  return "https://andrescarreno.co";
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
