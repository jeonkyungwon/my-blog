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
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          Tech_won
        </Link>

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

        <ThemeToggleButton />
      </div>
    </header>
  );
}
