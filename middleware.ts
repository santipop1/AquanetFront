import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, protectedRoutesAdmin } from "@/components/AuthGuard/AuthGuard";

// Simula verificación (aquí iría tu lógica real con cookies o auth)
const isAuthenticated = (req: NextRequest): boolean => {
  const token = req.cookies.get("session"); // ejemplo: "session" puede ser tu cookie
  return !!token; // Devuelve true si hay token
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth =
    protectedRoutes.has(pathname) || protectedRoutesAdmin.has(pathname);

  if (needsAuth && !isAuthenticated(req)) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Aplica a todas las rutas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings", "/admin/:path*"]
};
