import { AUTH_DATA, REGISTER_USER_DETAILS } from "src/model";
import { createApiFunction } from "src/utils";
import { authGateway, gateway } from "src/api";
import { platformConfig } from "src/config";

class UserApi {
  // live-apps register user
  registerUserWithLiveApps(details: REGISTER_USER_DETAILS): Promise<AUTH_DATA> {
    return createApiFunction(() => authGateway.post(`/accounts/apps/register/${platformConfig.ping}`, details));
  }
  profile(): Promise<AUTH_DATA> {
    return createApiFunction(() => authGateway.get("/accounts/profile"));
  }
}

export const userApi = new UserApi();
