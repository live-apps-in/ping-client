import { styled } from "@mui/material";
import { CustomCard } from "src/components";
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
      <CustomCard headerProps={{ title: "Login" }}>Hello</CustomCard>
    </StyledLoginPageContainer>
  );
};
