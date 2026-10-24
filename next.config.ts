import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  assetPrefix: isProd ? (process.env.NEXT_PUBLIC_ASSET_PREFIX || "https://codexid.vercel.app") : undefined,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

export default nextConfig;
