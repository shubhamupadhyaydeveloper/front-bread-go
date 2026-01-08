import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface CreatePostRequest {
    Title: string,
    Content: string,
    Tags?: string[],
    Image?: File
}

export const useCreatePost = () => {
    return useMutation({
        mutationFn: async (post: CreatePostRequest) => {
            const formData = new FormData()

            formData.append("title", post.Title)
            formData.append("content", post.Content)
            if (post.Tags?.length) {
                post.Tags.forEach(tag => {
                    formData.append("tags", tag);
                    // backend will receive Tags as array
                });
            }
            if (post.Image) {
                formData.append("image", post.Image);
            }

            const response = await apiClient.post("/posts", formData, {
                headers : {
                    "Content-Type" :  "multipart/form-data"
                }
            });
            return response.data;
        }
    })
}

