import { useAuthStore } from "../../store/authStore";

export const useCurrentUser = () => {
    const { isAuthenticated } = useAuthStore();

    return {
        isAuthenticated,
    };
};
