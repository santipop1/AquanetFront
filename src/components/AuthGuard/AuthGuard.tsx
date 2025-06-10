"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UseAuth } from "@/providers/AuthProvider";
import {
  protectedRoutes,
  protectedRoutesAdmin,
  protectedRoutesFranchise,
  sharedRoutes
} from "@/utils/protectedRoutes";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, role } = UseAuth();

  // Rutas permitidas por todos los roles

  useEffect(() => {
    if (loading) return;

    const isInProtected = protectedRoutes.has(pathname);
    const isInAdmin = protectedRoutesAdmin.has(pathname);
    const isInFranchise = protectedRoutesFranchise.has(pathname);
    const isShared = sharedRoutes.has(pathname);

    if (!user && (isInProtected || isInAdmin || isInFranchise || isShared)) {
      router.push("/login");
      return;
    }

    // Ya logueado pero en login o registro
    if (user && (pathname === "/login" || pathname === "/registro")) {
      if (role?.id === 1) router.push("/dashboard");
      else if (role?.id === 2) router.push("/dashboard-admin");
      else if (role?.id === 3) router.push("/franquiciasEmpresas");
      return;
    }

    // Verificamos acceso basado en rol solo si no es ruta compartida
    if (!isShared) {
      if (role?.id === 1 && (isInAdmin || isInFranchise)) {
        router.push("/dashboard");
        return;
      }

      if (role?.id === 2 && (isInProtected || isInFranchise)) {
        router.push("/dashboard-admin");
        return;
      }

      if (role?.id === 3 && (isInProtected || isInAdmin)) {
        router.push("/franquiciasEmpresas");
        return;
      }
    }
  }, [user, loading, role, pathname, router]);

  return <>{children}</>;
}
