"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 좌측: 로고 */}
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          My Blog
        </Link>

        {/* 중앙: 메뉴 */}
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/posts">글 목록</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about">About</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* 우측: 다크모드 버튼 */}
        <ThemeToggleButton />
      </div>
    </header>
  );
}
