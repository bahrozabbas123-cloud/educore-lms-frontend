"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/shared/AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (auth && !auth.isAuthenticated) {
      router.replace("/login");
    }
  }, [auth, router]);

  if (!auth || !auth.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}