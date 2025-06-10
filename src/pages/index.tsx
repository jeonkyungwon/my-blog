import { GetStaticProps } from "next";
import PostCard from "@/components/PostCard";
import { getFeaturedPosts } from "@/lib/posts";
import { PostMeta } from "@/lib/posts";
import IntroCard from "@/components/IntroCard";

interface Props {
  featuredPosts: PostMeta[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      featuredPosts,
    },
  };
};

export default function Home({ featuredPosts }: Props) {
  return (
    <>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <IntroCard />
        <h1 className="text-2xl font-bold mb-6">✨추천 글</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
