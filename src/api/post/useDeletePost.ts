import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

type deletePostRequest = {
    post_id : number
}

export const useDeletePost = () => {
    return useMutation({
        mutationFn: async ({post_id}:deletePostRequest) => {
            const response = await apiClient.delete(`posts/${post_id}`);
            return response.data;
        },
    })
}
