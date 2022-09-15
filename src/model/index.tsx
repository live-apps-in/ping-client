// redux
export interface AUTH_DATA {
  name: string;
  email: string;
  token: string;
  roles: Array<string>;
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

export type LOGIN_AUTH_PROPS = {
  email: string;
  password: string;
};

// ---------------------------------------------------------------- //
