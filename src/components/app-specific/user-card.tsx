import { useState } from 'react';
import { styled } from "@mui/material";
import { CustomButton, CustomCard, CustomText, FlexRow } from "src/components";
import { imageConfig } from "src/config";
import { USER_CARD_DETAILS } from "src/model";
import { friendApi } from 'src/api';
import { handleError } from 'src/utils';

const UserCardWrapper = styled((props: any) => <CustomCard {...props} />)`
    display: flex;
    flex-wrap: wrap;
`;

const ImageContainerWrapper = styled('div')`
    flex: 1;
    img {
        width: 100px;
        max-height: 100px;
        border-radius: 50%;
        object-fit: contain;
    }
`;

const ContentContainer = styled('div')`
    flex: 2;
    display: grid;
    grid-template-columns: 1fr auto;

`;

export const UserCard: React.FC<USER_CARD_DETAILS> = (props) => {

    const { image, name, email, status, requestId, _id } = props;
    const [respondStatus, setRespondStatus] = useState(null);
    const [sendingFriendRequest, setSendingFriendRequest] = useState(false);

    const isPending = status === 'pending';
    const isNew = status !== 'pending' && status !== 'approved' && status !== 'rejected';

    const handleRespondClick = async(status: USER_CARD_DETAILS['status']) => {
        setRespondStatus(status);
        try {
            await friendApi.respondToRequest(requestId, status);
        }
        catch(err) {
            handleError(err);
        }
        setRespondStatus(null);
    };

    const handleSendFriendRequestClick = async() => {
        setSendingFriendRequest(true);
        try {
            await friendApi.sendFriendRequest(_id);
        } catch(err) {
            handleError(err);
        }
        setSendingFriendRequest(false);
    };

    return (
        <UserCardWrapper>
            <ImageContainerWrapper>
                <img src={image || imageConfig.defaultAvatar} alt={name} />
            </ImageContainerWrapper>
            <ContentContainer>
                <div>
                    <CustomText variant="h3">{name}</CustomText>
                    <CustomText variant="subtitle1">{email}</CustomText>
                </div>
                {isPending && <FlexRow>
                    <CustomButton onClick={() => handleRespondClick('approved')} loading={respondStatus==='approved'}>Accept</CustomButton>
                    <CustomButton onClick={() => handleRespondClick('rejected')} loading={respondStatus==='rejected'}>Reject</CustomButton>
                </FlexRow>}
                {isNew && 
                    <CustomButton onClick={handleSendFriendRequestClick} loading={sendingFriendRequest}>
                        Send Friend Request
                    </CustomButton>
                }
            </ContentContainer>
        </UserCardWrapper>
    );
};