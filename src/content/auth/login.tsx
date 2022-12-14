import { styled } from "@mui/material";
import {
  CustomButton,
  CustomCard,
} from "src/components";
import { Logo } from "./components";

const StyledLoginPageContainer = styled("div")`
  display: grid;
  width: 100vw;
  height: 100vh;
  place-items: center;
`;

export const LoginPageContent = () => {

  return (
    <StyledLoginPageContainer>
      <Logo />
      <CustomCard headerProps={{ title: "Login" }}>
        <CustomButton href='/liveapps/auth/signin'>Continue with Live apps</CustomButton>
      </CustomCard>
    </StyledLoginPageContainer>
  );
};
