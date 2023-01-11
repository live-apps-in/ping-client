import { styled } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useLocation } from "react-router-dom";
import { CustomTabNavigation, CustomTabPanel, CustomTabPanelsContainer } from "src/components";
import { getSearchQuery } from "src/utils";
import { IncomingRequests } from "./incoming";
import { SentRequests } from "./sent";

const FriendRequestsWrapper = styled('div')`
    display: grid;
    grid-template-rows: 1fr auto;
`;

const FriendRequestsNavigation = styled('div')`

`;

const FriendRequestsListWrapper = styled('div')`
    overflow: auto;
`;

export const Request: React.FC = () => {

    const { search } = useLocation();
    const { tab = '' } = getSearchQuery(search) || {};

    return (
        <FriendRequestsWrapper>
            <FriendRequestsNavigation>
                <CustomTabNavigation initialActiveTabIndex={tab as string}>
                    <Tab label='Incoming Requests' />
                    <Tab label='Sent Requests' />
                </CustomTabNavigation>
            </FriendRequestsNavigation>
            <FriendRequestsListWrapper>
                <CustomTabPanelsContainer initialActiveTabIndex={tab as string}>
                    <CustomTabPanel>
                        <IncomingRequests />
                    </CustomTabPanel>
                    <CustomTabPanel>
                        <SentRequests />
                    </CustomTabPanel>
                </CustomTabPanelsContainer>
            </FriendRequestsListWrapper>
        </FriendRequestsWrapper>
    );
};
