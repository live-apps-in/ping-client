import { styled } from "@mui/material";

const SidebarItemContainer = styled("div")(
  (props) => `
  padding: 10px;
  border: 1px solid red;
  background: ${props["isActive"] ? "grey" : "white"}
`
);

export const SidebarItem: React.FC<any> = (props) => {
  return (
    <SidebarItemContainer {...props}>{props.user.name}</SidebarItemContainer>
  );
};
