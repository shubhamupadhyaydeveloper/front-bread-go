import { useQuery } from "@tanstack/react-query"
import apiClient from "../apiClient";
import { useAuthStore } from "../../store/authStore";

export const useUserInfo = () => {
    const { userInfo } = useAuthStore()
    console.log("userInfo information", userInfo)
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = await apiClient.get("/users/" + userInfo?.user_id);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    })
}

