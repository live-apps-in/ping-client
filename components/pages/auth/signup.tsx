import { useFormik } from "formik";
import {
  registerUserSchema,
  REGISTER_USER_SCHEMA,
  CONFIG_TYPE,
} from "../../../data";
import {
  RecursiveContainer,
  CustomButton,
  CustomCard,
  FullPageWrapper,
} from "../../ui";

export const SignUpComponent = () => {
  const handleRegister = (data: REGISTER_USER_SCHEMA) => {
    console.log(data);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema: registerUserSchema,
  });

  const registerFields: CONFIG_TYPE = [
    {
      type: "text",
      name: "name",
      label: "Name",
    },
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
    {
      type: "phone",
      name: "phone",
      label: "Phone",
    },
  ];

  return (
    <FullPageWrapper display="grid" alignItems="center" justifyItems="center">
      <CustomCard
        header={{ title: "Signup" }}
        sx={{ width: "90%", maxWidth: "500px" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <RecursiveContainer
            config={registerFields}
            formik={formik}
            validationSchema={registerUserSchema}
          />
          <CustomButton
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign up
          </CustomButton>
        </form>
      </CustomCard>
    </FullPageWrapper>
  );
};
