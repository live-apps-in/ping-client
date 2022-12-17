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
    if(searchQuery?.token && searchQuery?.refreshToken) {
      handleLogin();
    }
  }, [search]);

  const handleLogin = async() => {
    const { token, refreshToken } = searchQuery;
    setLoading(true);
    try {
      const data = await login({ token, refreshToken });
      // TODO: make use of backToUrl here
      navigate(`/${data.role}`);
    } catch(err) {
      handleError(err);
    }
    setLoading(false);
  };

  return (
    <StyledLoginPageContainer>
      <Logo />
      <CustomCard headerProps={{ title: "Login" }}>
        <CustomButton href={`${authConfig.liveAppsLoginPage}?${getSearchString({ redirectUrl: authConfig.authPage })}`}>Continue with Live apps</CustomButton>
      </CustomCard>
    </StyledLoginPageContainer>
  );
};
