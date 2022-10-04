// all schemas for forms in this app goes here

import { yup } from "src/utils";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  user_name: yup
    .string()
    .alphaNumeric("Only alphabets and numbers")
    .required("Username is required"),
  tag: yup.number().length(4, "Should be exactly 4 digits"),
  email: yup.string().email("Invalid Email").required("Email is required"),
});
