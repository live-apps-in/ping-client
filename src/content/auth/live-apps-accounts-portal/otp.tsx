import OtpInput from "react-otp-input";
import { styled } from "@mui/material";
import { CustomButton, CustomCard, CustomText } from "src/components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { appendSearchString, getSearchQuery, handleError } from "src/utils";
import { useLiveAppsAuth } from "src/hooks";
import { authConfig } from "src/config";

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

export const OTPPortal = () => {
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const { search } = useLocation();
  const searchQuery: any = getSearchQuery(search);
  const { email = "" } = useParams();
  const navigate = useNavigate();
  const { validateOTP, login } = useLiveAppsAuth();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
      if(!searchQuery?.redirectUrl) {
        setError('Redirect Url is required in search query');
      }
    }, [searchQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const data = await validateOTP({ email, otp });
      const [redirectUrl = '', redirectUrlSearch = ''] = searchQuery.redirectUrl?.split('?') || [];
      // include return data with the previously present search query in the redirect url
      const navigateUrl = `${redirectUrl}?${appendSearchString([{ 
        token: data[authConfig.tokenAccessor],
        refreshToken: data[authConfig.refreshTokenAccessor],
        signup: searchQuery.signup
      }, redirectUrlSearch])}`;
      navigate(navigateUrl);
    } catch (err) {
      handleError(err);
    }
    setSubmitting(false);
  };

  const isValidOTP = () => otp?.toString().trim().length === 6;

  const handleResend = async () => {
    setResending(true);
    try {
      await login({ email });
      window.flash({ message: "OTP sent successfully" });
    } catch (err) {
      handleError(err);
    }
    setResending(false);
  };

  return (
    <StyledOTPPageContainer>
      {error ? 
          <CustomText variant='h3'>{error}</CustomText> 
          : <form onSubmit={handleSubmit}>
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
      }
    </StyledOTPPageContainer>
  );
};
