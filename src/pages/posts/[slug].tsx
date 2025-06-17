import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import MdxContentLayout from "@/components/mdx/MdxContentLayout";
import TableOfContents from "@/components/TableOfContents";
import CustomNote from "@/components/CustomNote";
import { extractToc, TocItem } from "@/lib/toc";
import { getAdjacentPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";

interface Props {
  source: MDXRemoteSerializeResult;
  toc: TocItem[];
  title: string;
  prev: PostMeta | null;
  next: PostMeta | null;
}

export default function PostPage({ source, toc, title, prev, next }: Props) {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 md:space-y-0 md:grid md:grid-cols-[3fr_1fr] md:gap-12">
        {/* ✅ 모바일 전용 목차 */}
        <div className="block md:hidden">
          <TableOfContents toc={toc} />
        </div>

        {/* ✅ 본문 */}
        <article className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <MdxContentLayout>
            <MDXRemote {...source} components={{ CustomNote }} />
          </MdxContentLayout>
          {/* 이전/다음 글 네비게이션 */}
          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            {prev ? (
              <div>
                <div className="text-sm text-muted-foreground">← 이전 글</div>
                <Link
                  href={`/posts/${prev.slug}`}
                  className="hover:underline text-primary"
                >
                  {prev.title}
                </Link>
              </div>
            ) : (
              <div />
            )}

            {next ? (
              <div className="text-right">
                <div className="text-sm text-muted-foreground">다음 글 →</div>
                <Link
                  href={`/posts/${next.slug}`}
                  className="hover:underline text-primary"
                >
                  {next.title}
                </Link>
              </div>
            ) : (
              <div />
            )}
          </div>
        </article>

        {/* ✅ 데스크탑 전용 목차 */}
        <div className="hidden md:block">
          <TableOfContents toc={toc} />
        </div>
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
  const rehypePrettyCode = (await import("rehype-pretty-code")).default;

  const mdxSource = await serialize(content, {
    mdxOptions: {
      format: "mdx",
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolink, { behavior: "wrap" }],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "github-dark",
              light: "github-light",
            },
            keepBackground: false,
            defaultLang: "ts",
          },
        ],
      ],
    },
  });

  const toc = extractToc(content);
  const title = data.title ?? slug;
  const { prev, next } = getAdjacentPosts(slug);

  return {
    props: {
      source: mdxSource,
      toc,
      title,
      prev,
      next,
    },
  };
};
