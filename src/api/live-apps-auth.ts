import { platformConfig } from "src/config"
import { LIVE_APPS_LOGIN_DETAILS, LIVE_APPS_SIGNUP_DETAILS, LIVE_APPS_VALIDATE_OTP_DETAILS } from "src/model"
import { createApiFunction } from "src/utils"
import { authGateway } from "./gateway"

class LiveAppsAuthApi {
    signinWithLiveApps(details: LIVE_APPS_LOGIN_DETAILS): Promise<any> {
        return createApiFunction(() => authGateway.post('/auth/accounts', { ...details, platform: platformConfig.accounts }))
    }
    signupWithLiveApps(details: LIVE_APPS_SIGNUP_DETAILS): Promise<any> {
        return createApiFunction(() => authGateway.post('/accounts/signup', { ...details, platform: platformConfig.accounts }))
    }
    validateOTP(details: LIVE_APPS_VALIDATE_OTP_DETAILS): Promise<any> {
      return createApiFunction(() =>
        authGateway.post("/auth/accounts/2fa/otp/validate", details)
      );
    }
}

export const liveAppsAuthApi = new LiveAppsAuthApi()
