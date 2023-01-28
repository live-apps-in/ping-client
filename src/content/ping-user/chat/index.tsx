import { styled } from "@mui/material";
import { layoutSettings } from "src/layouts/ping_user/layout-settings";
import { ChatScreen } from "./chat-screen";
import { Sidebar } from "./sidebar";

const ChatContainer = styled("div")`
  width: 100vw;
  height: 100%;
  max-height: calc(100vh - ${layoutSettings.header.height});
  overflow: hidden;
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
