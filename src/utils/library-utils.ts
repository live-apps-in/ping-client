// yup
import * as yup from "yup";
import "yup-phone";
// uniqid
import uniqId from "uniqid";

const phoneRegex =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

yup.addMethod(yup.string, "phone", function () {
  return this.test("phone", "Invalid Phone Number", (value: any) =>
    value?.toString()?.length > 4 ? phoneRegex.test(value) : true
  );
});

yup.addMethod(
  yup.string,
  "password",
  function (
    errorMessage = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  ) {
    return this.test(
      "password",
      errorMessage,
      (value: any) => passwordRegex.test(value)
      // () => true
    );
  }
);

yup.addMethod(
  yup.string,
  "confirmPassword",
  function (reference, errorMessage = "Password doesn't match") {
    return yup.string().test("confirmPassword", errorMessage, function (value) {
      return this.parent[reference] === value;
    });
  }
);

export { yup, uniqId };
