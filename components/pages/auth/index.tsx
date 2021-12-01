import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
// check for authentication status here

export const AuthComponent = () => {
  const { replace } = useRouter();
  useEffect(() => {
    // check for authentication
    replace("/auth/login");
  }, []);
  return <div>Auth</div>;
};

export * from "./signin";
export * from "./signup";
