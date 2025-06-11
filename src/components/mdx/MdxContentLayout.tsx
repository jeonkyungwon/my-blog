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
        "prose-h2:scroll-mt-20 prose-h3:scroll-mt-20",
        "prose-pre:bg-[#1e1e1e] prose-pre:text-white prose-pre:rounded-md prose-pre:px-4 prose-pre:py-2",
        "prose-code:bg-zinc-200 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm",
        "prose-blockquote:border-l-4 prose-blockquote:border-muted dark:prose-blockquote:text-zinc-300 prose-blockquote:pl-4",
        className
      )}
    >
      {children}
    </article>
  );
}
