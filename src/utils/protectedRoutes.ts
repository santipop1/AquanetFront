// utils/protectedRoutes.ts

export const protectedRoutes = new Set([
  "/dashboard",
  "/formulario",
  "/profile",
  "/settings"
]);

export const sharedRoutes = new Set([
  "/notifications"
]);

export const protectedRoutesAdmin = new Set([
  "/dashboard-admin",
  "/admin/users",
  "/admin/settings"
]);

export const protectedRoutesFranchise = new Set([
  "/franquiciasEmpresas",
  "/notifications",
  "/franquiciasEmpresas/settings"
]);
