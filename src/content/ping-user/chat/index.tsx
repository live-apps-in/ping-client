import { styled } from "@mui/material";
import { ChatScreen } from "./chat-screen";
import { Sidebar } from "./sidebar";

const ChatContainer = styled("div")`
  width: 100vw;
  height: 100%;
  display: grid;
  grid-template-columns: 200px auto;
`;

export const Chat: React.FC = () => {
  // const

  return (
    <ChatContainer>
      <Sidebar />
      <ChatScreen />
    </ChatContainer>
  );
};
