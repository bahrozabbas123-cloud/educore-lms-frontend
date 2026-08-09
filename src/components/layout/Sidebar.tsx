"use client";

const navItems = [
  { label: "Overview", href: "#", icon: "🏠" },
  { label: "Courses", href: "#", icon: "📚" },
  { label: "Assignments", href: "#", icon: "📝" },
  { label: "Certificates", href: "#", icon: "🎓" },
  { label: "Settings", href: "#", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-white/[0.02] p-4 md:flex md:flex-col">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-violet to-brand-cyan font-heading font-bold text-white">
          E
        </div>
        <span className="font-heading text-lg font-semibold text-foreground">
          EduCore
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              index === 0
                ? "bg-white/10 text-foreground"
                : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="glass-panel rounded-xl p-3 text-xs text-foreground/60">
        Static shell — data wiring comes later in the project.
      </div>
    </aside>
  );
}
