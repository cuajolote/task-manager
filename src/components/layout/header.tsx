"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">Task Manager</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {initials}
            </div>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.name}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
