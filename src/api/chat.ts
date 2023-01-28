import { CHAT_LIST } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class ChatApi {
  getChatList(): Promise<CHAT_LIST> {
    return createApiFunction(() => gateway.get("/chats"));
  }
}

export const chatApi = new ChatApi();
