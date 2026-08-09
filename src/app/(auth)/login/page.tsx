import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card, { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Log in to continue your courses.</CardDescription>
        </CardHeader>

        {/* Static UI only — no auth logic wired up yet (Week 1 scope) */}
        <form className="flex flex-col gap-4">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@lgu.edu.pk"
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-foreground/60">
              <input type="checkbox" className="rounded border-white/20" />
              Remember me
            </label>
            <a href="#" className="text-brand-violetLight hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" fullWidth>
            Log In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-brand-violetLight hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </main>
  );
}
