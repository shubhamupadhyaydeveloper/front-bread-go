import { useQuery, UseQueryResult } from "@tanstack/react-query"
import apiClient from "../apiClient";
import { PostResponse } from "../../types/post";

export const useGetPostById = (id: string): UseQueryResult<{data : PostResponse}> => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const response = await apiClient.get(`/posts/${id}`);
            return response.data;
        },
        enabled: !!id,
    })
}
