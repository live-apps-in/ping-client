import { FRIENDS, FRIEND_DETAILS, FRIEND_REQUEST_RESPOND_STATUS } from "src/model";
import { createApiFunction } from "src/utils";
import { gateway } from "./gateway";

class FriendApi {
    fetchFriends(): Promise<FRIENDS> {
        return createApiFunction(() => gateway.get('/friends'));
    }
    respondToRequest(requestId: FRIEND_DETAILS['_id'], action: FRIEND_REQUEST_RESPOND_STATUS) {
        return createApiFunction(() => gateway.patch(`/friend/request/${requestId}/${action}`));
    }
    sendFriendRequest(friendId: FRIEND_DETAILS['_id']) {
        return createApiFunction(() => gateway.post('/friend/request', { friendId }));
    }
    fetchFriendRequests(): Promise<any> {
        return createApiFunction(() => gateway.get('/friend/request'));
    }
}

export const friendApi = new FriendApi();
