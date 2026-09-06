"use client";

import ThemeToggle from "@/components/shared/ThemeToggle";
import NotificationBell from "@/components/layout/NotificationBell";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/shared/AuthProvider";

export default function Topbar() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const userName = auth?.user?.fullName || "Student";

  function handleLogout() {
    auth?.logout();
    router.push("/login");
  }

  return (
    <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3 sm:px-6">
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-heading text-sm font-semibold text-foreground sm:text-base">
          Welcome back, {userName}
        </h1>
        <p className="hidden text-xs text-foreground/50 sm:block">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <NotificationBell />
        <ThemeToggle />

        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan" />

        <button
          onClick={handleLogout}
          className="rounded-lg border border-white/10 px-2.5 py-2 text-xs text-foreground/70 transition hover:bg-white/10 hover:text-foreground sm:px-3 sm:text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}