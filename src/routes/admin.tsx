import { AdminHomeContent } from "src/content/admin";
import { Authenticated } from "src/guard";
import { ROLE_ROUTE_DEFINITION } from "src/model";

// enter the full path as a value for path property

export const adminRoutes: ROLE_ROUTE_DEFINITION = {
  routeDefinition: [
    {
      path: "/admin",
      element: (
        <Authenticated roles={["admin"]}>
          <AdminHomeContent />
        </Authenticated>
      ),
      index: true,
    },
  ],
  sidebarStructure: [],
};
