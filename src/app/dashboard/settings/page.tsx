"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsPage() {
  const { theme } = useTheme();

  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div>
          <p className="text-sm font-medium text-brand-cyan">Preferences</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-2 text-sm text-foreground/60">Adjust the experience to suit how you learn.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Your theme preference is saved on this device.</CardDescription>
          </CardHeader>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="font-medium text-foreground">Color mode</p>
              <p className="mt-1 text-sm capitalize text-foreground/50">Currently using {theme} mode</p>
            </div>
            <ThemeToggle />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Notification preferences are managed from the bell in your header.</CardDescription>
          </CardHeader>
          <p className="text-sm text-foreground/60">Unread notifications remain visible until you mark them as read.</p>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
