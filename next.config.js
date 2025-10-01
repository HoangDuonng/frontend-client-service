/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8087',
        pathname: '/api/files/**',
      },
    ],
    // Nếu dùng Next < 13.4, dùng domains: ['localhost'] thay cho remotePatterns
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
