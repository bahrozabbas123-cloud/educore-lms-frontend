"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { AuthContext } from "@/components/shared/AuthProvider";
import { getAssignments, getCourses, getDashboard, getNotifications, type Assignment, type Course, type Notification } from "@/services/api";
import { ErrorState, LoadingState } from "@/components/shared/ResourceState";

function formatDate(value: string | null) {
  if (!value) return "No deadline";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value));
}

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState<{ enrolledCourses: number; pendingAssignments: number; certificatesEarned: number } | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getDashboard(), getCourses(), getAssignments(), getNotifications()])
      .then(([dashboard, enrolledCourses, availableAssignments, recentNotifications]) => {
        setData(dashboard);
        setCourses(enrolledCourses);
        setAssignments(availableAssignments);
        setNotifications(recentNotifications);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load your dashboard."));
  }, []);

  const averageProgress = courses.length ? Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length) : 0;
  const upcoming = assignments.filter((assignment) => !assignment.due_date || new Date(assignment.due_date) >= new Date()).slice(0, 3);
  const summaryCards = data ? [
    { title: "Enrolled courses", value: data.enrolledCourses, href: "/courses", detail: "View your learning path", variant: "info" as const },
    { title: "Pending assignments", value: data.pendingAssignments, href: "/assignments", detail: "Review upcoming work", variant: "warning" as const },
    { title: "Certificates earned", value: data.certificatesEarned, href: "/dashboard/certificates", detail: "View achievements", variant: "success" as const },
  ] : [];

  return <ProtectedRoute><div className="flex flex-col gap-6">
    <section className="page-enter overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-violet/20 via-white/[0.04] to-brand-cyan/10 p-6 sm:p-8"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="text-sm font-medium text-brand-cyan">Your learning overview</p><h1 className="mt-2 max-w-2xl font-heading text-3xl font-bold text-foreground sm:text-4xl">Welcome back, {auth?.user?.fullName?.split(" ")[0] || "learner"}.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-foreground/60">Pick up where you left off, keep deadlines in sight, and make steady progress today.</p></div><div className="flex flex-wrap gap-3"><Link href="/assignments" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-brand-violet to-brand-cyan px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90">View assignments</Link><Link href="/courses" className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/10">Browse courses</Link></div></div></section>
    {error && <ErrorState message={error} />}
    {!data && !error && <LoadingState label="Loading your learning overview..." />}
    {data && <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{summaryCards.map((card) => <Link key={card.title} href={card.href} className="group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violetLight/60"><Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:border-brand-violetLight/30 group-hover:shadow-2xl group-hover:shadow-brand-violet/10"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-foreground/60">{card.title}</p><p className="mt-3 font-heading text-3xl font-bold text-foreground">{card.value}</p></div><Badge variant={card.variant}>Live</Badge></div><p className="mt-5 text-xs text-foreground/50 transition-colors group-hover:text-foreground/80">{card.detail} <span aria-hidden="true">-&gt;</span></p></Card></Link>)}</div>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"><Card><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle>Learning progress</CardTitle><CardDescription>Average progress across your enrolled courses.</CardDescription></div><Badge variant={averageProgress === 100 ? "success" : "info"}>{averageProgress}%</Badge></div></CardHeader><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all" style={{ width: `${averageProgress}%` }} /></div><div className="mt-4 flex items-center justify-between text-xs text-foreground/50"><span>{courses.length ? `${courses.length} course${courses.length === 1 ? "" : "s"} tracked` : "No enrolled courses yet"}</span><Link href="/courses" className="font-medium text-brand-cyan hover:text-brand-violetLight">View courses</Link></div></Card><Card><CardHeader><CardTitle>Quick actions</CardTitle><CardDescription>Jump into the work that matters.</CardDescription></CardHeader><div className="flex flex-col gap-2"><Link href="/assignments" className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-foreground transition hover:bg-white/[0.07]">Submit an assignment <span className="float-right text-foreground/40">-&gt;</span></Link><Link href="/dashboard/certificates" className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-foreground transition hover:bg-white/[0.07]">Review certificates <span className="float-right text-foreground/40">-&gt;</span></Link></div></Card></div>
      <div className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><div className="flex items-center justify-between gap-3"><div><CardTitle>Upcoming deadlines</CardTitle><CardDescription>Assignments returned by the learning API.</CardDescription></div><Link href="/assignments" className="text-xs font-medium text-brand-cyan hover:text-brand-violetLight">See all</Link></div></CardHeader>{upcoming.length ? <div className="flex flex-col gap-3">{upcoming.map((assignment) => <div key={assignment.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3"><div className="min-w-0"><p className="truncate text-sm font-medium text-foreground">{assignment.title}</p><p className="mt-1 text-xs text-foreground/50">Course #{assignment.course_id}</p></div><Badge variant="warning">{formatDate(assignment.due_date)}</Badge></div>)}</div> : <div className="rounded-xl border border-dashed border-white/15 p-5 text-sm text-foreground/55">No upcoming assignments. Your next task will appear here.</div>}</Card><Card><CardHeader><div className="flex items-center justify-between gap-3"><div><CardTitle>Recent activity</CardTitle><CardDescription>Your latest notification activity.</CardDescription></div><span className="text-xs text-foreground/40">{notifications.length} total</span></div></CardHeader>{notifications.length ? <div className="flex flex-col gap-3">{notifications.slice(0, 3).map((notification) => <div key={notification.id} className={`rounded-xl border border-white/10 p-3 ${notification.is_read ? "bg-white/[0.02]" : "bg-brand-cyan/[0.06]"}`}><div className="flex gap-3"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notification.is_read ? "bg-white/20" : "bg-brand-cyan"}`} /><p className="text-sm text-foreground/80">{notification.message}</p></div></div>)}</div> : <div className="rounded-xl border border-dashed border-white/15 p-5 text-sm text-foreground/55">You&apos;re all caught up. New activity will appear here.</div>}</Card></div>
    </>}
  </div></ProtectedRoute>;
}