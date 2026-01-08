import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/profile';
import Search from './pages/Search';
import PostDetails from './pages/PostDetails';
import OtpVerification from './pages/OtpVerification';
import { useAuthStore } from './store/authStore';
import { useBootstrapAuth } from './hooks/useBootstrapAuth';
import { Toaster } from 'sonner';

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    OTP_VERIFICATION: '/verify-otp',
    PROFILE: '/profile',
    SEARCH: '/search',
    POST_DETAILS: '/post/:id',
    ACTIVITY: '/activity',
};


const AppContent: React.FC = () => {
    const { isAuthenticated, userInfo } = useAuthStore();

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<OtpVerification />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                {/* Redirect /profile to current user's profile */}
                <Route
                    path="profile"
                    element={
                        userInfo?.id
                            ? <Navigate to={`/profile/${userInfo.id}`} replace />
                            : <div className="flex items-center justify-center min-h-screen">
                                <div className="text-[var(--text-secondary)]">Loading...</div>
                            </div>
                    }
                />
                <Route path="profile/:userId" element={<Profile />} />
            </Route>
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

const App: React.FC = () => {
    useBootstrapAuth();
    const { loading } = useAuthStore();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex justify-center bg-[var(--bg-color)]">
            <div className="w-full max-w-[600px]">
                <BrowserRouter>
                    <Toaster
                        richColors
                        position="bottom-right"
                        expand={true}
                        duration={3000}
                    />
                    <AppContent />
                </BrowserRouter>
            </div>
        </div>
    );
};

export default App;
