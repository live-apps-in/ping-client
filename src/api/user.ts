import { AUTH_DATA, API_HEADER_AUTH_DETAILS, REGISTER_USER_DETAILS } from "src/model";
import { createApiFunction, safeApiCall } from "src/utils";
import { authGateway, gateway } from "src/api";
import { authConfig, platformConfig } from "src/config";

class UserApi {
  // live-apps register user
  registerUserWithLiveApps(details: REGISTER_USER_DETAILS): Promise<AUTH_DATA> {
    return createApiFunction(async() => {
      const safeApiCallDetails = {
        [authConfig.tokenAccessor]: details[authConfig.tokenAccessor],
        [authConfig.refreshTokenAccessor]: details[authConfig.refreshTokenAccessor]
      } as API_HEADER_AUTH_DETAILS;
      delete details.token;
      delete details.refreshToken;
      return await safeApiCall(
        () => authGateway.post(`/accounts/apps/register/${platformConfig.ping}`, details), 
        safeApiCallDetails
      );
    });
  }
  profile(details?: API_HEADER_AUTH_DETAILS): Promise<AUTH_DATA> {
    return createApiFunction(async() => {
      return await safeApiCall(() => authGateway.get("/accounts/profile"), details);
    });
  }
  fetchUsers() {
    return createApiFunction(() => gateway.get('/user'));
  }
}

export const userApi = new UserApi();
