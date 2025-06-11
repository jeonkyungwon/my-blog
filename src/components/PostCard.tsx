"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
};

export default function PostCard({
  slug,
  title,
  date,
  description,
  image,
  tags,
}: Props) {
  return (
    <Link href={`/posts/${slug}`} className="block hover:opacity-90 transition">
      <Card className="overflow-hidden h-full flex flex-col">
        <AspectRatio ratio={16 / 9}>
          <Image src={image} alt={title} fill className="object-cover" />
        </AspectRatio>

        <CardContent className="flex-1 flex flex-col justify-between p-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            <h2 className="text-xl font-semibold line-clamp-2 mb-4">{title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
