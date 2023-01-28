import { ACTIVE_CHAT_DETAILS, CHAT_LIST, CHAT_STATE } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class ChatApi {
  getChatList(): Promise<CHAT_LIST> {
    return createApiFunction(() => gateway.get("/chats"));
  }
  fetchChatLog(
    chatId: ACTIVE_CHAT_DETAILS["_id"],
    page: number
  ): Promise<CHAT_STATE["messages"]> {
    return createApiFunction(() =>
      gateway.get(`/chat/${chatId}/messages?page=${page}`)
    );
  }
}

export const chatApi = new ChatApi();
