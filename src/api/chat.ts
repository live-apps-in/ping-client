import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class ChatApi {
  getChatList() {
    return createApiFunction(() => gateway.get("/chats"));
  }
}

export const chatApi = new ChatApi();
