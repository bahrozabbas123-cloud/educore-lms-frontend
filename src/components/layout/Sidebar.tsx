"use client";

import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "⌂" },
  { label: "Assignments", href: "/assignments", icon: "✓" },
  { label: "Certificates", href: "/dashboard/certificates", icon: "◇" },
  { label: "Profile", href: "/dashboard/profile", icon: "○" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙" },
];

export default function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 overflow-x-auto border-b border-white/10 bg-white/[0.02] p-3 md:w-64 md:flex-col md:overflow-visible md:border-b-0 md:border-r md:p-4">
      <div className="mb-0 flex shrink-0 items-center gap-2 px-2 md:mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-violet to-brand-cyan font-heading font-bold text-white">
          E
        </div>
        <span className="font-heading text-lg font-semibold text-foreground">
          EduCore
        </span>
      </div>

      <nav className="ml-4 flex min-w-max flex-1 gap-1 md:ml-0 md:min-w-0 md:flex-col">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/60 transition hover:bg-white/5 hover:text-foreground"
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="glass-panel hidden rounded-xl p-3 text-xs text-foreground/60 md:block">
        Use the notification bell for updates about your learning activity.
      </div>
    </aside>
  );
}
