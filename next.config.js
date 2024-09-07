/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com', 'mouse-admin.com.ua', 'mouse-kidsbooks.com.ua', 'localhost'],
  },
};

module.exports = withPWA({
  ...nextConfig,
});
