/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "vercel.com",
      "platform-lookaside.fbsbx.com",
      "pbs.twimg.com",
      "storage.googleapis.com",
      "arweave.net",
      "**.arweave.net",
      "www.arweave.net",
      "encrypted-tbn0.gstatic.com",
      "ipfs.nftstorage.link",
      "upload.wikimedia.org",
      "api.telegram.org",
      "t.me"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ipfs.nftstorage.link",
      },
      {
        protocol: "https",
        hostname: "**.arweave.net",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  output: "standalone",
  experimental: {
    serverActions: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/new-user?referall=:slug",
  //       permanent: true,
  //       has: [
  //         {
  //           type: "header",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
