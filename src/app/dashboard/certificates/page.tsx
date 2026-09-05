"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Card, { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/ResourceState";
import { getCertificates } from "@/services/api";
import type { Certificate } from "@/types";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCertificates()
      .then(setCertificates)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load certificates."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-medium text-brand-cyan">Learning records</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">Certificates</h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/60">Your verified course completions, issued directly from EduCore.</p>
        </div>
        {loading && <LoadingState label="Loading your certificates..." />}
        {!loading && error && <ErrorState message={error} />}
        {!loading && !error && certificates.length === 0 && (
          <EmptyState title="No certificates yet" description="Complete an enrolled course to see its certificate here." />
        )}
        {!loading && !error && certificates.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-2">
            {certificates.map((certificate) => (
              <Card key={certificate.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle>{certificate.course_title || "Completed course"}</CardTitle>
                      <CardDescription>Issued to {certificate.student_name}</CardDescription>
                    </div>
                    <Badge variant="success">Verified</Badge>
                  </div>
                </CardHeader>
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-foreground/40">Issued</p>
                    <p className="mt-1 text-sm text-foreground/80">{new Date(certificate.issued_at).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs text-foreground/40">Certificate #{certificate.id}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
