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
      {
        source: '/website/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/website/committee',
        destination: '/committee',
        permanent: true,
      },
      {
        source: '/website/copy-of-committee',
        destination: '/norway',
        permanent: true,
      },
      {
        source: '/website/stavanger-info',
        destination: '/local',
        permanent: true,
      },
      {
        source: '/website/contactus',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
  images: {
    unoptimized: false,
  },
}

export default nextConfig
