import type { AppProps } from "next/app";
import { wrapper } from "../redux";
import "../assets/scss/globals.scss";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useActions, useTypedSelector } from "../hooks";
import { Replace } from "../components";

const authRoutes = ["/auth/", "/auth/signin/", "/auth/signup/"];
const publicRoutes = ["/", "/_error/"];
const alterPathname = (pathname: string) => {
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (!pathname.endsWith("/")) pathname = `${pathname}/`;
  return pathname;
};

const isAuthRoute = (pathname: string) => {
  pathname = alterPathname(pathname);
  if (pathname === "/") return false;
  const alteredAuthRoutes = authRoutes.filter((route) => route !== "/");
  return !!alteredAuthRoutes.find(
    (route) => pathname.startsWith(route) || route.startsWith(pathname)
  );
};

const isPublicRoute = (pathname: string) => {
  pathname = alterPathname(pathname);
  if (pathname === "/") return true;
  const alteredPublicRoutes = publicRoutes.filter((route) => route !== "/");
  return !!alteredPublicRoutes.find(
    (route) => pathname.startsWith(route) || route.startsWith(pathname)
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  let { pathname, replace } = useRouter();
  const { checkauthStatus } = useActions();
  const {
    data: { token },
    loading,
    error,
  } = useTypedSelector((state) => state.auth);
  useEffect(() => {
    if (!token) checkauthStatus();
  }, []);

  return loading ? (
    "loading"
  ) : isPublicRoute(pathname) ? (
    <Component {...pageProps} />
  ) : isAuthRoute(pathname) ? (
    token ? (
      <Replace path="/home" />
    ) : (
      <Component {...pageProps} />
    )
  ) : error ? (
    <Replace path="/auth/signin" query={{ returnURL: pathname }} />
  ) : token ? (
    <Component {...pageProps} />
  ) : (
    <Replace path="/auth/signin" query={{ returnURL: pathname }} />
  );
}

export default wrapper.withRedux(MyApp);
