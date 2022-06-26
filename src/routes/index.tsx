import { Routes } from "./router";
import { HomePage } from "src/content";
import { ROUTE_DEFINITION } from "src/model";
import { adminRoutes } from "./admin";
import { authRoutes } from "./auth";
import { Authenticated } from "src/guard";

export const routeDefinition: ROUTE_DEFINITION[] = [
  {
    path: "/",
    element: (
      <Authenticated>
        <HomePage />
      </Authenticated>
    ),
  },
  {
    path: "/auth",
    children: [...authRoutes],
  },
  {
    path: "/admin",
    children: [...adminRoutes.routeDefinition],
  },
  {
    path: "/other",
    children: [{ path: "/other", element: <div>Other</div> }],
  },
];

export const sidebarStructure = {
  admin: adminRoutes.sidebarStructure,
};

export { Routes };
