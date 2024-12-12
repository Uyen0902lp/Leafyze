// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: 'i.ibb.co',
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: 'i.ibb.co.com',
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: 'leafyze-grocery-backend.vercel.app',
//         pathname: "**",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//         pathname: "**",
//       }
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co', 'leafyze-grocery-backend.vercel.app', 'localhost'],
    unoptimized: true,
  },
};

export default nextConfig;

