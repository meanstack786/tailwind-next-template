/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'iph.href.lu'],
  },
  env: {},
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
