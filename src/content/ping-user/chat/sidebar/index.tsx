import { styled } from "@mui/material";
import { SidebarItem } from "./sidebar-item";

const SidebarContainer = styled("div")`
  border: 1px solid red;
`;

export const Sidebar: React.FC = () => {
  const rooms = ["A", "B", "C", "D"];

  return (
    <SidebarContainer>
      {rooms.map((room, index) => (
        <SidebarItem name={room} key={index} />
      ))}
    </SidebarContainer>
  );
};
