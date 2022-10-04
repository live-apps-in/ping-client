import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLoader } from "src/components";
import { rbacSetup } from "src/data";
import { useAuth } from "src/hooks";

export const HomePageContent = () => {
  const { data } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(
        `${rbacSetup.homePage[data?.role as keyof typeof rbacSetup.homePage]}`,
        { replace: true }
      );
    }
  }, []);

  return <AppLoader />;
};
