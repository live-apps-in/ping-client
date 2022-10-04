// redux
export interface AUTH_DATA {
  name: string;
  email: string;
  token: string;
  role: string;
  _id?: string;
  image?: string | null;
}

export interface AUTH_STATE {
  isInitialized: boolean;
  isAuthenticated: boolean;
  data: AUTH_DATA | null;
}

export interface INITIALIZE_ACTION {
  isAuthenticated: boolean;
  data: AUTH_DATA | null;
}

// hooks
// auth
export interface USE_AUTH_OPTIONS {
  updateRedux?: boolean;
}

export type SEND_OTP_DETAILS = {
  email: string;
};

export type SEND_LOGIN_OTP_DETAILS = {
  email: string;
};

//// 2fa
export type VALIDATE_OTP_DETAILS = {
  email: AUTH_DATA["email"];
  otp: number | string;
};

// user-api
export type SIGNUP_USER_DETAILS = {
  name: string;
  email: AUTH_DATA["email"];
  user_name: string;
  tag: string;
};

// ---------------------------------------------------------------- //

export * from "./custom-models";
