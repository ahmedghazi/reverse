import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // { hostname: "source.unsplash.com" },
    ],
  },
  env: {
    KEY_SENDGRID: "LA CLE API",
  },
  compiler: {
    // Enables the styled-components SWC transform
    // styledComponents: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/llms.txt",
  //       destination: "/api/llms.txt",
  //     },
  //   ];
  // },
};

export default nextConfig;
