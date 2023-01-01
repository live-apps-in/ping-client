import { FRIENDS, FRIEND_DETAILS } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class FriendApi {
    fetchFriends(): Promise<FRIENDS> {
        return createApiFunction(() => gateway.get('/friends'));
    }
    respondToRequest(requestId: FRIEND_DETAILS['requestId'], action: FRIEND_DETAILS['status']) {
        return createApiFunction(() => gateway.patch(`/friend/request/${requestId}/${action}`));
    }
}

export const friendApi = new FriendApi();
