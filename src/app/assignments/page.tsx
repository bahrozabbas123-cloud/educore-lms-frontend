"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/ResourceState";
import { getAssignments, submitAssignment, type Assignment } from "@/services/api";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selected, setSelected] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAssignments()
      .then(setAssignments)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load assignments."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    setMessage("");
    try {
      const form = new FormData(event.currentTarget);
      await submitAssignment(selected.id, String(form.get("fileUrl") || "") || undefined);
      setMessage("Assignment submitted successfully.");
      setSelected(null);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unable to submit assignment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Weekly Assignments</h1>
          <p className="mt-2 text-sm text-foreground/60">View your assignments and submit your work.</p>
        </div>
        {message && <Card className="text-sm text-emerald-300">{message}</Card>}
        {loading && <LoadingState label="Loading assignments..." />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && assignments.length === 0 && <EmptyState title="No assignments available" description="New work will appear here when it is assigned to your courses." />}
        {!loading && !error && assignments.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{assignment.title}</CardTitle>
                  <Badge variant="warning">Open</Badge>
                </div>
                <CardDescription>{assignment.description || "No description provided."}</CardDescription>
                <p className="mt-4 text-xs text-foreground/50">
                  Due: {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : "No due date"}
                </p>
                <Button className="mt-5 w-full" onClick={() => setSelected(assignment)}>Submit assignment</Button>
              </Card>
            ))}
          </div>
        )}
        {selected && (
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Submit {selected.title}</CardTitle>
                <CardDescription>Provide a file URL for your submission.</CardDescription>
              </div>
              <button type="button" aria-label="Close submission form" onClick={() => setSelected(null)} className="text-foreground/50 hover:text-foreground">×</button>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="flex-1 text-sm text-foreground/70">
                File URL
                <input name="fileUrl" type="url" placeholder="https://..." className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground outline-none focus:border-brand-cyan" />
              </label>
              <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit work"}</Button>
            </form>
          </Card>
        )}
      </div>
    </ProtectedRoute>
  );
}
