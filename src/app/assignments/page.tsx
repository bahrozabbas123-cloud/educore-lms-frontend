"use client";

import { useEffect, useMemo, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/ResourceState";
import { getAssignments, submitAssignment, type Assignment } from "@/services/api";

function deadline(assignment: Assignment) {
  if (!assignment.due_date) return "No deadline";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(assignment.due_date));
}

function isOverdue(assignment: Assignment) {
  return Boolean(assignment.due_date && new Date(assignment.due_date).getTime() < Date.now());
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selected, setSelected] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAssignments().then(setAssignments).catch((err) => setError(err instanceof Error ? err.message : "Unable to load assignments.")).finally(() => setLoading(false));
  }, []);

  const groups = useMemo(() => ({
    overdue: assignments.filter(isOverdue),
    upcoming: assignments.filter((assignment) => !isOverdue(assignment) && assignment.due_date),
    open: assignments.filter((assignment) => !assignment.due_date),
  }), [assignments]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setSubmitting(true); setMessage("");
    try {
      const form = new FormData(event.currentTarget);
      await submitAssignment(selected.id, String(form.get("fileUrl") || "") || undefined);
      setMessage("Assignment submitted successfully."); setSelected(null);
    } catch (err) { setMessage(err instanceof Error ? err.message : "Unable to submit assignment."); } finally { setSubmitting(false); }
  }

  function AssignmentCard({ assignment }: { assignment: Assignment }) {
    const overdue = isOverdue(assignment);
    return <Card className="flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:border-brand-violetLight/30"><div className="flex items-start justify-between gap-3"><CardTitle>{assignment.title}</CardTitle><Badge variant={overdue ? "danger" : "warning"}>{overdue ? "Past due" : "Open"}</Badge></div><CardDescription>{assignment.description || "No description provided."}</CardDescription><div className="mt-auto pt-5"><div className="flex items-center justify-between text-xs text-foreground/50"><span>Course #{assignment.course_id}</span><span>{deadline(assignment)}</span></div><Button className="mt-4 w-full" onClick={() => setSelected(assignment)}>Submit assignment</Button></div></Card>;
  }

  return <ProtectedRoute><div className="mx-auto flex max-w-6xl flex-col gap-6"><div className="page-enter"><p className="text-sm font-medium text-brand-cyan">Keep momentum</p><h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">Assignments</h1><p className="mt-2 max-w-2xl text-sm text-foreground/60">Stay ahead of deadlines and submit work directly to EduCore.</p></div>{message && <Card className="border-emerald-400/20 text-sm text-emerald-300">{message}</Card>}{loading && <LoadingState label="Loading assignments..." />}{!loading && error && <ErrorState message={error} />}{!loading && !error && <><div className="grid gap-4 sm:grid-cols-3"><Card><p className="text-sm text-foreground/50">Total assignments</p><p className="mt-2 font-heading text-3xl font-bold text-foreground">{assignments.length}</p></Card><Card><p className="text-sm text-foreground/50">Upcoming</p><p className="mt-2 font-heading text-3xl font-bold text-foreground">{groups.upcoming.length}</p></Card><Card><p className="text-sm text-foreground/50">Past due</p><p className="mt-2 font-heading text-3xl font-bold text-foreground">{groups.overdue.length}</p></Card></div>{assignments.length === 0 && <EmptyState title="No assignments available" description="New work will appear here when it is assigned to your courses." />}{groups.overdue.length > 0 && <section><div className="mb-3 flex items-end justify-between"><div><h2 className="font-heading text-xl font-semibold text-foreground">Past due</h2><p className="mt-1 text-sm text-foreground/50">These deadlines have passed and still need attention.</p></div></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{groups.overdue.map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} />)}</div></section>}{groups.upcoming.length > 0 && <section><div className="mb-3"><h2 className="font-heading text-xl font-semibold text-foreground">Upcoming</h2><p className="mt-1 text-sm text-foreground/50">Plan your next submission.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{groups.upcoming.map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} />)}</div></section>}{groups.open.length > 0 && <section><div className="mb-3"><h2 className="font-heading text-xl font-semibold text-foreground">Open work</h2><p className="mt-1 text-sm text-foreground/50">Assignments without a published deadline.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{groups.open.map((assignment) => <AssignmentCard key={assignment.id} assignment={assignment} />)}</div></section>}</>}</div>{selected && <Card className="fixed inset-x-4 bottom-4 z-30 mx-auto max-w-2xl shadow-2xl shadow-black/30 sm:inset-x-auto"><div className="flex items-start justify-between gap-4"><div><CardTitle>Submit {selected.title}</CardTitle><CardDescription>Provide a file URL for your submission.</CardDescription></div><button type="button" aria-label="Close submission form" onClick={() => setSelected(null)} className="text-2xl leading-none text-foreground/50 transition hover:text-foreground">×</button></div><form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end"><label className="flex-1 text-sm text-foreground/70">File URL<input name="fileUrl" type="url" placeholder="https://..." className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground outline-none transition focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20" /></label><Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit work"}</Button></form></Card>}</ProtectedRoute>;
}