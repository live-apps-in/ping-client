import axios from "axios";
import { projectSetup } from "src/data";
import {
  AUTH_DATA,
  SEND_LOGIN_OTP_DETAILS,
  SEND_OTP_DETAILS,
  VALIDATE_OTP_DETAILS,
} from "src/model";
import { axiosInstance, createApiFunction } from "src/utils";

class AuthApi {
  initialize(): Promise<AUTH_DATA> {
    return createApiFunction(() => axiosInstance.get("/auth/refresh"));
  }
  logout(): Promise<void> {
    return createApiFunction(() => axiosInstance.get("/auth/logout"));
  }
  sendLoginOTP(details: SEND_LOGIN_OTP_DETAILS) {
    return createApiFunction(() => axiosInstance.post("/auth/login", details));
  }
  sendOTP(details: SEND_OTP_DETAILS) {
    return createApiFunction(() =>
      axiosInstance.get(`/auth/2fa/send_otp/${details.email}`)
    );
  }
  validateOTP(details: VALIDATE_OTP_DETAILS): Promise<AUTH_DATA> {
    return createApiFunction(() =>
      axiosInstance.post("/auth/2fa/otp/validate", details)
    );
  }
  getAccessTokenFromRefreshToken(refreshToken: AUTH_DATA['refreshToken']): Promise<{ accessToken: AUTH_DATA['token'] }> {
    const newAxiosInstance = axios.create({ 
      baseURL:projectSetup.baseURL, 
      headers: { 
        // set refreshToken as Bearer token to get a new accessToken
        'x-refresh-token': refreshToken
      } 
    });
    return createApiFunction(() => 
    // use a new axios instance instead of existing axiosInstance to not include the refresh token logic for this api call
    // else it will create an infinite loop
      newAxiosInstance.get("/auth/token/refresh")
    )
  }
}

export const authApi = new AuthApi();
