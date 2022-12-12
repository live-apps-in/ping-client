import { platformConfig } from "src/config";
import {
  SEND_LOGIN_OTP_DETAILS,
  SEND_OTP_DETAILS,
  VALIDATE_OTP_DETAILS,
  VALIDATE_OTP_RESPONSE,
} from "src/model";
import { createApiFunction } from "src/utils";
import { authGateway, Gateway } from "./gateway";

class AuthApi {
  logout(): Promise<void> {
    return createApiFunction(() => authGateway.get("/auth/logout"));
  }
  sendLoginOTP(details: SEND_LOGIN_OTP_DETAILS) {
    return createApiFunction(() => authGateway.post("/auth/accounts", { ...details, platform: platformConfig.accounts }));
  }
  sendOTP(details: SEND_OTP_DETAILS) {
    return createApiFunction(() =>
      authGateway.get(`/auth/2fa/send_otp/${details.email}`)
    );
  }
  validateOTP(details: VALIDATE_OTP_DETAILS): Promise<VALIDATE_OTP_RESPONSE> {
    return createApiFunction(() =>
      authGateway.post("/auth/accounts/2fa/otp/validate", details)
    );
  }
  getAccessTokenFromRefreshToken(refreshToken: VALIDATE_OTP_RESPONSE['refreshToken']): Promise<{ accessToken: VALIDATE_OTP_RESPONSE['token'] }> {
    const customGateway = 
      new Gateway({ setupCustomizations: false })
        .setupHeadersForRequestInterceptors({ "x-refresh-token": refreshToken })
        .create();
    return createApiFunction(() => 
    // use a new gateway instead of existing gateway to not include the refresh token logic for this api call
    // else it will create an infinite loop
      customGateway.get("/auth/token/refresh")
    );
  }
}

export const authApi = new AuthApi();
