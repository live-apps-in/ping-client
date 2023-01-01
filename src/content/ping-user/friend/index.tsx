import { useQueryState } from 'src/hooks';
import { handleError } from 'src/utils';
import { styled } from '@mui/material';
import { CustomCard } from 'src/components';
import { FriendCard } from './components';

const ViewFriendsContainerWrapper = styled(CustomCard)``;

export const ViewFriends: React.FC = () => {

    const [friends=[], loading] = useQueryState({
        queryKey: 'friend',
        queryFn: () => [{ name: 'Jaga', email: 'jaga@mail.com', requestId: 'test', status: 'approved', image: null }],
        // queryFn: friendApi.fetchFriends,
        onError: handleError
    });

    console.log(friends);

    return (
        <ViewFriendsContainerWrapper loading={loading} headerProps={{ title: 'Friends' }}>
            {friends.map((friend, index) => (
                <FriendCard {...friend} key={index} />
            ))}
        </ViewFriendsContainerWrapper>
    );
};

export * from './request';
