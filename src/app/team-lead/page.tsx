"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/ResourceState";
import { getUsersWithRoles } from "@/services/api";

type UserWithRole = { id: number; full_name: string; email: string; role: string };

export default function TeamLeadDashboard() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsersWithRoles()
      .then(setUsers)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load team members."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-6">
        <div className="page-enter">
          <p className="text-sm font-medium text-brand-cyan">Team administration</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Team Lead Dashboard</h1>
          <p className="mt-2 text-sm text-foreground/60">View the current EduCore users and their assigned roles.</p>
        </div>
        {!loading && !error && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Card><p className="text-sm text-foreground/50">Total members</p><p className="mt-2 font-heading text-3xl font-bold text-foreground">{users.length}</p></Card><Card><p className="text-sm text-foreground/50">Students</p><p className="mt-2 font-heading text-3xl font-bold text-foreground">{users.filter((user) => user.role === "Student").length}</p></Card><Card><p className="text-sm text-foreground/50">Instructors</p><p className="mt-2 font-heading text-3xl font-bold text-foreground">{users.filter((user) => user.role === "Instructor").length}</p></Card><Card><p className="text-sm text-foreground/50">Team leads</p><p className="mt-2 font-heading text-3xl font-bold text-foreground">{users.filter((user) => user.role === "Team Lead").length}</p></Card></div>}
        {loading && <LoadingState label="Loading team members..." />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && users.length === 0 && <EmptyState title="No team members found" description="Users will appear here once they register." />}
        {!loading && !error && users.length > 0 && (
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-foreground/50">
                  <tr><th className="px-5 py-4">Member</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Role</th></tr>
                </thead>
                <tbody>
                  {users.map((user) => <tr key={user.id} className="border-b border-white/5 last:border-0"><td className="px-5 py-4 font-medium text-foreground">{user.full_name}</td><td className="px-5 py-4 text-foreground/60">{user.email}</td><td className="px-5 py-4"><Badge variant="info">{user.role}</Badge></td></tr>)}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  );
}
