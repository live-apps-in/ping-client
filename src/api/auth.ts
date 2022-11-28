import {
  AUTH_DATA,
  SEND_LOGIN_OTP_DETAILS,
  SEND_OTP_DETAILS,
  VALIDATE_OTP_DETAILS,
  VALIDATE_OTP_RESPONSE,
} from "src/model";
import { CustomAxios, axiosInstance, createApiFunction } from "src/utils";

class AuthApi {
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
  validateOTP(details: VALIDATE_OTP_DETAILS): Promise<VALIDATE_OTP_RESPONSE> {
    return createApiFunction(() =>
      axiosInstance.post("/auth/2fa/otp/validate", details)
    );
  }
  getAccessTokenFromRefreshToken(refreshToken: VALIDATE_OTP_RESPONSE['refreshToken']): Promise<{ accessToken: VALIDATE_OTP_RESPONSE['token'] }> {
    const newAxiosInstance = 
      new CustomAxios({ setupCustomizations: false })
        .setupHeadersForRequestInterceptors({ "x-refresh-token": refreshToken })
        .create();
    return createApiFunction(() => 
    // use a new axios instance instead of existing axiosInstance to not include the refresh token logic for this api call
    // else it will create an infinite loop
      newAxiosInstance.get("/auth/token/refresh")
    );
  }
}

export const authApi = new AuthApi();
