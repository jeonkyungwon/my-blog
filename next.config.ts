import withMDX from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkPrism from "remark-prism";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkPrism],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
})(nextConfig);
