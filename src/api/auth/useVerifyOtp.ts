import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";

interface OtpCredentials {
    email: string;
    otp: string
}

export const useVerifyOtp = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials: OtpCredentials) => {
            const response = await apiClient.post(
                "/auth/verify",
                credentials
            );
            return response.data;
        },
        onSuccess: (data) => {
            navigate("/login");
        },
        onError: (error: any) => {
            console.error("Verify OTP failed:", error);
        },
    });
};

