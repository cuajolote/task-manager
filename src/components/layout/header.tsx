"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">Task Manager</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {user?.email}
          </span>
          <Button variant="outline" size="sm" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
