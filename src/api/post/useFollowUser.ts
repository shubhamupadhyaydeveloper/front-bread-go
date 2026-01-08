import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

type followRequest = {
    following_user_id : number
}

export const useFollowUser = () => {
    return useMutation({
        mutationFn: async (data: followRequest) => {
            const response = await apiClient.post("/users/follow", data);
            return response.data;
        },
    })
}


