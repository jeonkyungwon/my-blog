import { visit } from "unist-util-visit";
import { fromMarkdown } from "mdast-util-from-markdown";
import type { Heading, Text } from "mdast";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractToc(markdown: string): TocItem[] {
  const tree = fromMarkdown(markdown);
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: Heading) => {
    const depth = node.depth;
    if (depth === 2 || depth === 3) {
      const text = node.children
        .filter((c): c is Text => c.type === "text")
        .map((c) => c.value)
        .join("");
      const id = slugify(text);
      toc.push({ id, text, level: depth });
    }
  });

  return toc;
}
