import { FRIENDS } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class FriendApi {
    fetchFriends(): Promise<FRIENDS> {
        return createApiFunction(() => gateway.get('/friends'))
    }
}

export const friendApi = new FriendApi();
