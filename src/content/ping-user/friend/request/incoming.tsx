import { styled } from '@mui/material';
import { friendApi } from "src/api";
import { CustomCard, UserCard } from 'src/components';
import { useQueryState } from "src/hooks";
import { handleError } from "src/utils";

const IncomingRequestsWrapper = styled(CustomCard)`

`;

export const IncomingRequests: React.FC = () => {

    const [friendRequests = [], loading, { refetch }] = useQueryState({
        queryKey: "friend-request",
        queryFn: friendApi.fetchFriendRequests,
        onError: handleError
    });

    return <IncomingRequestsWrapper loading={loading}>
        {friendRequests.filter(request => 
            request.type === 'incoming'
        ).map((request, index) => <UserCard {...request} afterActionComplete={refetch} key={index} />)}
    </IncomingRequestsWrapper>;
};