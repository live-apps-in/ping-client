import { styled } from "@mui/material";

const SidebarItemContainer = styled("div")`
  padding: 10px;
  border: 1px solid red;
`;

export const SidebarItem: React.FC<any> = (props) => {
  return <SidebarItemContainer>{props.name}</SidebarItemContainer>;
};
