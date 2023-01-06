import { styled } from "@mui/material";
import { userApi } from "src/api";
import { CustomCard, UserCard } from "src/components";
import { useQueryState } from "src/hooks";
import { handleError } from "src/utils";

const UsersContainerWrapper = styled(CustomCard)`

`;

export const Users: React.FC = () => {

    const [users=[], loading] = useQueryState({
        queryKey: 'users',
        queryFn: userApi.fetchUsers,
        onError: handleError
    });

    return (
        <UsersContainerWrapper loading={loading} headerProps={{ title: 'Users' }}>
            {users.map((el, index) => <UserCard {...el} key={index} />)}
        </UsersContainerWrapper>
    );
};

export * from './search';