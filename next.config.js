/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
};

module.exports = nextConfig; 
