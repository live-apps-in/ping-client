// all socket connections regarding activeChat
import { SOCKET_KEYS } from "src/config";
import { ACTIVE_CHAT_DETAILS, CHAT_MESSAGE_DETAILS } from "src/model";
import {
  useActions,
  // useSelector
} from "src/hooks";
import { USE_SOCKET_PARAMS_BASE } from "../useSocket";

export interface USE_CHAT_CONNECTIONS extends USE_SOCKET_PARAMS_BASE {}

export const useChatConnections = (params: USE_CHAT_CONNECTIONS) => {
  const { socket } = params;
  // const { activeChat } = useSelector((state) => state);
  const { activeChat: activeChatActions } = useActions();

  function createRoom(details: ACTIVE_CHAT_DETAILS) {
    socket.emit(SOCKET_KEYS.PRIVATE_CHAT, details);
    // store in redux
    activeChatActions.setActiveChatDetails(details);
    activeChatActions.setActiveChatName(details.name);
    return details;
  }

  function sendMessage(details: CHAT_MESSAGE_DETAILS) {
    socket.emit(SOCKET_KEYS.MESSAGE, details); // initially the message is still in loading state. once its received from the listenMessage function, the loading state will be updated
    details = { ...details, isLoading: true };
    activeChatActions.updateMessages(details);
    return details;
  }

  function listenMessage() {
    // console.log("listening");
    return socket
      .off(SOCKET_KEYS.MESSAGE)
      .on(SOCKET_KEYS.MESSAGE, (data: CHAT_MESSAGE_DETAILS) => {
        console.log(data);
        activeChatActions.updateMessages({
          ...data,
          isLoading: false,
        });
        // ack("Received Data");
      });
  }

  return { createRoom, sendMessage, listenMessage };
};
