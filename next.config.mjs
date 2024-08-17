/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'maps.googleapis.com',
                pathname: '/maps/api/place/js/**',
            },
        ],
    },
};

export default nextConfig;