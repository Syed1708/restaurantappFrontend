"use client";

import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Topbar({ user, setSidebarOpen }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white border-b p-4 shadow-sm">
      <div className="flex items-center space-x-2">
        {/* Sidebar toggle for mobile */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="md:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
        <h2 className="font-semibold text-lg">Welcome, {user.name}</h2>
      </div>

      {/* Profile dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl || ""} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="hidden md:block capitalize">{user.role}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
