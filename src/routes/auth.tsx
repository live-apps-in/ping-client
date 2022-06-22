import { LoginPageContent } from "src/content/auth/";
import { ROUTE_DEFINITION } from "src/model";

export const authRoutes: ROUTE_DEFINITION[] = [
  {
    path: "/auth/login",
    element: <LoginPageContent />,
  },
];
