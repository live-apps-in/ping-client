import { authApi } from "src/api";
import { authSetup } from "src/data";
import { AUTH_DATA, LOGIN_AUTH_DATA, USE_AUTH_OPTIONS } from "src/model";
import { useSelector } from "src/redux";
import { deleteCookie, getCookie, setCookie } from "src/utils";
import { useActions } from "src/hooks";

export const useAuth = () => {
  const { auth } = useSelector((state) => state);
  const { authActions } = useActions();

  function initialize({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = getCookie("token");
        if (!token) throw new Error("Session expired");
        const data = await authApi.initialize();
        if (updateRedux)
          authActions.initialize({ data, isAuthenticated: true });
        resolve(data);
      } catch (err) {
        if (updateRedux) authActions.logout();
        reject(err);
      }
    });
  }

  function login(
    loginData: LOGIN_AUTH_DATA
    // { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        await authApi.login(loginData);
        // if (updateRedux) authActions.login(data);
        // setCookie(authSetup.tokenAccessor, data.token);
        resolve(undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  function logout({
    updateRedux = true,
  }: USE_AUTH_OPTIONS = {}): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await authApi.logout();
        deleteCookie(authSetup.tokenAccessor);
        window.location.reload();
        if (updateRedux) authActions.logout();
        resolve();
      } catch (err) {
        if (updateRedux) authActions.logout();
        deleteCookie(authSetup.tokenAccessor);
        window.location.reload();
        reject(err);
      }
    });
  }

  const authUtils = { initialize, login, logout, ...auth };
  return authUtils;
};
