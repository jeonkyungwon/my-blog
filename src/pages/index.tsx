import Head from "next/head";
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
      <Head>
        <title>Tech_won | 전경원의 기술 블로그</title>
        <meta
          name="description"
          content="프론트엔드 개발자 전경원의 성장과 기술을 기록하는 블로그입니다."
        />
        <meta property="og:title" content="Tech_won | 전경원의 기술 블로그" />
        <meta
          property="og:description"
          content="프론트엔드 개발자 전경원의 성장과 기술을 기록하는 블로그입니다."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://jeonkyungwon-tech-blog.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://jeonkyungwon-tech-blog.vercel.app/og-image.png"
        />
      </Head>

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
