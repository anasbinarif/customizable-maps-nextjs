/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["saad-map-dev-bucket.s3.us-east-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        pathname: "/maps/api/place/js/**",
      },
    ],
  },
};

export default nextConfig;
