import { io } from "socket.io-client";
import { socketConfig, SOCKET_KEYS } from "src/config";
const socket = io(socketConfig.url);

export function useSocket() {
  function connectionStatus() {
    socket.on("connect", () => {
      if (socket.connected) {
        console.log("connected");
      } else {
        console.log("disconnected");
      }
    });
  }

  function rooms() {
    return [];
  }

  function createRoom(details) {
    socket.emit(SOCKET_KEYS.PRIVATE_CHAT, details);
  }

  function sendPrivateMessage(details) {
    return socket.emit(SOCKET_KEYS.SEND_PRIVATE_MESSAGE, details);
  }

  function receivePrivateMessage() {
    console.log(
      SOCKET_KEYS.RECEIVE_PRIVATE_MESSAGE,
      "receive private message initiated"
    );
    // return new Promise((resolve) => {
    return socket
      .off(SOCKET_KEYS.RECEIVE_PRIVATE_MESSAGE)
      .on(SOCKET_KEYS.RECEIVE_PRIVATE_MESSAGE, (data, ack) => {
        // resolve(data);
        console.log(data);
        ack("Received Data");
      });
    // });
  }

  return {
    rooms,
    socket,
    connectionStatus,
    createRoom,
    sendPrivateMessage,
    receivePrivateMessage,
  };
}
