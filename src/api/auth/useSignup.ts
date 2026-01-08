import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SignupCredentials {
    email: string;
    password: string;
    username: string;
}

interface SignupResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        username: string;
    };
}

export const useSignup = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials: SignupCredentials) => {
            const response = await apiClient.post<SignupResponse>(
                "/auth/signup",
                credentials
            );
            return response.data;
        },
        onSuccess: (_,variables) => {
            // Navigate to home or dashboard
            toast.success("Otp sent on email")
            navigate("/verify-otp", {
                state: {
                    email: variables.email,
                }
            });
        },
        onError: (error: any) => {
            console.error("Signup failed:", error);
            toast.error("Signup failed")
        },
    });
};
