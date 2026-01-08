import { useAuthStore } from "../../store/authStore";
import { userInfo } from "../../types/user";

/**
 * Hook to get the current logged-in user's info from Zustand store
 * This returns the userInfo that was set during login
 * For fetching a specific user's profile, use useGetUserProfile instead
 */
export const useUserInfo = (): {
    user: userInfo | null,
    followers: number,
    following: number,
    isLoading: boolean
} => {
    const { userInfo, loading } = useAuthStore()

    return {
        user: userInfo,
        followers: 0, // These would need to be stored in Zustand if needed
        following: 0, // Or fetched separately
        isLoading: loading
    };
}
