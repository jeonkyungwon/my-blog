// src/lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { extractToc, TocItem } from "./toc";

// 글 정보 타입
export type PostMeta = {
  title: string;
  date: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
};

// 슬러그 기반으로 글 가져오기 + 목차 추출
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

// 전체 글 목록 메타 불러오기
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

  // 최신 글이 위로 오도록 정렬
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
