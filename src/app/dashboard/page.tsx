"use client";

import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useEffect, useState } from "react";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getDashboard } from "@/services/api";
import { ErrorState, LoadingState } from "@/components/shared/ResourceState";

export default function DashboardPage() {
  const [data, setData] = useState<{ enrolledCourses: number; pendingAssignments: number; certificatesEarned: number } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboard().then(setData).catch((err) => setError(err instanceof Error ? err.message : "Unable to load dashboard."));
  }, []);

  const summaryCards = data ? [
    { title: "Enrolled Courses", value: data.enrolledCourses, badge: "Live" as const },
    { title: "Pending Assignments", value: data.pendingAssignments, badge: "Live" as const },
    { title: "Certificates Earned", value: data.certificatesEarned, badge: "Live" as const },
  ] : [];

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6">
        {error && <ErrorState message={error} />}
        {!data && !error && <LoadingState label="Loading your learning overview..." />}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{card.title}</CardTitle>
                  <Badge variant="info">{card.badge}</Badge>
                </div>
              </CardHeader>

              <p className="font-heading text-3xl font-bold text-foreground">
                {card.value}
              </p>
            </Card>
          ))}
        </div>

        <Card className="flex flex-col justify-center gap-2 py-10">
          <CardTitle>Your learning overview</CardTitle>
          <CardDescription>
            Keep an eye on upcoming work and return here as your course progress grows.
          </CardDescription>
        </Card>
      </div>
    </ProtectedRoute>
  );
}