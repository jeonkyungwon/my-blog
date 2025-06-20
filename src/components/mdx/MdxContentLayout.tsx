// components/mdx/MdxContentLayout.tsx
"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MdxContentLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MdxContentLayout({
  children,
  className,
}: MdxContentLayoutProps) {
  return (
    <article
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        // ↓↓↓ 이 라인 잠시 제거하고 테스트해보세요
        // "prose-pre:bg-transparent prose-code:bg-transparent",
        // "prose-pre:p-0 prose-code:p-0",
        "prose-h2:text-3xl prose-h3:text-2xl",
        className
      )}
    >
      {children}
    </article>
  );
}
