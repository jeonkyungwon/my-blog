import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import Head from "next/head";
import MdxContentLayout from "@/components/mdx/MdxContentLayout";
import TableOfContents from "@/components/TableOfContents";
import CustomNote from "@/components/CustomNote";
import { extractToc, TocItem } from "@/lib/toc";
import { getAdjacentPosts } from "@/lib/posts";
import { extractDescription } from "@/lib/seo"; // ✅ 유틸 추가
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
  description: string; // ✅ 추가
}

export default function PostPage({
  source,
  toc,
  title,
  prev,
  next,
  frontmatter,
  description,
}: Props) {
  return (
    <>
      {/* ✅ SEO 메타 태그 */}
      <Head>
        <title>{`${title} | Tech_won 블로그`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Tech_won 블로그`} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`https://jeonkyungwon-tech-blog.vercel.app/posts/${title}`}
        />
        <meta
          property="og:image"
          content="https://jeonkyungwon-tech-blog.vercel.app/og-image.png"
        />
      </Head>

      <div className="relative">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">{title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-32">
            {frontmatter.tags?.[0] && (
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

          <article className="prose max-w-none">
            <MdxContentLayout>
              <MDXRemote {...source} components={{ CustomNote }} />
            </MdxContentLayout>

            <div className="flex justify-between items-start w-full mt-12 pt-4 border-t-4 border-border">
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

        <div
          className="hidden xl:block fixed top-32 w-64 max-h-[80vh] overflow-auto"
          style={{ right: "calc((100% - 768px)/2 - 320px)" }}
        >
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
  const description = data.description ?? extractDescription(content); // ✅ 자동 설명 추출
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
      description,
    },
  };
};
