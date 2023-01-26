// all socket connections regarding chat
import { SOCKET_KEYS, SOCKET_QUERY_CACHE_KEYS } from "src/config";
import { USE_SOCKET_PARAMS_BASE } from "../useSocket";

export interface USE_CHAT_CONNECTIONS extends USE_SOCKET_PARAMS_BASE {}

export const useChatConnections = (params: USE_CHAT_CONNECTIONS) => {
  const { socket, queryClient } = params;

  function createRoom(details) {
    socket.emit(SOCKET_KEYS.PRIVATE_CHAT, details);
    queryClient.setQueryData(SOCKET_QUERY_CACHE_KEYS.ACTIVE_ROOM, details);
  }

  function message(details = null) {
    if (details) {
      return socket.emit(SOCKET_KEYS.MESSAGE, details);
    }
    return socket.on(SOCKET_KEYS.MESSAGE, (data) => {
      // resolve(data);
      console.log(data);
      // ack("Received Data");
    });
  }

  return { createRoom, message };
};
