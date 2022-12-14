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
export type REGISTER_USER_DETAILS = {
  name: AUTH_DATA['name'];
  email: AUTH_DATA["email"];
  user_name: AUTH_DATA['user_name'];
  tag: AUTH_DATA['tag'];
};

export type SIGNUP_USER_DETAILS = {
  name: AUTH_DATA["name"];
  email: AUTH_DATA["email"];
}

export type SIGNUP_USER_RESPONSE = {
  token: string;
}

// live apps auth
//.. login
export type LIVE_APPS_LOGIN_DETAILS = {
  email: string;
}

//.. signup
export type LIVE_APPS_SIGNUP_DETAILS = {
  name: string;
  email: string;
}

//.. validate OTP details
export type LIVE_APPS_VALIDATE_OTP_DETAILS = {
  email: string;
  otp: string;
}

// ---------------------------------------------------------------- //

export * from "./custom-models";
