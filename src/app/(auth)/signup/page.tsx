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
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

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

      router.push("/login");
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
      <Card className="w-full max-w-sm">
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
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
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