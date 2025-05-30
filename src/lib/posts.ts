import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
};

export function getAllPostsMeta(): PostMeta[] {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts: PostMeta[] = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(".mdx", ""),
      title: data.title,
      date: data.date,
      description: data.description,
      image: data.image,
      tags: data.tags || [],
    };
  });

  // 최신 글이 위로 오도록 정렬
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
