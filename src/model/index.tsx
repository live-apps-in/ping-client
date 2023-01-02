// redux
export interface AUTH_DATA {
  name: string;
  user_name: string;
  user_tag: string;
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

// user-api
export type REGISTER_USER_DETAILS = {
  name: AUTH_DATA['name'];
  email: AUTH_DATA["email"];
  user_name: AUTH_DATA['user_name'];
  user_tag: AUTH_DATA['user_tag'];
  token?: API_HEADER_AUTH_DETAILS['token'];
  refreshToken?: API_HEADER_AUTH_DETAILS['refreshToken']
};

export type API_HEADER_AUTH_DETAILS = {
  token: string;
  refreshToken: string;
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

//.. validate OTP response
export type LIVE_APPS_VALIDATE_OTP_RESPONSE = {
  refreshToken: string;
  token: string;
}

// ---------------------------------------------------------------- //

// users
export type USER_DETAILS = {
  image?: any;
  name: REGISTER_USER_DETAILS['name'];
  user_name: REGISTER_USER_DETAILS['user_name'];
  user_tag: REGISTER_USER_DETAILS['user_tag'];
  email: REGISTER_USER_DETAILS['email'];
}

export type USERS = USER_DETAILS[];

// search users
export type SEARCH_USER_DETAILS = { 
  user_name: USER_DETAILS['user_name'], 
  user_tag: USER_DETAILS['user_tag'] 
}

// friend
export interface FRIEND_DETAILS extends USER_DETAILS {
  status?: 'pending' | 'approved' | 'rejected';
  requestId?: string;
  _id: string;
}

export type FRIENDS = FRIEND_DETAILS[]


// user-card details
export type USER_CARD_DETAILS = USER_DETAILS & FRIEND_DETAILS

export type USER_CARDS = USER_CARD_DETAILS[];

export * from "./custom-models";
