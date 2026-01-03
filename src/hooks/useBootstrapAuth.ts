import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import apiClient from "../api/apiClient";

export const useBootstrapAuth = () => {
  const { setAccessToken, setIsAuthenticated, clearAuth, setLoading } = useAuthStore();

  useEffect(() => {
    const refresh = async (retry = false) => {
      try {
        setLoading(true);
        const res = await apiClient.post("/auth/refresh", {}, { withCredentials: true });

        setAccessToken(res.data.data.accessToken);
        setIsAuthenticated(true);

      } catch (err: any) {

        // 1. First fail → retry ONCE
        if (!retry) {
          console.warn("Refresh failed once — retrying...");
          return refresh(true);
        }

        // 2. Second fail → real logout
        console.warn("Refresh failed twice — clearing auth");
        clearAuth();

      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, []);
};
