// next.config.ts
import withMDX from "@next/mdx";

const withMdx = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMdx(nextConfig);
