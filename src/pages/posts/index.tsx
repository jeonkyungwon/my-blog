import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

type PostMeta = {
  title: string;
  date: string;
  slug: string;
};

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      slug: filename.replace(".mdx", ""),
    };
  });

  // 최신 글이 위로 오도록 정렬
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    props: {
      posts,
    },
  };
}

export default function PostListPage({ posts }: { posts: PostMeta[] }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📚 블로그 글 목록</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <div className="text-xl font-semibold hover:underline">
                {post.title}
              </div>
              <div className="text-sm text-gray-500">{post.date}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
