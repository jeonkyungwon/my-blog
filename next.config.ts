// next.config.ts
import withMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkPrism from "remark-prism"; // ✅ prism 적용

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkPrism], // ✅ 여기에 추가
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
})(nextConfig);
