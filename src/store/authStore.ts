import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userInfo } from '../types/user';

interface AuthState {
    accessToken: string | null
    isAuthenticated: boolean;
    userInfo: userInfo | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setAccessToken: (accessToken: string) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void
    setUserInfo: (userInfo: userInfo) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: "",
            isAuthenticated: false,
            userInfo: null,
            loading: false,

            setAccessToken: (accessToken) =>
                set({
                    accessToken,
                }),

            setIsAuthenticated: (isAuthenticated) =>
                set({
                    isAuthenticated,
                }),

            setUserInfo: (userInfo) =>
                set({
                    userInfo,
                }),
            setLoading: (loading) =>
                set({
                    loading,
                }),
            clearAuth: () =>
                set({
                    accessToken: null,
                    isAuthenticated: false,
                    userInfo: null,
                }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                userInfo: state.userInfo,
                // Don't persist accessToken for security - it will be refreshed on app load
            }),
        }
    )
);
