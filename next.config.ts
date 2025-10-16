import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Removed output: 'standalone' - this was causing 404 errors on Vercel
  serverExternalPackages: ['sharp'],
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/images-used/:path*',
      },
    ];
  },
};

export default nextConfig;
