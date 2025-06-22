import Head from "next/head";
import { useState } from "react";
import { getAllPostsMeta } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import TagFilter from "@/components/TagFilter";
import PostCard from "@/components/PostCard";
import { GetStaticProps } from "next";

interface Props {
  posts: PostMeta[];
}

export default function PostListPage({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <Head>
        <title>Blog | Tech_won 블로그</title>
        <meta
          name="description"
          content="Tech_won 블로그의 모든 글을 태그로 필터링해 탐색해보세요."
        />
        <meta property="og:title" content="글 목록 | Tech_won 블로그" />
        <meta
          property="og:description"
          content="Tech_won 블로그의 모든 글을 태그로 필터링해 탐색해보세요."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://jeonkyungwon-tech-blog.vercel.app/posts"
        />
        <meta
          property="og:image"
          content="https://jeonkyungwon-tech-blog.vercel.app/og-image.png"
        />
      </Head>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onSelect={setSelectedTag}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPostsMeta();
  return {
    props: { posts },
  };
};
