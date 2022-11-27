import axios, { AxiosError, AxiosRequestConfig, AxiosInstance as AxiosInstanceOriginal } from "axios";
import { getCookie, isPublicRoute, isAuthRoute, deleteCookie, setCookie } from "src/utils";
import { authSetup, projectSetup } from "src/data";
import { authApi } from "src/api";

export const getError = (errorObject: Error | AxiosError) => {
  if (axios.isAxiosError(errorObject)) {
    let error: any = {
      message: "Failed to process your request",
      data: {},
      status: null,
      statusText: null,
    };
    if (errorObject) {
      let status = errorObject.response?.status;
      if (status === 404) {
        error = {
          ...errorObject.response,
          message: "Failed to process your request",
          status: 404,
        };
      } else {
        error = {
          ...errorObject.response,
          message:
            errorObject.response?.data["error"] ||
            errorObject.message ||
            "Failed to process your request",
        };
      }
    }
    return error;
  } else {
    return errorObject;
  }
};

interface IAxiosInstance {
  axiosInstance: AxiosInstanceOriginal,
  setupHeadersForRequestInterceptors: (options?: { Authorization?: string, 'x-refresh-token'?: string }) => void;
  includeRefreshTokenLogic: () => void;
}
export class AxiosInstance implements IAxiosInstance {
  axiosInstance: AxiosInstanceOriginal;
  constructor(config: AxiosRequestConfig<any> & { setupCustomizations?: boolean } = {}) {
    const { setupCustomizations = true, ...rest } = config;
    this.axiosInstance = axios.create({
      baseURL: projectSetup.baseURL,
      ...rest
    });
    if(setupCustomizations) {
      this.setupHeadersForRequestInterceptors();
      this.includeRefreshTokenLogic();
    }
  }

  create() {
    return this.axiosInstance;
  }

  setupHeadersForRequestInterceptors(options: { Authorization?: string, 'x-refresh-token'?: string } = {}) {
    // setting token in header for each request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        let token = getCookie(authSetup.tokenAccessor); // getting token from cookies
        let refreshToken = getCookie(authSetup.refreshTokenAccessor); // getting token from cookies
        if (token && config.headers) {
          // defaults
          config.headers['Authorization'] = `Bearer ${token}`;
          config.headers['x-refresh-token'] = refreshToken;
          // other (overwrites stuff if needed)
          Object.keys(options).forEach(key => {
            config.headers[key] = options[key];
          });
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  includeRefreshTokenLogic() {
    // globally logout the user, if 401 occurs
    this.axiosInstance.interceptors.response.use(undefined, async (error) => {
      // logout if unauthenticated or token expired
      if (error.response?.status === 401) {
        const refreshToken = getCookie(authSetup.refreshTokenAccessor);
        // redirect to auth route, if you don't have the refreshToken and the current route is not public route
        if (!refreshToken) {
          deleteCookie(authSetup.tokenAccessor);
          if(!isPublicRoute(window.location.pathname) && !isAuthRoute(window.location.pathname)) {
            window.location.pathname = authSetup.authPage;
            return;
          }
        }
        else {
          // retry api call after getting access token using the refreshToken we have

          const apiCallConfig = error.config;
          try {
            const { accessToken } = await authApi.getAccessTokenFromRefreshToken(refreshToken);
            // setup the new access token to cookie
            setCookie(authSetup.tokenAccessor, accessToken);
            const newAxiosInstanceSetup = new AxiosInstance({ setupCustomizations: false });
            newAxiosInstanceSetup.setupHeadersForRequestInterceptors({ Authorization: `Bearer ${accessToken}`, "x-refresh-token": refreshToken });
            const newAxiosInstance = newAxiosInstanceSetup.create();
            const data = await newAxiosInstance(apiCallConfig);
            return Promise.resolve(data);
          }
          catch(err) {
            alert('refresh token got rejected');
            // this block will be triggered, if refresh token is expired too
            if(err.response?.status === 401) {
              deleteCookie(authSetup.tokenAccessor);
              deleteCookie(authSetup.refreshTokenAccessor);
              // at this point the user is completely not eligible to be logged in
              // redirect the user to auth route, if it's not auth route
              if(!isPublicRoute(window.location.pathname) && !isAuthRoute(window.location.pathname)) {
                window.location.pathname = authSetup.authPage;
                return;
              }
              return Promise.reject(err);
            }
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
        //   window.location.href = '/logout';
      }
      return Promise.reject(error);
    });
  }
  
}

export const axiosInstance = new AxiosInstance().create();

// configuration to get upload progress(in percentage)

export const withUploadProgress = (callBack: Function) => {
  return {
    onUploadProgress: function (progressEvent: any) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      callBack(percentCompleted);
    },
  };
};

export async function createApiFunction(
  apiCall: Function,
  successCallback?: any,
  errorCallback?: any
) {
  try {
    const response = await apiCall();
    if (successCallback) {
      return successCallback(response);
    }
    return response.data;
  } catch (err) {
    if (errorCallback) return errorCallback(err);
    throw err;
  }
}

export async function handleError(error, customFunction?: Function) {
  if (error) {
    if (customFunction) customFunction(error);
    else window.flash({ message: getError(error).message, variant: "error" });
  }
}

export async function rejectError(_error?: any) {
  return;
}
