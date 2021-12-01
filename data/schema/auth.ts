import { yup } from "../library-exports";

export const signInUserSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is Required"),
});

export type LOGIN_USER_SCHEMA = { email: string; password: string };

export const registerUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is Required"),
  phone: yup
    .string()
    .phone("Invalid Phone Number")
    .required("Phone number is required"),
});

export type REGISTER_USER_SCHEMA = {
  name: string;
  email: string;
  password: string;
  phone: string;
};
