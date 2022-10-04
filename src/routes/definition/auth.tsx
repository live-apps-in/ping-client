import { LoginPageContent, EnterOTP } from "src/content/auth";
import { authSetup } from "src/data";
import { Guest } from "src/guard";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";
import { AuthLayout } from "src/layouts";
import { SignupPageContent } from "src/content/auth";

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
  {
    path: authSetup.signupPage,
    element: (
      <>
        <Helmet>
          <title>Signup - Ping</title>
        </Helmet>
        <Guest>
          <AuthLayout>
            <SignupPageContent />
          </AuthLayout>
        </Guest>
      </>
    ),
  },
  {
    path: authSetup.twoFactorAuthenticationPage,
    element: (
      <>
        <Helmet>
          <title>Ping - 2FA</title>
        </Helmet>
        <Guest>
          <AuthLayout>
            <EnterOTP />
          </AuthLayout>
        </Guest>
      </>
    ),
  },
];
