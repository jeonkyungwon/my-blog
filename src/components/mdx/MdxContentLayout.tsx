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
        "prose-h2:text-3xl prose-h3:text-2xl",
        className
      )}
    >
      {children}
    </article>
  );
}
