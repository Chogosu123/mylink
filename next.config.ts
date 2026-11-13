import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/mylink" : "",
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/mylink",
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
