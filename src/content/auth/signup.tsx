import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  CustomText,
  RecursiveContainer,
} from "src/components";
import { REGISTER_USER_DETAILS } from "src/model";
import { getSearchQuery, getSearchString, handleError } from "src/utils";
import { loginSchema } from "src/schema";
import { useAuth } from "src/hooks";
import { authConfig } from "src/config";
import { userApi } from 'src/api';

// TODO: rename this and affecting places to register 
export const SignupPageContent = () => {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const { search } = useLocation();
  const searchQuery: any = getSearchQuery(search);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const apiHeaderAuthDetails = { 
    token: searchQuery.token,
    refreshToken: searchQuery.refreshToken
  };

  useEffect(() => {
    handlePrimaryActions();
  }, [search]);

  const handlePrimaryActions = () => {
    // if refreshToken and token are not obtained from liveApps portal redirect to the portal to obtain them
    if(!searchQuery?.token && !searchQuery?.refreshToken) {
        redirectToLiveAppsLogin();
    } else {
      prefetchDetailsFromLiveApps();
    }
  };

  const prefetchDetailsFromLiveApps = async() => {
    setLoading(true);
    try {
      const details = await userApi.profile(apiHeaderAuthDetails);
      formik.resetForm({ values: { 
        ...formik.values,
        name: details.name,
        email: details.email,  
      } });
    }
    catch(err) {
      handleError(err);
    }
    setLoading(false);
  };

  const redirectToLiveAppsLogin = () => navigate(`${authConfig.liveAppsLoginPage}?${getSearchString({ 
    // include the current search string to the redirect url, to reuse it every where
    // liveapps portal will giveback the search string we pass to the redirecturl
    redirectUrl: `${authConfig.authPage}?${getSearchString({ ...searchQuery, signup: true })}`
  })}`);

  const handleSubmit = async (details: REGISTER_USER_DETAILS) => {
    setSubmitting(true);
    const updatedData = {
      ...details,
      user_name: details.user_name + "#" + details.tag,
    };
    delete updatedData.tag;
    try {
      // register user with provided details
      await register({ ...details, ...apiHeaderAuthDetails  });
      // once registration is complete, login the user with the refreshToken and token obtained from liveapps portal
      const data = await login(apiHeaderAuthDetails);
      navigate(`/${searchQuery.backtoURL || data.role}`);
    } catch (err) {
      handleError(err);
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      user_name: "",
      tag: "",
      email: "",
    },
    onSubmit: handleSubmit,
  });

  const config: CONFIG_TYPE = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "user_name",
      label: "Username",
    },
    {
      name: "tag",
      label: "Tag",
      type: "number",
      numberInputProps: { thousandSeparator: false, format: "####" },
      addon: {
        position: "start",
        component: <CustomText>#</CustomText>,
      },
    },
    {
      name: "email",
      label: "Email",
    },
  ];

  return (
    <CustomCard loading={loading} headerProps={{ title: "Signup" }}>
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer
          formik={formik}
          config={config}
          validationSchema={loginSchema}
        />
        <CustomButton loading={submitting} type="submit">
          Submit
        </CustomButton>
        <CustomText href={`/auth/login${search}`}>Login</CustomText>
      </form>
    </CustomCard>
  );
};
