import { useRoutes } from "react-router-dom";
import { routeDefinition } from "src/routes";

export const Routes: React.FC = () => {
  const routes = useRoutes(routeDefinition);
  return routes;
};
