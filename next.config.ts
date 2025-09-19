import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mockmind-api.uifaces.co",
        pathname: "/content/human/**"
      },
      {
        protocol: 'https',
        hostname: 'integrare-os-minio.nyr4mj.easypanel.host',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig;
