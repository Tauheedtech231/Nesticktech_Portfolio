const nextConfig = {
  reactStrictMode: true,

  output: "standalone",

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