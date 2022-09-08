import { adminRoutes } from "./admin";
import { authRoutes } from "./auth";
import { publicRoutes } from "./public";

export const routeDefinition = {
  auth: authRoutes,
  admin: adminRoutes,
  public: publicRoutes,
};
