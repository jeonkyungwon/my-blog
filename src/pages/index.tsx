import Navbar from "@/components/Navbar";
import { getAllPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { PostMeta } from "@/lib/posts";
import Footer from "@/components/Footer";

export async function getStaticProps() {
  const posts = getAllPostsMeta();
  return {
    props: { posts },
  };
}

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">📚 최신 글</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.slice(0, 2).map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
