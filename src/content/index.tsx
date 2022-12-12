import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLoader } from "src/components";
import { rbacConfig } from "src/config";
import { useAuth } from "src/hooks";

export const HomePageContent = () => {
  const { data } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(
        `${rbacConfig.homePage[data?.role as keyof typeof rbacConfig.homePage]}`,
        { replace: true }
      );
    }
  }, []);

  return <AppLoader />;
};
