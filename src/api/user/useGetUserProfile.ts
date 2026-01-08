import { useQuery, UseQueryResult } from "@tanstack/react-query"
import apiClient from "../apiClient";
import { userInfo } from "../../types/user";

export const useGetUserProfile = (userId: string | undefined): UseQueryResult<{ user: userInfo, followers: number, following: number }> => {
    return useQuery({
        queryKey: ["userProfile", userId],
        queryFn: async () => {
            const response = await apiClient.get("/users/" + userId);
            return response.data.data;
        },
        enabled: !!userId, // Only run when we have a userId
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    })
}
