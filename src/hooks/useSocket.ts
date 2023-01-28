import { QueryClient, useQueryClient } from "react-query";
import { io } from "socket.io-client";
import { authConfig, socketConfig, SOCKET_KEYS } from "src/config";
import { useChatConnections } from "./socket-connection-hooks";

export const socket = io(socketConfig.url, {
  query: {
    token: localStorage.getItem(authConfig.tokenAccessor),
  },
});

// params provided to child hooks of useSocket
export interface USE_SOCKET_PARAMS_BASE {
  socket: typeof socket;
}

export function useSocket() {
  const queryClient = useQueryClient();

  const chatConnections = useChatConnections({
    socket,
  });

  function connectionStatus() {
    socket.on(SOCKET_KEYS.CONNECT, () => {
      if (socket.connected) {
        console.log("connected");
      } else {
        console.log("disconnected");
      }
    });
  }

  return {
    socket,
    connectionStatus,
    queryClient,
    ...chatConnections,
  };
}
