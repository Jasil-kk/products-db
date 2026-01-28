"use client";

import { ModeToggle } from "../ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MobileSidebar } from "./mobile-sidebar";

export function Header() {
  return (
    <header className="h-14 border-b flex items-center px-5 md:px-6 z-40">
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      <h1 className="ml-4 font-semibold">Products</h1>
      <div className="ml-auto flex items-center gap-5">
        <ModeToggle />
        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
