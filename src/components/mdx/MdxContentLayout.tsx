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
        "prose-pre:bg-transparent prose-code:bg-transparent",
        "prose-h2:text-3xl prose-h3:text-2xl",
        "prose-pre:p-0 prose-code:p-0",
        className
      )}
    >
      {children}
    </article>
  );
}
