import { LoginPageContent, EnterOTP } from "src/content/auth";
import { authConfig } from "src/config";
import { Guest } from "src/guard";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";
import { AuthLayout } from "src/layouts";
import { SignupPageContent } from "src/content/auth";

export const authRoutes: ROUTES_DEFINITION = [
  {
    path: authConfig.authPage,
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
    path: authConfig.signupPage,
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
    path: authConfig.twoFactorAuthenticationPage,
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
