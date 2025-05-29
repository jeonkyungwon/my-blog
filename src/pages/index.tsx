"use client";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-gray-900 text-black dark:text-white">
        <h1 className="text-2xl font-bold">홈페이지 다크모드 테스트 🌙</h1>
      </main>
    </>
  );
}
