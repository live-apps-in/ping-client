import { useState } from "react";
import { styled } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  CustomText,
  RecursiveContainer,
} from "src/components";
import { useAuth } from "src/hooks";
import { SEND_LOGIN_OTP_DETAILS } from "src/model";
import { getSearchString, handleError } from "src/utils";
import { Logo } from "./components";
import { loginSchema } from "src/schema";

const StyledLoginPageContainer = styled("div")`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
`;

export const LoginPageContent = () => {
  const { sendLoginOTP } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (details: SEND_LOGIN_OTP_DETAILS) => {
    setSubmitting(true);
    try {
      await sendLoginOTP(details);
      window.flash({ message: "OTP sent successfully" });
      const searchString = getSearchString(
        { login: true },
        { prefixQuestionMark: true }
      );
      navigate(`/auth/2fa/send_otp/${details.email}${searchString}`);
    } catch (err) {
      handleError(err);
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });

  const config: CONFIG_TYPE = [
    {
      name: "email",
      type: "email",
    },
  ];

  return (
    <StyledLoginPageContainer>
      <Logo />
      <form onSubmit={formik.handleSubmit}>
        <CustomCard headerProps={{ title: "Login" }}>
          <RecursiveContainer
            config={config}
            formik={formik}
            validationSchema={loginSchema}
          />
          <CustomButton loading={submitting} type="submit">
            Submit
          </CustomButton>
          <CustomText href={"/auth/signup"}>Signup</CustomText>
        </CustomCard>
      </form>
    </StyledLoginPageContainer>
  );
};
