// all schemas for forms in live-apps accounts portal goes here

import { yup } from "src/utils";

export const liveAppsAccountsPortalSigninSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required("Email is required"),
});

export const liveAppsAccountsPortalSignupSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid Email').required('Email is required'),
});