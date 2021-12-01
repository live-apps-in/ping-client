import { useFormik } from "formik";
import {
  signInUserSchema,
  LOGIN_USER_SCHEMA,
  CONFIG_TYPE,
} from "../../../data";
import {
  RecursiveContainer,
  CustomButton,
  CustomCard,
  FullPageWrapper,
} from "../../ui";

export const SignInComponent = () => {
  const handleRegister = (data: LOGIN_USER_SCHEMA) => {
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleRegister,
    validationSchema: signInUserSchema,
  });

  const registerFields: CONFIG_TYPE = [
    {
      type: "email",
      name: "email",
      label: "Email",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
    },
  ];

  return (
    <FullPageWrapper display="grid" alignItems="center" justifyItems="center">
      <CustomCard
        header={{ title: "SignIn" }}
        sx={{ width: "90%", maxWidth: "500px" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <RecursiveContainer
            config={registerFields}
            formik={formik}
            validationSchema={signInUserSchema}
          />
          <CustomButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign In
          </CustomButton>
        </form>
      </CustomCard>
    </FullPageWrapper>
  );
};
