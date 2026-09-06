"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

import { login } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const user = await login(email, password);

      setUser(user);
      setSuccess("Login successful. Redirecting...");

      window.setTimeout(() => {
        router.push(
          user.role === "team_lead"
            ? "/team-lead"
            : user.role === "instructor"
              ? "/dashboard/instructor"
              : "/dashboard"
        );
      }, 220);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to log in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="page-enter w-full max-w-sm shadow-2xl shadow-brand-violet/10">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Log in to continue your courses.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="you@lgu.edu.pk"
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-foreground/60">
              <input
                type="checkbox"
                className="rounded border-white/20"
              />
              Remember me
            </label>

            <a
              href="#"
              className="text-brand-violetLight hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {error && (
            <p role="alert" className="feedback-enter text-sm text-red-500">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="feedback-enter text-sm text-emerald-400">
              {success}
            </p>
          )}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? <><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Logging in...</> : "Log In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-brand-violetLight hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </main>
  );
}