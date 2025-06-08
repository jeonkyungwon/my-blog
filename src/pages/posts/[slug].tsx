import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import TableOfContents from "@/components/TableOfContents";
import CustomNote from "@/components/CustomNote";
import { extractToc, TocItem } from "@/lib/toc";

interface Props {
  source: MDXRemoteSerializeResult;
  toc: TocItem[];
  title: string;
}

export default function PostPage({ source, toc, title }: Props) {
  return (
    <>
      <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_1fr] gap-12 px-4 py-8">
        <article className="prose dark:prose-invert break-words overflow-hidden">
          <h1>{title}</h1>
          <MDXRemote {...source} components={{ CustomNote }} />
        </article>
        <TableOfContents toc={toc} />
      </div>
    </>
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
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);

  const rehypeSlug = (await import("rehype-slug")).default;
  const rehypeAutolink = (await import("rehype-autolink-headings")).default;

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, [rehypeAutolink, { behavior: "wrap" }]],
    },
  });

  const toc = extractToc(content);
  const title = data.title ?? slug;

  return {
    props: {
      source: mdxSource,
      toc,
      title,
    },
  };
};
