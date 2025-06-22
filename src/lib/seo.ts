export function extractDescription(content: string): string {
  const firstParagraph = content
    .split("\n\n")[0]
    .replace(/[#>*_\-`]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();

  return firstParagraph.slice(0, 150);
}
