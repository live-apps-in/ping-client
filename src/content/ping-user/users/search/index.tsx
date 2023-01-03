import { styled } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { userApi } from "src/api";
import { CONFIG_TYPE, CustomButton, CUSTOM_MODAL_COMPONENT_PROPS, RecursiveContainer, UserCard } from "src/components";
import { USER_CARD_DETAILS } from "src/model";
import { searchUserSchema } from "src/schema";
import { handleError } from "src/utils";

const SearchUsersContainerWrapper = styled('div')`
    width: 100vw;
    max-width: 600px;
    max-height: 90vh
    display: grid;
    grid-template-rows: 100px auto;
`;

const SearchToolsWrapper = styled('form')`
    display: grid;
    grid-template-columns: 1fr auto;
`;

const UsersListContainer = styled('div')`
    overflow: auto;
`;

export const SearchUser: React.FC<CUSTOM_MODAL_COMPONENT_PROPS> = ({ onCancel }) => {

    const [user, setUser] = useState<USER_CARD_DETAILS>(null);

    const handleSubmit = async(details) => {
        try {
            if(details && details.user) {
                const { user } = details;
                details = {
                    user_name: user.split('#')[0] || '',
                    user_tag: user.split('#')[1] || ''
                };
                const data = await userApi.searchUser(details);
                setUser(data || null);
            }
        }
        catch(err) {
            handleError(err);
        }
    };

    const formik = useFormik({
        initialValues: {
            user: '' // user_name + user_tag
        },
        validationSchema: searchUserSchema,
        onSubmit: handleSubmit
    });

    const config: CONFIG_TYPE = [
        {
            name: 'user',
            placeholder: 'user_name#12qe'
        }
    ];

    return (
        <SearchUsersContainerWrapper>
            <SearchToolsWrapper onSubmit={formik.handleSubmit}>
                <RecursiveContainer config={config} validationSchema={searchUserSchema} formik={formik} />
                <CustomButton type='submit'>Search</CustomButton>
            </SearchToolsWrapper>
            <UsersListContainer>
                {user && <UserCard {...user} />}
            </UsersListContainer>
        </SearchUsersContainerWrapper>
    );
};
