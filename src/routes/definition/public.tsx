import { PublicRouteExample } from "src/content/public";
import { Public } from "src/guard";
import { ROUTES_DEFINITION } from "src/routes";
import { Helmet } from "react-helmet";

export const publicRoutes: ROUTES_DEFINITION = [
  {
    path: "/public",
    element: (
      <>
        <Helmet>
          <title>About Us - Nanban</title>
        </Helmet>
        <Public>
          <PublicRouteExample />
        </Public>
      </>
    ),
  },
];
