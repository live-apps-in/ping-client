import { authActions, themeActions } from "./slices";

export const actions = {
  authActions: { ...authActions },
  theme: { ...themeActions },
};
