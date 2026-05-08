const nextConfig = {
  reactStrictMode: true,
 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;