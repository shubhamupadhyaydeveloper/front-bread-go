import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import { toast } from "sonner";

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
            toast.success("Otp verified successfully")
            navigate("/login");
        },
        onError: (error: any) => {
            console.error("Verify OTP failed:", error);
            toast.error("Verify OTP failed")
        },
    });
};

