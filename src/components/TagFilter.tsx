import React from "react";
import { Button } from "@/components/ui/button";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

export default function TagFilter({
  tags,
  selectedTag,
  onSelect,
}: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={selectedTag === null ? "default" : "outline"}
        onClick={() => onSelect(null)}
        className="rounded-full text-sm"
      >
        All
      </Button>

      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTag === tag ? "default" : "outline"}
          onClick={() => onSelect(tag)}
          className="rounded-full text-sm"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
