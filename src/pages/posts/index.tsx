import { GetStaticProps } from "next";
import { getAllPostsMeta, PostMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPostsMeta();
  return {
    props: {
      posts,
    },
  };
};

export default function PostListPage({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">📚 모든 글</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
