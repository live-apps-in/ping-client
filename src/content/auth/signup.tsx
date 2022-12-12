import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { userApi } from "src/api/user";
import {
  CONFIG_TYPE,
  CustomButton,
  CustomCard,
  CustomText,
  RecursiveContainer,
} from "src/components";
import { REGISTER_USER_DETAILS } from "src/model";
import { handleError } from "src/utils";
import { loginSchema } from "src/schema";
import { useAuth } from "src/hooks";

export const SignupPageContent = () => {
  const navigate = useNavigate();
  const { signup } = useAuth()
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: REGISTER_USER_DETAILS) => {
    setSubmitting(true);
    const updatedData = {
      ...data,
      user_name: data.user_name + "#" + data.tag,
    };
    delete updatedData.tag;
    try {
      await signup(data);
      navigate(`/auth/2fa/send_otp/${updatedData.email}`);
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
    <CustomCard headerProps={{ title: "Signup" }}>
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer
          formik={formik}
          config={config}
          validationSchema={loginSchema}
        />
        <CustomButton loading={submitting} type="submit">
          Submit
        </CustomButton>
        <CustomText href={"/auth/login"}>Login</CustomText>
      </form>
    </CustomCard>
  );
};
