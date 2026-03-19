import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        images: { unoptimized: true }
      }
    : {})
};

export default nextConfig;
