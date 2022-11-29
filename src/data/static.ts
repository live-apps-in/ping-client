export const authSetup = {
  authPage: "/auth/login", // exact page where the user will be redirected if not loggedin
  signupPage: "/auth/signup",
  twoFactorAuthenticationPage: "/auth/2fa/send_otp/:email",
  homePage: "/",
  tokenAccessor: "token",
  refreshTokenAccessor: "refreshToken"
};

// #rbac-setup
export const rbacSetup = {
  roles: ["admin", "app_user"],
  homePage: {
    admin: "/admin",
    ping_user: "/ping_user",
    public: "/public"
  },
  publicRoutes: ["/verification"],
  authRoutes: ["/auth", "/auth/login"], // pages that are used for authentication purposes
};

export const projectSetup = {
  title: "Ping",
  baseURL: "https://api.ping.jagalive.in",
  defaultTheme: "pure-light-theme",
  defaultPhonenumberCountry: "IN" as any,
  // defaultTheme: THEME_NAMES.PureLightTheme,
};
