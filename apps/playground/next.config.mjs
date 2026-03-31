/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@cortexui/ai-contract",
    "@cortexui/components",
    "@cortexui/primitives",
    "@cortexui/runtime"
  ]
};

export default nextConfig;
