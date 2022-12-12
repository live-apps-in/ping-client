import axios, { AxiosError } from "axios";

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
