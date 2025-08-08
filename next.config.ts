import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""; // e.g. "/personal-blog" for project pages
const assetPrefix =
  process.env.NEXT_PUBLIC_ASSET_PREFIX || basePath || undefined;

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix,
};

export default nextConfig;
