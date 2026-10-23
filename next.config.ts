import type { NextConfig } from "next";

// When deployed to GitHub Pages the site lives under /<repo-name>.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH; locally it is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default nextConfig;
