import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Tech_won 블로그</title>
        <meta
          name="description"
          content="전경원의 기술과 성장을 기록하는 블로그입니다."
        />
        <meta property="og:title" content="About | Tech_won 블로그" />
        <meta
          property="og:description"
          content="전경원의 기술과 성장을 기록하는 블로그입니다."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://jeonkyungwon-tech-blog.vercel.app/about"
        />
        <meta
          property="og:image"
          content="https://jeonkyungwon-tech-blog.vercel.app/og-image.png"
        />
      </Head>

      <main className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4">About</h1>
        <p className="text-2xl">
          안녕하세요! 이 블로그는 전경원의 기술과 성장을 기록하는 공간입니다.
          <br />
          <br />
          <br />
          추후 업데이트 예정입니다.
        </p>
      </main>
    </>
  );
}
