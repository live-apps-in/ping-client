// redux
export interface AUTH_DATA {
  name: string;
  user_name: string;
  tag: string;
  email: string;
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
  email: AUTH_DATA['email'];
};

export type SEND_LOGIN_OTP_DETAILS = {
  email: AUTH_DATA['email'];
};

//// 2fa
export type VALIDATE_OTP_DETAILS = {
  email: AUTH_DATA["email"];
  otp: number | string;
};

export type VALIDATE_OTP_RESPONSE = {
  token: string;
  refreshToken: string;
};

// user-api
export type SIGNUP_USER_DETAILS = {
  name: AUTH_DATA['name'];
  email: AUTH_DATA["email"];
  user_name: AUTH_DATA['user_name'];
  tag: AUTH_DATA['tag'];
};

// ---------------------------------------------------------------- //

export * from "./custom-models";
