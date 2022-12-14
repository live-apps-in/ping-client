import { userApi, authApi } from "src/api";
import { authConfig } from "src/config";
import {
  AUTH_DATA,
  REGISTER_USER_DETAILS,
  SEND_LOGIN_OTP_DETAILS,
  SEND_OTP_DETAILS,
  USE_AUTH_OPTIONS,
  VALIDATE_OTP_DETAILS,
  VALIDATE_OTP_RESPONSE,
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
        const token = getCookie(authConfig.tokenAccessor);
        if (!token) {
          deleteCookie(authConfig.refreshTokenAccessor);
          throw new Error("Session expired");
        }
        // initialize the app by fetching details from profile route (initialize function is replaced by profile route)
        const data = await userApi.profile();
        // we don't need to store token and refresh token in the redux. those only should be used from cookies
        data.role = "ping_user";
        if (updateRedux)
          authActions.initialize({ data, isAuthenticated: true });
        resolve(data);
      } catch (err) {
        if (updateRedux) authActions.logout();
        reject(err);
      }
    });
  }

  async function login(
    data: VALIDATE_OTP_RESPONSE,
    { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ) {
    setCookie(authConfig.tokenAccessor, data.token);
    setCookie(authConfig.refreshTokenAccessor, data.refreshToken);
    // fetch auth data from profile (similar action while we initialize our app)
    const authData = await userApi.profile();
    // we don't need to store token and refresh token in the redux. those only should be used from cookies
    delete authData['token'];
    delete authData['refreshToken'];
    if (updateRedux) authActions.login({ role: "ping_user", ...authData });
    return undefined;
  }

  function signup(
    details: REGISTER_USER_DETAILS,
    // { updateRedux = true }: USE_AUTH_OPTIONS = {}
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        // signup to live-apps
        await userApi.signup({ 
          email: details.email,
          name: details.name
        });
        // register user to live-apps
        const data = await userApi.register(details);
        resolve(data);
      } catch(err) {
        reject(err);
      }
    });
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

  function validateOTP(details: VALIDATE_OTP_DETAILS): Promise<VALIDATE_OTP_RESPONSE> {
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
        deleteCookie(authConfig.tokenAccessor);
        deleteCookie(authConfig.refreshTokenAccessor);
        window.location.reload();
        if (updateRedux) authActions.logout();
        resolve();
      } catch (err) {
        if (updateRedux) authActions.logout();
        deleteCookie(authConfig.tokenAccessor);
        deleteCookie(authConfig.refreshTokenAccessor);
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
    signup,
    logout,
    ...auth,
  };
  return authUtils;
};
