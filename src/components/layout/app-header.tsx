"use client";

import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AppHeader() {
  const router = useRouter();
  const { open } = useSidebar();

  return (
    <header className="flex h-14 items-center gap-4 border-b px-6">
      {!open && <SidebarTrigger />}
      <div className="flex-1" />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => router.push("/login")}>
            <LogOut className="mr-2 h-4 w-4" />
            ログアウト
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
