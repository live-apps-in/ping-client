import { authApi } from "src/api";
import { authSetup } from "src/data";
import {
  AUTH_DATA,
  SEND_LOGIN_OTP_DETAILS,
  SEND_OTP_DETAILS,
  USE_AUTH_OPTIONS,
  VALIDATE_OTP_DETAILS,
} from "src/model";
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
    data: AUTH_DATA,
    { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ) {
    if (updateRedux) authActions.login({ role: "admin", ...data });
    setCookie(authSetup.tokenAccessor, data.token);
    return undefined;
  }

  function sendLoginOTP(details: SEND_LOGIN_OTP_DETAILS) {
    return new Promise(async (resolve, reject) => {
      try {
        await authApi.sendLoginOTP(details);
        resolve(undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  function sendOTP(details: SEND_OTP_DETAILS) {
    return new Promise(async (resolve, reject) => {
      try {
        await authApi.sendOTP(details);
        resolve(undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  function validateOTP(details: VALIDATE_OTP_DETAILS): Promise<AUTH_DATA> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await authApi.validateOTP(details);
        resolve(data);
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

  const authUtils = {
    initialize,
    sendOTP,
    sendLoginOTP,
    validateOTP,
    login,
    logout,
    ...auth,
  };
  return authUtils;
};
