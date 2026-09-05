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
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.02] px-6">
      <div className="min-w-0">
        <h1 className="font-heading text-base font-semibold text-foreground">
          Welcome back, {userName}
        </h1>
        <p className="text-xs text-foreground/50">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <ThemeToggle />

        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan" />

        <button
          onClick={handleLogout}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-foreground/70 transition hover:bg-white/10 hover:text-foreground"
        >
          Logout
        </button>
      </div>
    </header>
  );
}