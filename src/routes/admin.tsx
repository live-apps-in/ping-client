import { AdminHomeContent } from "src/content/admin";
import { ROLE_ROUTE_DEFINITION } from "src/model";

// enter the full path as a value for path property

export const adminRoutes: ROLE_ROUTE_DEFINITION = {
  routeDefinition: [
    {
      path: "/admin",
      element: <AdminHomeContent />,
      index: true,
    },
  ],
  sidebarStructure: [],
};
