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
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPostsMeta();
  return {
    props: { posts },
  };
};
