import OtpInput from "react-otp-input";
import { styled } from "@mui/material";
import { CustomButton, CustomCard } from "src/components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authApi } from "src/api";
import { getSearchQuery, handleError } from "src/utils";
import { useAuth } from "src/hooks";

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

export const EnterOTP = () => {
  const [submitting, setSubmitting] = useState(false);
  const [sending, setSending] = useState(false);
  const [resending, setResending] = useState(false);
  const { search } = useLocation();
  const searchQuery = getSearchQuery(search);

  const { validateOTP, sendOTP, sendLoginOTP, login } = useAuth();
  const [otp, setOtp] = useState("");
  const { email = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    triggerOTP();
  }, []);

  const triggerOTP = async () => {
    if (searchQuery?.login) return;
    setSending(true);
    try {
      await sendOTP({ email });
      window.flash({ message: "OTP sent successfully" });
    } catch (err) {
      handleError(err);
    }
    setSending(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const data = await validateOTP({ email, otp });
      login(data);
      navigate("/");
    } catch (err) {
      handleError(err);
    }
    setSubmitting(false);
  };

  const isValidOTP = () => otp?.toString().trim().length === 6;

  const handleResend = async () => {
    setResending(true);
    try {
      await (searchQuery?.login ? sendLoginOTP({ email }) : sendOTP({ email }));
      window.flash({ message: "OTP sent successfully" });
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
