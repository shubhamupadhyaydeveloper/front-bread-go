import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

type unFollowRequest = {
    following_user_id : number
}

export const useUnFollowUser = () => {
    return useMutation({ 
        mutationFn: async (data: unFollowRequest) => {
            const response = await apiClient.post("/users/unfollow", data);
            return response.data;
        },
    })
}


