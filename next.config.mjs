/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.kerala.no' }],
        destination: 'https://kerala.no/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: false,
  },
}

export default nextConfig
