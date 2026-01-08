import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import apiClient from "../api/apiClient";

export const useBootstrapAuth = () => {
  const { setAccessToken, setIsAuthenticated, clearAuth, setLoading, userInfo, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const refresh = async (retry = false) => {
      try {
        setLoading(true);
        console.log("🔄 Attempting to refresh access token...");
        const res = await apiClient.post("/auth/refresh", {}, { withCredentials: true });

        console.log("✅ Refresh response:", res.data);
        const newAccessToken = res.data.data?.accessToken || res.data.accessToken;

        if (!newAccessToken) {
          console.error("❌ No access token in refresh response:", res.data);
          throw new Error("No access token received");
        }

        setAccessToken(newAccessToken);
        setIsAuthenticated(true);

        // Verify it was set correctly
        const { accessToken: storedToken } = useAuthStore.getState();
        console.log("✅ Access token set successfully");
        console.log("🔑 Token in store:", storedToken?.substring(0, 30) + "...");
        console.log("✅ Tokens match:", storedToken === newAccessToken);

      } catch (err: any) {
        console.error("❌ Refresh error:", err.response?.data || err.message);

        // 1. First fail → retry ONCE
        if (!retry) {
          console.warn("⚠️ Refresh failed once — retrying...");
          return refresh(true);
        }

        // 2. Second fail → real logout
        console.warn("❌ Refresh failed twice — clearing auth");
        clearAuth();

      } finally {
        setLoading(false);
      }
    };

    // Only attempt refresh if user was previously authenticated
    // (userInfo exists in persisted storage)
    if (userInfo || isAuthenticated) {
      refresh();
    } else {
      setLoading(false);
    }
  }, []);
};
