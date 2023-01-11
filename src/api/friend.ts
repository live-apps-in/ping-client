import { FRIENDS, FRIEND_DETAILS, FRIEND_REQUEST_DETAILS, FRIEND_REQUESTS, FRIEND_REQUEST_RESPOND_STATUS } from "src/model";
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
    fetchFriendRequests(type: FRIEND_REQUEST_DETAILS['type']): Promise<FRIEND_REQUESTS> {
        return createApiFunction(() => gateway.get(`/friend/request/${type}`));
    }
}

export const friendApi = new FriendApi();
