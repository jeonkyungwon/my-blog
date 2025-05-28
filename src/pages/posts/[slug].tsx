import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import CustomNote from "@/components/CustomNote";

interface Props {
  source: MDXRemoteSerializeResult;
}

export default function PostPage({ source }: Props) {
  return (
    <main className="prose dark:prose-invert mx-auto px-4 py-8">
      <MDXRemote {...source} components={{ CustomNote }} />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDir);
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".mdx", "") },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), "src/posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(source);
  const mdxSource = await serialize(content);

  return { props: { source: mdxSource } };
};
