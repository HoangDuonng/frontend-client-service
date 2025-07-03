/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_IMAGE_DOMAINS
      ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',').map(domain => ({ protocol: 'https', hostname: domain.trim() }))
      : [
          { protocol: 'http', hostname: 'localhost' },
        ],
  },
  async rewrites() {
    return [
      {
        source: '/tour/plugins/:path*',
        destination: `${process.env.NEXT_PUBLIC_TOUR_PLUGIN_DOMAIN}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig; 
