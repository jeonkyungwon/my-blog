// src/components/IntroCard.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function IntroCard() {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold">안녕하세요 👋</h2>
        <p className="text-muted-foreground mt-1">
          프론트엔드 개발자 전경원입니다. 사용자 중심의 인터페이스와 기술적
          깊이를 모두 고민하는 개발을 지향하고 있습니다.
        </p>
        <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
          <span>📧 peterjkw@naver.com</span>
          <a
            href="https://github.com/jeonkyungwon"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            🐱 GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
