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

// chat slice
export type CHAT_STATE = {
  details: ACTIVE_CHAT_DETAILS | null;
  name: string;
  messages: CHAT_MESSAGE_DETAILS[];
  userStatus: CHAT_USER_STATUS;
};

export type CHAT_MESSAGE_DETAILS = {
  sender: AUTH_DATA["_id"]; // user's _id who is the author of the message
  _id: string; // messageId
  chatId: string;
  message: string;
  isLoading?: boolean;
  createdAt: Date | null;
  type: "DM";
};

export type ACTIVE_CHAT_DETAILS = {
  _id: CHAT_MESSAGE_DETAILS["chatId"]; // chatId
  name: string;
};

export type CHAT_USER_STATUS = {
  isTyping?: boolean;
  usersTyping?: USERS;
  isOnline?: boolean;
  lastSeen?: Date | null;
};

// hooks
// auth
export interface USE_AUTH_OPTIONS {
  updateRedux?: boolean;
}

// user-api
export type REGISTER_USER_DETAILS = {
  name: AUTH_DATA["name"];
  email: AUTH_DATA["email"];
  user_name: AUTH_DATA["user_name"];
  user_tag: AUTH_DATA["user_tag"];
  token?: API_HEADER_AUTH_DETAILS["token"];
  refreshToken?: API_HEADER_AUTH_DETAILS["refreshToken"];
};

export type API_HEADER_AUTH_DETAILS = {
  token: string;
  refreshToken: string;
};

// chat api
export type CHAT_LIST = CHAT_LIST_DETAILS[];

export type CHAT_LIST_DETAILS = {
  _id: string; // chatId
  chatType: "DM";
  modifiedAt: Date | string | null;
  user: USER_DETAILS;
  users: USER_DETAILS["_id"][];
};

// live apps auth
//.. login
export type LIVE_APPS_LOGIN_DETAILS = {
  email: string;
};

//.. signup
export type LIVE_APPS_SIGNUP_DETAILS = {
  name: string;
  email: string;
};

//.. validate OTP details
export type LIVE_APPS_VALIDATE_OTP_DETAILS = {
  email: string;
  otp: string;
};

//.. validate OTP response
export type LIVE_APPS_VALIDATE_OTP_RESPONSE = {
  refreshToken: string;
  token: string;
};

// ---------------------------------------------------------------- //

// users
export type USER_DETAILS = {
  image?: any;
  name: REGISTER_USER_DETAILS["name"];
  user_name: REGISTER_USER_DETAILS["user_name"];
  user_tag: REGISTER_USER_DETAILS["user_tag"];
  email: REGISTER_USER_DETAILS["email"];
  _id: string;
};

export type USERS = USER_DETAILS[];

// search users
export type SEARCH_USER_DETAILS = {
  user_name: USER_DETAILS["user_name"];
  user_tag: USER_DETAILS["user_tag"];
};

// friend
export interface FRIEND_DETAILS extends USER_DETAILS {
  status?: "pending" | "accepted" | "rejected";
}

export type FRIENDS = FRIEND_DETAILS[];

// friend-request
export type FRIEND_REQUEST_DETAILS = {
  createdAt: string | Date;
  friendId: string;
  friendInfo?: {
    email: USER_DETAILS["email"];
    name: USER_CARD_DETAILS["name"];
    user_name: USER_DETAILS["user_name"];
    user_tag: USER_DETAILS["user_tag"];
    image?: USER_DETAILS["image"];
    _id: USER_DETAILS["_id"];
  };
  receiver: string;
  sender: string;
  status: FRIEND_DETAILS["status"];
  type?: "incoming" | "outgoing";
};

export type FRIEND_REQUESTS = FRIEND_REQUEST_DETAILS[];

export type FRIEND_REQUEST_RESPOND_STATUS = "accept" | "reject";

// user-card details
export type USER_CARD_DETAILS = USER_DETAILS &
  FRIEND_DETAILS & { friendInfo?: FRIEND_REQUEST_DETAILS["friendInfo"] };

export type USER_CARDS = USER_CARD_DETAILS[];

export * from "./custom-models";
