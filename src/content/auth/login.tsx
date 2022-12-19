import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomCard,
} from "src/components";
import { authConfig } from "src/config";
import { useAuth } from "src/hooks";
import { getSearchQuery, getSearchString, handleError } from "src/utils";
import { Logo } from "./components";

const StyledLoginPageContainer = styled("div")`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
`;

export const LoginPageContent = () => {

  const { search } = useLocation();
  const searchQuery: any = getSearchQuery(search);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handlePrimaryActions();
  }, [searchQuery]);

  const handlePrimaryActions = () => {
    if(searchQuery?.token && searchQuery?.refreshToken) {
      // if you have the signup flag, redirect to signup page
      if(searchQuery?.signup) {
        // include the current search string to the url, to reuse it every where
        navigate(`${authConfig.signupPage}${search}`);
        return;
      }
      handleLogin();
    }
  };

  const handleLogin = async() => {
    const { token, refreshToken } = searchQuery;
    setLoading(true);
    try {
      const data = await login({ token, refreshToken });
      // TODO: make use of backtoURL here
      navigate(`/${searchQuery.backtoURL || data.role}`);
    } catch(err) {
      handleError(err);
    }
    setLoading(false);
  };

  return (
    <StyledLoginPageContainer>
      <Logo />
      <CustomCard headerProps={{ title: "Login" }}>
        <CustomButton href={`${authConfig.liveAppsLoginPage}?${getSearchString({ 
          // include the current search string to the redirect url, to reuse it every where
          // liveapps portal will giveback the search string we pass to the redirecturl
            redirectUrl: `${authConfig.authPage}${search}` 
          })}`}>
          Continue with Live apps
        </CustomButton>
      </CustomCard>
    </StyledLoginPageContainer>
  );
};
