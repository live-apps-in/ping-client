import { styled } from "@mui/material";
import { SOCKET_QUERY_CACHE_KEYS } from "src/config";
import { useQueryState } from "src/hooks";

const ChatBodyContainer = styled("div")`
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid red;
  padding: 10px;
`;

export const ChatBody: React.FC = () => {
  const [activeRoom] = useQueryState({
    queryKey: SOCKET_QUERY_CACHE_KEYS.ACTIVE_ROOM,
  });
  const isRoomActive = !!activeRoom;

  return (
    <ChatBodyContainer>
      {isRoomActive ? (
        "Chat screen"
      ) : (
        <div>Choose a chat to begin conversation</div>
      )}
    </ChatBodyContainer>
  );
};
