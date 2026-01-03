import { MutateFunction, useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiClient";

type RefreshTokenResponse = {
    accessToken: string;
    refreshToken: string;
};

export const useRefreshToken = (): UseMutationResult<RefreshTokenResponse> => {
    return useMutation({
        mutationFn : async () => {
            const response = await apiClient.post<RefreshTokenResponse>("/auth/refresh");
            return response.data;
        }
    })
}


