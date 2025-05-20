// src/components/AuthGuard.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";

import { protectedRoutes } from "@/app/utils/protectedRoutes";
import { UseAuth } from "@/app/providers/AuthProvider";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = UseAuth();

  useEffect(() => {
    if (!loading) {
      // Si la ruta es protegida y no hay usuario, redirige a login
      if (protectedRoutes.has(pathname) && !user) {
        router.push("/login");
      }
      // Si está logueado y va a login o register, redirige dashboard
      if (user && (pathname === "/login" || pathname === "/register")) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) return <div>Cargando...</div>;

  return <>{children}</>;
}
