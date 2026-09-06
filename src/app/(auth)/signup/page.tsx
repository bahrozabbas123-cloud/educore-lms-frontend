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

import { signup } from "@/services/authService";

export default function SignupPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await signup(fullName, email, password);

      setSuccess("Account created. Redirecting to login...");
      window.setTimeout(() => router.push("/login"), 350);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="page-enter w-full max-w-sm shadow-2xl shadow-brand-violet/10">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Join EduCore to start learning.
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="Your name"
          />

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

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
          />

          <label className="flex items-start gap-2 text-xs text-foreground/60">
            <input
              type="checkbox"
              className="mt-0.5 rounded border-white/20"
            />
            I agree to the Terms of Service and Privacy Policy.
          </label>

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
            {loading ? <><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Creating Account...</> : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand-violetLight hover:underline"
          >
            Log in
          </Link>
        </p>
      </Card>
    </main>
  );
}