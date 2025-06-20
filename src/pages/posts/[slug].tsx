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

interface Frontmatter {
  title: string;
  date?: string;
  tags?: string[];
}

interface Props {
  source: MDXRemoteSerializeResult;
  toc: TocItem[];
  title: string;
  prev: PostMeta | null;
  next: PostMeta | null;
  frontmatter: Frontmatter;
}

export default function PostPage({
  source,
  toc,
  title,
  prev,
  next,
  frontmatter,
}: Props) {
  return (
    <>
      <div className="relative">
        {/* 본문 */}
        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* 제목 */}
          <h1 className="text-4xl font-bold mb-8">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-32">
            {frontmatter.tags && frontmatter.tags[0] && (
              <span className="text-blue-500 font-semibold">
                {frontmatter.tags[0]}
              </span>
            )}
            {frontmatter.date && (
              <div className="flex items-center gap-1">
                <time dateTime={frontmatter.date}>{frontmatter.date}</time>
              </div>
            )}
          </div>

          {/* 본문 내용 */}
          <article className="prose max-w-none">
            <MdxContentLayout>
              <MDXRemote {...source} components={{ CustomNote }} />
            </MdxContentLayout>

            {/* 이전/다음 글 */}
            <div className="flex justify-between items-start w-full mt-12 pt-4 border-t-4 border-border ">
              {prev ? (
                <div className="max-w-sm">
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
                <div className="max-w-sm text-right">
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
        </div>

        {/* 데스크탑 전용 목차 */}
        <div className="hidden xl:block fixed top-24 right-12 w-64 max-h-[80vh] overflow-auto">
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
  const remarkPrism = (await import("remark-prism")).default;

  const mdxSource = await serialize(content, {
    mdxOptions: {
      format: "mdx",
      remarkPlugins: [remarkPrism],
      rehypePlugins: [rehypeSlug, [rehypeAutolink, { behavior: "wrap" }]],
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
      frontmatter: {
        title,
        date: data.date ?? null,
        tags: data.tags ?? [],
      },
    },
  };
};
