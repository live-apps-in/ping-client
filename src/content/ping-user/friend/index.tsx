import { useQueryState } from 'src/hooks';
import { handleError } from 'src/utils';
import { styled } from '@mui/material';
import { CustomButton, CustomCard, UserCard } from 'src/components';
import { SearchUser } from '../users';
import { friendApi } from 'src/api';

const ViewFriendsContainerWrapper = styled(CustomCard)``;

export const ViewFriends: React.FC = () => {

    const [friends=[], loading] = useQueryState({
        queryKey: 'friend',
        // queryFn: () => [{ name: 'Jaga', email: 'jaga@mail.com', requestId: 'test', status: 'approved', image: null }],
        queryFn: friendApi.fetchFriends,
        onError: handleError
    });

    const handleSearchPeople = () => {
        window.modal({
            type: 'custom', 
            component: (props) => <SearchUser {...props} /> ,
            containerProps: { closeOnClick: true }
        });
    };

    return (
        <ViewFriendsContainerWrapper loading={loading} headerProps={{ 
            title: 'Friends',
            action: <>
                <CustomButton onClick={handleSearchPeople}>Search People</CustomButton>
                <CustomButton href='/ping_user/friend/request'>Requests</CustomButton>
            </>
        }}>
            {friends.map((friend, index) => (
                <UserCard {...friend} key={index} />
            ))}
        </ViewFriendsContainerWrapper>
    );
};

export * from './request';
