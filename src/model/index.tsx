import { RouteProps, To } from "react-router-dom";

// notistack
import type {
  OptionsObject as NotiStackOptionsObject,
  SnackbarMessage as NotiStackSnackbarMessage,
} from "notistack";
import { ButtonProps, DialogContentProps, DialogProps } from "@mui/material";

// querystring
import type { ParsedUrlQueryInput } from "querystring";

// react-router

export interface ROLE_ROUTE_DEFINITION {
  routeDefinition: ROUTE_DEFINITION[];
  sidebarStructure: SIDEBAR_STRUCTURE;
}

export interface ROUTE_DEFINITION extends Omit<RouteProps, "children"> {
  path: string;
  children?: ROUTE_DEFINITION[];
}

// layout
export interface SIDEBAR_STRUCTURE {}

// ------------------------------------------------------------------------- //

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

// --------------------------------------------- //

// ----------------------------------------------------------------- //

// context
// JWTAuthContext
export interface JWT_AUTH_CONTEXT extends AUTH_STATE {
  login: (data: AUTH_DATA) => any;
  logout: () => any;
}

// ---------------------------------------------------------------- //

// custom-event-models

// flash event
export interface FLASH_EVENT_PROPS extends NotiStackOptionsObject {
  message?: NotiStackSnackbarMessage;
}

// modal event
interface MODAL_CONTAINER_PROPS extends Omit<DialogProps, "open"> {
  closeOnClick?: boolean;
  open?: boolean;
}
export interface MODAL_EVENT_PROPS_1 {
  containerProps?: MODAL_CONTAINER_PROPS;
  contentContainerProps?: DialogContentProps;
  component?: CUSTOM_MODAL_COMPONENT;
  type?: "custom";
}
export interface MODAL_EVENT_PROPS_2 extends CONFIRMATION_MODAL_PROPS {
  containerProps?: MODAL_CONTAINER_PROPS;
  contentContainerProps?: DialogContentProps;
  type?: "confirmation";
}

export type MODAL_EVENT_PROPS = MODAL_EVENT_PROPS_1 | MODAL_EVENT_PROPS_2;

export interface CONFIRMATION_MODAL_PROPS {
  onConfirm?: Function;
  onCancel?: Function;
  title?: JSX.Element | string | null;
  description?: JSX.Element | string | null;
  confirmButton?:
    | JSX.Element
    | { label: any; props?: CUSTOM_BUTTON_PROPS }
    | null;
  cancelButton?:
    | JSX.Element
    | { label: any; props?: CUSTOM_BUTTON_PROPS }
    | null;
}

export type CUSTOM_MODAL_COMPONENT = React.FC<{ onCancel: Function }>;
export interface CUSTOM_MODAL_COMPONENT_PROPS {
  [key: string]: any;
  onCancel: Function;
}

declare global {
  interface Window {
    flash: (params: FLASH_EVENT_PROPS) => any;
    modal: (params: MODAL_EVENT_PROPS) => any;
  }
}

// custom-button props
export interface NavigateOptions {
  replace?: boolean;
  state?: any;
}

export interface CUSTOM_BUTTON_PROPS extends Omit<ButtonProps, "href"> {
  loading?: boolean | null;
  href?:
    | string
    | {
        to: To;
        options?: NavigateOptions;
      };
  linkStyle?: boolean;
}

// ----------------------------------------------------------------------- //
