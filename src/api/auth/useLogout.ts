import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";

export const useLogout = () => {
    const navigate = useNavigate();
    const { clearAuth } = useAuthStore();

    return useMutation({
        mutationFn: async () => {
            // Optional: Call logout endpoint to invalidate refresh token on server
            await apiClient.post("/auth/logout");
        },
        onSuccess: () => {
            // Clear auth state
            clearAuth();

            // Navigate to login
            navigate("/login");
        },
        onError: (error: any) => {
            console.error("Logout failed:", error);
            // Even if logout fails, clear local state
            clearAuth();
            navigate("/login");
        },
    });
};
