import { TocItem } from "@/lib/toc";
import { useActiveSection } from "@/hooks/useActiveSection";

interface Props {
  toc: TocItem[];
}

export default function TableOfContents({ toc }: Props) {
  const sectionIds = toc.map((item) => item.id);
  const activeId = useActiveSection(sectionIds);

  return (
    <aside className="text-sm sticky top-24 space-y-3">
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className={`block transition-colors hover:underline ${
                activeId === item.id
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
