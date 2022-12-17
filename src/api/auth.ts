import {
  LOGIN_USER_DETAILS,
} from "src/model";
import { createApiFunction } from "src/utils";
import { authGateway, Gateway } from "./gateway";

class AuthApi {
  logout(): Promise<void> {
    return createApiFunction(() => authGateway.get("/auth/logout"));
  }
  getAccessTokenFromRefreshToken(refreshToken: LOGIN_USER_DETAILS['refreshToken']): Promise<{ accessToken: LOGIN_USER_DETAILS['token'] }> {
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
