import { Replace } from "../../common";
// check for authentication status here

export const AuthComponent = () => {
  return <Replace path="/auth/signin" />;
};

export * from "./signin";
export * from "./signup";
