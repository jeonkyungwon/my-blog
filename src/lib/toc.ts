import { visit } from "unist-util-visit";
import { fromMarkdown } from "mdast-util-from-markdown";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function extractToc(markdown: string): TocItem[] {
  const tree = fromMarkdown(markdown);
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: any) => {
    const depth = node.depth;
    if (depth === 2 || depth === 3) {
      const text = node.children
        .filter((c: any) => c.type === "text")
        .map((c: any) => c.value)
        .join("");
      const id = text.toLowerCase().replace(/\s+/g, "-");
      toc.push({ id, text, level: depth });
    }
  });

  return toc;
}
