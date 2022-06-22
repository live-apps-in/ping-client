export const authSetup = {
  authPage: "/auth/login", // exact login page
  homePage: "/",
  tokenAccessor: "token",
};

// #rbac-setup
export const rbacSetup = {
  roles: ["admin"],
  homePage: {
    admin: "/admin",
  },
  publicRoutes: ["/verification"],
  authRoutes: ["/auth", "/auth/login"], // pages that are used for authentication purposes
};
