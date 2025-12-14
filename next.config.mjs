/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      },
      {
        protocol: "https",
        hostname: "cmldqhfeingvkdeurufd.supabase.co",
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
