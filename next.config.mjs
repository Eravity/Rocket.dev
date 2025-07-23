/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper module resolution
  experimental: {
    esmExternals: true,
  },
  // Increase stability for larger applications
  reactStrictMode: true,
  // Improve error handling
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  // Configure image domains for next/image
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
