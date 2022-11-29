import { CustomButton } from "src/components";
import { useAuth } from "src/hooks";

export const PingUserHomeContent = () => {
    const { logout } = useAuth();
    return <div>
        <CustomButton onClick={() => logout()}>Logout</CustomButton>
    </div>;
};
