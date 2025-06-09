import { Card, CardContent } from "@/components/ui/card";

export default function IntroCard() {
  return (
    <Card className="mb-16 mt-4">
      <CardContent className="flex flex-col justify-between h-full">
        <div className="mb-6">
          <p className="text-base font-medium text-foreground">Jeon Kyungwon</p>
          <p className="text-sm text-muted-foreground mt-1">
            peterjkw@naver.com
          </p>
        </div>
        <div className="mt-auto text-sm text-muted-foreground">
          <a
            href="https://github.com/jeonkyungwon"
            className="hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
