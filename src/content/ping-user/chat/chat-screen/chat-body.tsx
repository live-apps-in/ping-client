import { styled } from "@mui/material";
import { SOCKET_QUERY_CACHE_KEYS } from "src/config";
import {
  useQueryState,
  // useSocket
} from "src/hooks";

const ChatBodyContainer = styled("div")`
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid red;
  padding: 10px;
`;

export const ChatBody: React.FC = () => {
  // const { utils } = useSocket();
  // const activeRoom = utils.chatUtils.getActiveRoom();
  const [activeChatId] = useQueryState({
    queryKey: `${SOCKET_QUERY_CACHE_KEYS.CHAT}.activeChatId`,
  });
  // const [activeChat = {}] = useQueryState<Object>({
  //   queryKey: `${SOCKET_QUERY_CACHE_KEYS.CHAT}.${activeChatId}`,
  // });
  // const isActiveChatAvailable = !!activeChat;

  return (
    <ChatBodyContainer>
      {activeChatId ? (
        "Chat screen"
      ) : (
        <div>Choose a chat to begin conversation</div>
      )}
    </ChatBodyContainer>
  );
};
