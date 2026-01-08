import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PostResponse } from "../../types/post";

export const useGetUserPosts = (userId?: string): UseQueryResult<{ data: PostResponse[] }> => {
    return useQuery({
        queryKey: ['user-posts', userId],
        queryFn: async () => {
            const endpoint = userId ? `/users/${userId}/posts` : '/posts';
            const response = await apiClient.get(endpoint);
            return response.data;
        },
        enabled: !!userId, // Only run when we have a userId
    })
}
