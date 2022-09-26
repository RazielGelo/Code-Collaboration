/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      CLOUDINARY_CDN_URI: process.env.CLOUDINARY_CDN_URI
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
      domains: [
          'res.cloudinary.com'
      ]
  }
};

module.exports = nextConfig;
