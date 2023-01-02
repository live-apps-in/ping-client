import { styled } from "@mui/material"
import { useState } from "react"
import { CustomDebounceInput, CUSTOM_MODAL_COMPONENT_PROPS, UserCard } from "src/components"
import { USER_CARDS } from "src/model"

const SearchUsersContainerWrapper = styled('div')`
    width: 100vw;
    max-width: 600px;
    max-height: 90vh
    display: grid;
    grid-template-rows: 100px auto;
`

const UsersListContainer = styled('div')`
    overflow: auto;
`

export const SearchUser: React.FC<CUSTOM_MODAL_COMPONENT_PROPS> = ({ onCancel }) => {

    const [users, setUsers] = useState<USER_CARDS>([]);

    return (
        <SearchUsersContainerWrapper>
            <div>
                Debounce Textbox
                {/* <CustomDebounceInput onChange={} /> */}
            </div>
            <UsersListContainer>
                {users.map((user, index) => <UserCard {...user} key={index} />)}
            </UsersListContainer>
        </SearchUsersContainerWrapper>
    )
}
