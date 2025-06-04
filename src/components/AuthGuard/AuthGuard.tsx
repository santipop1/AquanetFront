"use client";

import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/utils/protectedRoutes";
import { UseAuth } from "@/providers/AuthProvider";

import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = UseAuth();

  useEffect(() => {
    if (!loading) {
      // Si la ruta es protegida y no hay usuario, redirige a login ya que no hay usuario
      if (protectedRoutes.has(pathname) && !user) {
        router.push("/login");
      }
      // Si está logueado y va a login o register, redirige platform, pues ya está logueado
      if (user && (pathname === "/login" || pathname === "/registro")) {
        router.push("/inicio");
      }
    }
  }, [user, loading, pathname, router]);

  return (<>
    {children}
  </>);
};
