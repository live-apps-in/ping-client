import { styled } from '@mui/material';
import { friendApi } from "src/api";
import { CustomCard, UserCard } from 'src/components';
import { useQueryState } from "src/hooks";
import { handleError } from "src/utils";

const SentRequestsWrapper = styled(CustomCard)`

`;

export const SentRequests: React.FC = () => {

    const [friendRequests = [], loading, { refetch }] = useQueryState({
        queryKey: "friend-request.outgoing",
        queryFn: () => friendApi.fetchFriendRequests('outgoing'),
        onError: handleError
    });

    return <SentRequestsWrapper loading={loading}>
        {friendRequests.map((request, index) => 
                <UserCard {...request} afterActionComplete={refetch} key={index} />
            )
        }
    </SentRequestsWrapper>;
};
