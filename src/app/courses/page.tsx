"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/ResourceState";
import { getCourses, type Course } from "@/services/api";

const statusLabels = { completed: "Completed", in_progress: "In progress", not_started: "Not started" } as const;

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load courses."))
      .finally(() => setLoading(false));
  }, []);

  return <ProtectedRoute><div className="mx-auto flex max-w-6xl flex-col gap-6">
    <div className="page-enter"><p className="text-sm font-medium text-brand-cyan">Your learning path</p><h1 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">Courses</h1><p className="mt-2 max-w-2xl text-sm text-foreground/60">Track your enrolled courses, assignment progress, and next steps.</p></div>
    {loading && <LoadingState label="Loading your courses..." />}
    {!loading && error && <ErrorState message={error} />}
    {!loading && !error && courses.length === 0 && <EmptyState title="No courses available yet" description="Your enrolled courses will appear here when a course is assigned to your account." />}
    {!loading && !error && courses.length > 0 && <div className="grid gap-5 md:grid-cols-2">{courses.map((course) => <Card key={course.id} className="group flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:border-brand-violetLight/30 hover:shadow-2xl hover:shadow-brand-violet/10"><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle>{course.title}</CardTitle><CardDescription>{course.description || "Continue building your learning momentum."}</CardDescription></div><Badge variant={course.status === "completed" ? "success" : course.status === "in_progress" ? "info" : "warning"}>{statusLabels[course.status]}</Badge></div></CardHeader><div className="mt-auto"><div className="flex items-center justify-between text-xs text-foreground/60"><span>{course.progress}% complete</span><span>{course.completed_assignments}/{course.total_assignments} assignments</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all" style={{ width: `${course.progress}%` }} /></div><div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-foreground/50"><span>Instructor: {course.instructor || "Not assigned"}</span><Link href="/assignments" className="inline-flex items-center rounded-lg bg-gradient-to-r from-brand-violet to-brand-cyan px-3 py-1.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90">{course.progress > 0 ? "Continue" : "View course"}</Link></div></div></Card>)}</div>}
    <Link href="/assignments" className="text-sm font-medium text-brand-cyan transition-colors hover:text-brand-violetLight">Review assignment deadlines <span aria-hidden="true" className="ml-1">-&gt;</span></Link>
  </div></ProtectedRoute>;
}