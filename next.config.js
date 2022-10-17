/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  // reactStrictMode: true, // We also don't need this this
  swcMinify: true,
  env: {
    TOKEN: process.env.TOKEN,
  }
};

module.exports = nextConfig;
