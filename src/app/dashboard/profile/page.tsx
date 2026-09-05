"use client";

import { useContext, useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { AuthContext } from "@/components/shared/AuthProvider";
import { updateProfile } from "@/services/api";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (auth?.user) {
      setFullName(auth.user.fullName);
      setEmail(auth.user.email);
    }
  }, [auth?.user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");
    setSaving(true);
    try {
      const user = await updateProfile(fullName, email);
      auth?.setUser(user);
      setStatus("Profile updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div>
          <p className="text-sm font-medium text-brand-cyan">Account</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Profile</h1>
          <p className="mt-2 text-sm text-foreground/60">Keep your learner information up to date.</p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>These details are used across your EduCore account.</CardDescription>
              </div>
              {auth?.user && <Badge variant="info">{auth.user.role.replace("_", " ")}</Badge>}
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input id="fullName" label="Full name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
            <Input id="email" type="email" label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
            {status && <p className="text-sm text-emerald-300">{status}</p>}
            {error && <p className="text-sm text-red-300">{error}</p>}
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
          </form>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
