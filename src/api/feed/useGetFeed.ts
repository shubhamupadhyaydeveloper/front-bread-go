import { useQuery, UseQueryResult } from "@tanstack/react-query"
import apiClient from "../apiClient";
import { FeedResponse } from "../../types/feed";

export const useGetFeed = (): UseQueryResult<FeedResponse[]> => {
    return useQuery({
        queryKey: ['feed'],
        queryFn: async () => {
            const response = await apiClient.get('/users/feed');
            return response.data.data;
        }
    })
}
