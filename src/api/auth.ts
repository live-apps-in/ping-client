import { AUTH_DATA, LOGIN_AUTH_DATA, VALIDATE_OTP_DETAILS } from "src/model";
import { axiosInstance, createApiFunction } from "src/utils";

class AuthApi {
  login(loginData: LOGIN_AUTH_DATA): Promise<void> {
    return createApiFunction(() =>
      axiosInstance.post("/auth/login", loginData)
    );
  }
  initialize(): Promise<AUTH_DATA> {
    return createApiFunction(() => axiosInstance.get("/auth/refresh"));
  }
  logout(): Promise<void> {
    return createApiFunction(() => axiosInstance.get("/auth/logout"));
  }
  sendOTP(email: string): Promise<void> {
    return createApiFunction(() =>
      axiosInstance.get(`/auth/2fa/send_otp/${email}`)
    );
  }
  validateOTP(details: VALIDATE_OTP_DETAILS): Promise<void> {
    return createApiFunction(() =>
      axiosInstance.post("/auth/2fa/otp/validate", details)
    );
  }
}

export const authApi = new AuthApi();
