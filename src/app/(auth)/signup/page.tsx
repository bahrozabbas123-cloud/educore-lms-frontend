import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card, { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Join EduCore to start learning.</CardDescription>
        </CardHeader>

        {/* Static UI only — no auth logic wired up yet (Week 1 scope) */}
        <form className="flex flex-col gap-4">
          <Input id="fullName" type="text" label="Full Name" placeholder="Your name" />
          <Input id="email" type="email" label="Email" placeholder="you@lgu.edu.pk" />
          <Input id="password" type="password" label="Password" placeholder="••••••••" />
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
          />

          <label className="flex items-start gap-2 text-xs text-foreground/60">
            <input type="checkbox" className="mt-0.5 rounded border-white/20" />
            I agree to the Terms of Service and Privacy Policy.
          </label>

          <Button type="submit" fullWidth>
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-violetLight hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </main>
  );
}
