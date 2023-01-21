import { authActions, socketActions, themeActions } from "./slices";

export const actions = {
  authActions: { ...authActions },
  theme: { ...themeActions },
  socket: { ...socketActions },
};
