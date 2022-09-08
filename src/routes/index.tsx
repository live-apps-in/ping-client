import { ROUTE_DEFINITION } from "src/routes";
import { PageNotFound } from "src/components";
import { routeDefinition } from "./definition";
import { navigationLinks } from "./navigation-links";
import { Helmet } from "react-helmet";
import { Authenticated } from "src/guard";
import { HomePageContent } from "src/content";

export const routes: ROUTE_DEFINITION[] = [
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>Ping</title>
        </Helmet>
        <Authenticated>
          <HomePageContent />
        </Authenticated>
      </>
    ),
  },
  {
    path: "/",
    children: [...routeDefinition.auth],
  },
  {
    path: "/",
    children: [...routeDefinition.admin],
  },
  // for other roles/categories use the below routing format
  // {
  //   path: "/other",
  //   children: [{ path: "/other", element: <div>Other</div> }],
  // },
  ...routeDefinition.public,
  {
    path: "/404",
    element: (
      <>
        <Helmet>
          <title>Page not found - Nanban</title>
        </Helmet>
        <PageNotFound />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Helmet>
          <title>Page not found - Nanban</title>
        </Helmet>
        <PageNotFound />
      </>
    ),
  },
];

export { navigationLinks };

export * from "./router";
