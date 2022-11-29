import { PublicRouteExample } from "src/content/public";
import { Public } from "src/guard";
import { ROUTES_DEFINITION } from "src/routes";
import { Helmet } from "react-helmet";
import { rbacSetup } from "src/data";

export const publicRoutes: ROUTES_DEFINITION = [
  {
    path: rbacSetup.homePage.public,
    element: (
      <>
        <Helmet>
          <title>Public Page</title>
        </Helmet>
        <Public>
          <PublicRouteExample />
        </Public>
      </>
    ),
  },
];
