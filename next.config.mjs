/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: 'via.placeholder.com'
      }
    ]
  }
}

export default nextConfig
