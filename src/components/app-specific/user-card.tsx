import { useState } from 'react';
import { styled } from "@mui/material";
import { CustomButton, CustomCard, CustomText, FlexRow } from "src/components";
import { imageConfig } from "src/config";
import { FRIEND_REQUEST_RESPOND_STATUS, USER_CARD_DETAILS } from "src/model";
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

export const UserCard: React.FC<USER_CARD_DETAILS & { afterActionComplete?: Function }> = (props) => {

    const { image, name, email, status, _id, friendInfo, afterActionComplete } = props;
    const [respondStatus, setRespondStatus] = useState(null);
    const [sendingFriendRequest, setSendingFriendRequest] = useState(false);

    const isPending = status === 'pending';
    const isNew = status !== 'pending' && status !== 'accepted' && status !== 'rejected';

    const handleRespondClick = async(status: FRIEND_REQUEST_RESPOND_STATUS) => {
        setRespondStatus(status);
        try {
            await friendApi.respondToRequest(_id, status);
            window.flash({ message: 'Successfully updated' });
            if(afterActionComplete) afterActionComplete();
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
            window.flash({ message: 'Successfully sent friend request' });
            if(afterActionComplete) afterActionComplete();
        } catch(err) {
            handleError(err);
        }
        setSendingFriendRequest(false);
    };

    return (
        <UserCardWrapper>
            <ImageContainerWrapper>
                <img src={((isPending && friendInfo) ? friendInfo.image : image) || imageConfig.defaultAvatar} alt={name} />
            </ImageContainerWrapper>
            <ContentContainer>
                <div>
                    <CustomText variant="h3">{(isPending && friendInfo) ? friendInfo.name : name}</CustomText>
                    <CustomText variant="subtitle1">{(isPending && friendInfo) ? friendInfo.email : email}</CustomText>
                </div>
                {isPending && friendInfo && <FlexRow>
                    <CustomButton onClick={() => handleRespondClick('accept')} loading={respondStatus==='accept'}>Accept</CustomButton>
                    <CustomButton onClick={() => handleRespondClick('reject')} loading={respondStatus==='reject'}>Reject</CustomButton>
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