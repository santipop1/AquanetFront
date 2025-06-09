// utils/protectedRoutes.ts

export const protectedRoutes = new Set([
  "/dashboard",
  "/formulario",
  "/Notifications",
  "/profile",
  "/settings"
]);

export const protectedRoutesAdmin = new Set([
  "/admin",
  "/admin/users",
  "/admin/settings"
]);

export const protectedRoutesFranchise = new Set([
  "/franquiciasEmpresas",
  "/franquiciasEmpresas/settings"
]);
