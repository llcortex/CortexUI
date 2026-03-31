import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }]
    ]
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@cortexui/ai-contract", "@cortexui/components", "@cortexui/primitives", "@cortexui/runtime"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@cortexui/ai-contract": path.resolve(__dirname, "../../packages/ai-contract/src/index.ts"),
      "@cortexui/components": path.resolve(__dirname, "../../packages/components/src/index.ts"),
      "@cortexui/primitives": path.resolve(__dirname, "../../packages/primitives/src/index.ts"),
      "@cortexui/runtime": path.resolve(__dirname, "../../packages/runtime/src/index.ts"),
      "@cortexui/tokens": path.resolve(__dirname, "../../packages/tokens/src/index.ts")
    };

    return config;
  }
};

export default withMDX(nextConfig);
