import OtpInput from "react-otp-input";
import { styled } from "@mui/material";
import { CustomButton, CustomCard } from "src/components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "src/api";
import { handleError } from "src/utils";

const StyledOTPPageContainer = styled("div")`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
`;

const StyledOTPInput = styled(OtpInput)`
  gap: 10px;
  > input {
    width: 35px !important;
    padding: 5px 7px;
  }
`;

export const SendOTP = () => {
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [otp, setOtp] = useState("");
  const { email = "" } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await authApi.validateOTP({ email, otp });
      // TODO: redirect to respective page based on whether its a signup / login
    } catch (err) {
      handleError(err);
    }
    setSubmitting(false);
  };

  const isValidOTP = () => otp?.toString().trim().length === 6;

  const handleResend = async () => {
    setResending(true);
    try {
      await authApi.sendOTP(email);
    } catch (err) {
      handleError(err);
    }
    setResending(false);
  };

  return (
    <StyledOTPPageContainer>
      <form onSubmit={handleSubmit}>
        <CustomCard>
          <StyledOTPInput
            shouldAutoFocus
            isInputNum
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span> </span>}
          />
          <CustomButton
            loading={submitting}
            type="submit"
            disabled={!isValidOTP()}
          >
            Submit
          </CustomButton>
          <CustomButton loading={resending} onClick={handleResend}>
            Resend
          </CustomButton>
        </CustomCard>
      </form>
    </StyledOTPPageContainer>
  );
};
