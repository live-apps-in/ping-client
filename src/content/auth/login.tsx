import { styled } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  RecursiveContainer,
} from "src/components";
import { useAuth } from "src/hooks";
import { LOGIN_AUTH_DATA } from "src/model";
import { handleError } from "src/utils";
import { Logo } from "./components";

const StyledLoginPageContainer = styled("div")`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
`;

export const LoginPageContent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (details: LOGIN_AUTH_DATA) => {
    try {
      // await login(details);
      navigate(`/auth/2fa/send_otp/${details.email}`);
    } catch (err) {
      handleError(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleSubmit,
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
          <RecursiveContainer config={config} formik={formik} />
          <CustomButton type="submit">Submit</CustomButton>
        </CustomCard>
      </form>
    </StyledLoginPageContainer>
  );
};
