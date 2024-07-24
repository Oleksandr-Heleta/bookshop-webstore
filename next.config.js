/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
    images: {
        domains: [
            'res.cloudinary.com',
            'mouse-admin.com.ua',
            'localhost',
        ]
    }
}

module.exports = withPWA({
    ...nextConfig
});
