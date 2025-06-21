import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { extractToc, TocItem } from "./toc";

export type PostMeta = {
  title: string;
  date: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

export function getPostBySlug(slug: string): {
  meta: PostMeta;
  content: string;
  toc: TocItem[];
} {
  const filePath = path.join(process.cwd(), "src/posts", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContents);

  const toc = extractToc(content);

  return {
    meta: {
      ...(data as PostMeta),
      slug,
    },
    content,
    toc,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  const postsDir = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDir);

  const posts: PostMeta[] = filenames.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const fullPath = path.join(postsDir, filename);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);

    return {
      ...(data as PostMeta),
      slug,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(): PostMeta[] {
  const allPosts = getAllPostsMeta();
  return allPosts.filter((post) => post.featured);
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPostsMeta();
  const index = posts.findIndex((post) => post.slug === slug);

  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const next = index > 0 ? posts[index - 1] : null;

  return { prev, next };
}
