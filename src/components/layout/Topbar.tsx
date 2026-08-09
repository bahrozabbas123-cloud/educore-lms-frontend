import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.02] px-6">
      <div>
        <h1 className="font-heading text-base font-semibold text-foreground">
          Welcome back, Student 👋
        </h1>
        <p className="text-xs text-foreground/50">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan" />
      </div>
    </header>
  );
}
