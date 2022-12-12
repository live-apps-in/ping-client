import { AUTH_DATA, REGISTER_USER_DETAILS, SIGNUP_USER_DETAILS, SIGNUP_USER_RESPONSE } from "src/model";
import { createApiFunction } from "src/utils";
import { authGateway } from "src/api";
import { platformConfig } from "src/config";

class UserApi {
  // live-apps signup account
  signup(details: SIGNUP_USER_DETAILS): Promise<SIGNUP_USER_RESPONSE> {
    return createApiFunction(() => authGateway.post("/accounts/signup", { ...details, platform: platformConfig.ping }))
  }
  // live-apps register user
  register(details: REGISTER_USER_DETAILS): Promise<AUTH_DATA> {
    return createApiFunction(() => authGateway.post(`/accounts/apps/register/${platformConfig.ping}`, details));
  }
  profile(): Promise<AUTH_DATA> {
    return createApiFunction(() => authGateway.get("/accounts/profile"));
  }
}

export const userApi = new UserApi();
