import { styled } from "@mui/material";
import { useSelector } from "src/redux";

const ChatHeaderContainer = styled("div")`
  border: 1px solid red;
  padding: 10px;
  height: 60px;
`;

export const ChatHeader: React.FC = () => {
  const { activeChat } = useSelector((state) => state);

  return <ChatHeaderContainer>{activeChat.name}</ChatHeaderContainer>;
};
