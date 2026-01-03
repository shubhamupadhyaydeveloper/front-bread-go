import React, { useState } from 'react';

import Button from '../components/Button';
import Input from '../components/Input';

const Auth: React.FC = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [pendingAuth, setPendingAuth] = useState<{
        type: 'login' | 'signup';
        data: any;
    } | null>(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate sending OTP
            await new Promise(resolve => setTimeout(resolve, 800));

            // Store the pending authentication data
            setPendingAuth({
                type: isLogin ? 'login' : 'signup',
                data: formData
            });

            setUserEmail(formData.email);
            setShowOTP(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerify = async (otp: string) => {
        // Simulate OTP verification
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                // For demo purposes, accept any 6-digit code
                if (otp.length === 6) {
                    resolve(true);
                } else {
                    reject(new Error('Invalid OTP'));
                }
            }, 1000);
        });


    };

    const handleOTPResend = async () => {
        // Simulate resending OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('OTP resent to:', userEmail);
    };

    const handleOTPBack = () => {
        setShowOTP(false);
        setPendingAuth(null);
    };

    // if (showOTP) {
    //     return (
    //         <OTPVerification
    //             // email={userEmail}
    //             onVerify={handleOTPVerify}
    //             onResend={handleOTPResend}
    //             onBack={handleOTPBack}
    //         />
    //     );
    // }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] p-4 fade-in">
            <div className="text-5xl font-bold mb-12 tracking-tight">bread</div>

            <form
                className="w-full max-w-sm bg-[var(--surface-color)] rounded-2xl p-8 flex flex-col gap-4 scale-up"
                onSubmit={handleSubmit}
            >
                {!isLogin && (
                    <>
                        <Input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                <Input
                    name="email"
                    type="email"
                    placeholder="Email, phone or username"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <Button loading={loading} type="submit">
                    {isLogin ? 'Log in' : 'Sign up'}
                </Button>
            </form>

            <div className="mt-6 text-[var(--text-secondary)] flex items-center gap-2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign up' : 'Log in'}
                </Button>
            </div>

            {isLogin && (
                <Button variant="link" className="mt-2 text-sm">
                    Forgot password?
                </Button>
            )}
        </div>
    );
};

export default Auth;

