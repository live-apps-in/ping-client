// all socket connections regarding chat
import { QueryClient } from "react-query";
import { SOCKET_KEYS, SOCKET_QUERY_CACHE_KEYS } from "src/config";
import { USE_SOCKET_PARAMS_BASE } from "../useSocket";

// utils
class ChatUtils {
  private queryClient: QueryClient;

  constructor(queryClient) {
    this.queryClient = queryClient;
  }

  createRoom(details) {
    if (details._id) {
      this.queryClient.setQueryData(
        `${SOCKET_QUERY_CACHE_KEYS.CHAT}.activeChatId`,
        details._id
      );
      this.queryClient.setQueryData(
        `${SOCKET_QUERY_CACHE_KEYS.CHAT}.${details._id}.details`,
        details
      );
    }
  }

  updateMessage(details) {
    if (details._id) {
      let chatDetails: any = this.queryClient.getQueryData(
        `${SOCKET_QUERY_CACHE_KEYS.CHAT}.${details._id}.details`
      ); // _id is chatId
      let chatLog = chatDetails?.chatLog || [];
      chatLog = [...chatLog, details.data];
      this.queryClient.setQueryData(`chat.${details._id}.details`, {
        ...chatDetails,
        chatLog,
      });
    }
  }

  getActiveChat() {
    const activeChatId: any =
      this.queryClient.getQueryData(
        `${SOCKET_QUERY_CACHE_KEYS.CHAT}.activeChatId`
      ) || {};
    const activeChat = this.queryClient.getQueryData(
      `${SOCKET_QUERY_CACHE_KEYS.CHAT}.${activeChatId}`
    );
    return activeChat || null;
  }
}

export interface USE_CHAT_CONNECTIONS extends USE_SOCKET_PARAMS_BASE {}

export const useChatConnections = (params: USE_CHAT_CONNECTIONS) => {
  const { socket, queryClient } = params;
  const chatUtils = new ChatUtils(queryClient);

  function createRoom(details) {
    socket.emit(SOCKET_KEYS.PRIVATE_CHAT, details);
    chatUtils.createRoom(details);
  }

  function sendMessage(details) {
    socket.emit(SOCKET_KEYS.MESSAGE, details);
    chatUtils.updateMessage(details);
  }

  function listenMessage(details) {
    return socket.on(SOCKET_KEYS.MESSAGE, (data) => {
      console.log(data);
      chatUtils.updateMessage({
        _id: details?._id, // chatId
        data,
      });
      // ack("Received Data");
    });
  }

  return { createRoom, sendMessage, listenMessage, chatUtils };
};
