// components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UseAuth } from "@/providers/AuthProvider";
import {
  protectedRoutes,
  protectedRoutesAdmin,
  protectedRoutesFranchise
} from "@/utils/protectedRoutes";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, role } = UseAuth();

  useEffect(() => {
    if (loading) return;

    const isInProtected = protectedRoutes.has(pathname);
    const isInAdmin = protectedRoutesAdmin.has(pathname);
    const isInFranchise = protectedRoutesFranchise.has(pathname);

    // 🚫 No logueado y quiere entrar a ruta protegida
    if (!user && (isInProtected || isInAdmin || isInFranchise)) {
      router.push("/login");
      return;
    }

    // ✅ Ya logueado y va a login o registro
    if (user && (pathname === "/login" || pathname === "/registro")) {
      if (role?.id === 1) router.push("/dashboard");
      else if (role?.id === 2) router.push("/dashboard-admin");
      else if (role?.id === 3) router.push("/franquiciasempresas");
      return;
    }

    // 🚫 No tiene rol adecuado para entrar a ruta específica
    if (role?.id === 1 && (isInAdmin || isInFranchise)) {
      router.push("/dashboard");
      return;
    }

    if (role?.id === 2 && (isInProtected || isInFranchise)) {
      router.push("/dashboard-admin");
      return;
    }

    if (role?.id === 3 && (isInProtected || isInAdmin)) {
      router.push("/franquiciasempresas");
      return;
    }
  }, [user, loading, role, pathname, router]);

  return <>{children}</>;
}
