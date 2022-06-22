import { useSelector } from "src/redux";

export const HomePage = () => {
  const { theme } = useSelector((state) => state);
  console.log(theme);

  return <div>Home Page</div>;
};
