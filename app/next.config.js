/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: false, // true for production
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
};

module.exports = nextConfig;
