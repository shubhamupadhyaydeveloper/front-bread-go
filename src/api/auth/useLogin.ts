import { UseMutateAsyncFunction, UseMutateFunction, useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../types/user";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
   data :{
     accessToken: string;
    refreshToken: string;
    user_info: userInfo
   }
}

export const useLogin = (): UseMutationResult<LoginResponse, any, LoginCredentials> => {
    const navigate = useNavigate();
    const { setAccessToken, setUserInfo, setIsAuthenticated } = useAuthStore();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await apiClient.post<LoginResponse>(
                "/auth/login",
                credentials
            );
            return response.data;
        },
        onSuccess: (data) => {
            // Store tokens and user in Zustand store
            console.log("Login succesful",data.data.user_info)
            setAccessToken(data.data.accessToken);
            setUserInfo(data.data.user_info);
            setIsAuthenticated(true);
            // Navigate to home or dashboard
            navigate("/");
        },
        onError: (error: any) => {
            console.error("Login failed:", error);
            // You can add toast notifications here
        },
    });
};
