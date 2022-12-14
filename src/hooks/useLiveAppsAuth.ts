import { userApi, authApi } from "src/api";
import { authConfig } from "src/config";
import {
  AUTH_DATA,
  LIVE_APPS_LOGIN_DETAILS,
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

// nothing is stored in redux/cookie, every details should be used locally and sent through query params using the redirect url
// in future this logic will be moved to a separate 
export const useLiveAppsAuth = () => {

  async function login(
    data: LIVE_APPS_LOGIN_DETAILS,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        // await 
      } catch(err) {

      }
    })
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

  // function logout({
  //   updateRedux = true,
  // }: USE_AUTH_OPTIONS = {}): Promise<void> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await authApi.logout();
  //       deleteCookie(authConfig.tokenAccessor);
  //       deleteCookie(authConfig.refreshTokenAccessor);
  //       window.location.reload();
  //       if (updateRedux) authActions.logout();
  //       resolve();
  //     } catch (err) {
  //       if (updateRedux) authActions.logout();
  //       deleteCookie(authConfig.tokenAccessor);
  //       deleteCookie(authConfig.refreshTokenAccessor);
  //       window.location.reload();
  //       reject(err);
  //     }
  //   });
  // }

  const authUtils = {
    sendOTP,
    sendLoginOTP,
    validateOTP,
    login,
    signup,
    // logout,
  };
  return authUtils;
};
