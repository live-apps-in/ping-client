import { LoginPageContent } from "src/content/auth";
import { authSetup } from "src/data";
import { Guest } from "src/guard";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";
import { AuthLayout } from "src/layouts";

export const authRoutes: ROUTES_DEFINITION = [
  {
    path: authSetup.authPage,
    element: (
      <>
        <Helmet>
          <title>Login - Ping</title>
        </Helmet>
        <Guest>
          <AuthLayout>
            <LoginPageContent />
          </AuthLayout>
        </Guest>
      </>
    ),
  },
];
