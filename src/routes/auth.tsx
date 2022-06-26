import { LoginPageContent } from "src/content/auth/";
import { Guest } from "src/guard";
import { ROUTE_DEFINITION } from "src/model";

export const authRoutes: ROUTE_DEFINITION[] = [
  {
    path: "/auth/login",
    element: (
      <Guest>
        <LoginPageContent />
      </Guest>
    ),
  },
];
