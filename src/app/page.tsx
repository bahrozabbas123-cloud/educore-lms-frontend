import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet to-brand-cyan font-heading text-2xl font-bold text-white">
        E
      </div>

      <h1 className="font-heading text-4xl font-bold text-foreground">
        Welcome to <span className="gradient-text">EduCore LMS</span>
      </h1>
      <p className="max-w-md text-sm text-foreground/60">
        A Learning Management System portal for students, instructors, and
        team leads. This is a static Week 1 frontend build — no live data yet.
      </p>

      <div className="flex gap-3">
        <Link href="/login">
          <Button variant="primary">Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">View Dashboard Shell</Button>
        </Link>
      </div>
    </main>
  );
}
