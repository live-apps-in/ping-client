import { rbacConfig } from "src/config";
import { ROUTES_DEFINITION } from "../router";
import { Helmet } from "react-helmet";
import { Authenticated } from "src/guard";
import { PingUserHomeContent, PingUserProfile, Request, ViewFriends } from "src/content/ping-user";
import { PingUserLayout } from "src/layouts";

export const pingUserRoutes: ROUTES_DEFINITION = [
    {
        path: rbacConfig.homePage.ping_user,
        element: (
            <>
                <Helmet>
                    <title>Ping</title>
                </Helmet>
                <Authenticated roles={['ping_user']}>
                    <PingUserLayout>
                        <PingUserHomeContent />
                    </PingUserLayout>
                </Authenticated>
            </>
        )
    },
    {
        path: '/ping_user/friend',
        element: (
            <>
                <Helmet>
                    <title>Ping</title>
                </Helmet>
                <Authenticated roles={['ping_user']}>
                    <PingUserLayout>
                        <ViewFriends />
                    </PingUserLayout>
                </Authenticated>
            </>
        )
    },
    {
        path: '/ping_user/profile',
        element: (
            <>
                <Helmet>
                    <title>Ping</title>
                </Helmet>
                <Authenticated roles={['ping_user']}>
                    <PingUserLayout>
                        <PingUserProfile />
                    </PingUserLayout>
                </Authenticated>
            </>
        )
    },
    {
        path: '/ping_user/friend/request',
        element: (
            <>
                <Helmet>
                    <title>Ping</title>
                </Helmet>
                <Authenticated roles={['ping_user']}>
                    <PingUserLayout>
                        <Request />
                    </PingUserLayout>
                </Authenticated>
            </>
        )
    }
];
