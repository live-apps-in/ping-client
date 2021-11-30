import { Overwrite } from "./helper-types";
import {
  PaperProps,
  TypographyProps,
  ReactElement,
  TextFieldProps,
  PhoneInputProps,
  ChangeEvent,
} from "./predefined-interfaces";

// CustomCard Props
interface CUSTOM_CARD_HEADER_PROPS {}
interface CUSTOM_CARD_FOOTER_PROPS {}
interface CUSTOM_CARD_HEADER_1 extends CUSTOM_CARD_HEADER_PROPS {
  component?: ReactElement | null;
  title?: never;
  props?: never;
}
interface CUSTOM_CARD_HEADER_2 extends CUSTOM_CARD_HEADER_PROPS {
  title?: string | null;
  props?: TypographyProps;
  component?: never;
}
interface CUSTOM_CARD_FOOTER_1 extends CUSTOM_CARD_FOOTER_PROPS {
  component?: ReactElement | null;
  title?: never;
  props?: never;
}
interface CUSTOM_CARD_FOOTER_2 extends CUSTOM_CARD_FOOTER_PROPS {
  title?: string | null;
  props?: TypographyProps;
  component?: never;
}
type header = CUSTOM_CARD_HEADER_1 | CUSTOM_CARD_HEADER_2 | null;
type footer = CUSTOM_CARD_FOOTER_1 | CUSTOM_CARD_FOOTER_2 | null;

export interface CUSTOM_CARD_PROPS extends PaperProps {
  header?: header;
  footer?: footer;
}

// Recursive component

interface CONFIG_BASE {
  name: string;
  label?: string | null;
}

// field
interface FIELD_TYPE {
  type?:
    | "text"
    | "password"
    | "select"
    | "email"
    | "color"
    | "number"
    | "phone"
    | "file"
    | "array"
    | "date"
    | "checkbox"
    | "radio"
    | "radio-multiple"
    | "image"
    | "component"
    | null;
}

// text field
type TEXT_FIELD_PROPS = Overwrite<TextFieldProps & CONFIG_BASE, FIELD_TYPE> & {
  // other manually defined properties
  addon?: null | {
    position?: "end" | "start" | null;
    component: null | ReactElement;
  };
};

// field props
export type FIELD_PROPS = TEXT_FIELD_PROPS & {
  // other manually defined properties
  validationSchema?: any;
  formik?: any;
  isRequired?: boolean | null;
};

export type CONFIG_TYPE = FIELD_PROPS[];

export interface RECURSIVE_CONTAINER_PROPS {
  config: CONFIG_TYPE;
  formik: any;
  validationSchema?: any;
  formContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  formContainer?: null | React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & { form: ReactElement<any, any> }
  >;
}

// phone input props

export interface PHONE_INPUT_PROPS
  extends Omit<PhoneInputProps, "value" | "onChange"> {
  value?: string | number | null;
  required?: boolean | null;
  pattern?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
}
