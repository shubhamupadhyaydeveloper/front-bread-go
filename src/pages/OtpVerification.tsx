import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useVerifyOtp } from '../api/auth/useVerifyOtp';

interface LocationState {
    email: string;
}

const OtpVerification: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    // Redirect to login if no state
    if (!state || !state.email) {
        navigate('/login');
        return null;
    }

    const { email } = state;
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { mutateAsync } = useVerifyOtp();

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);

        // Focus the last filled input or the next empty one
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            mutateAsync({ email, otp: otpString });
        } catch (err: any) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError('');
        setOtp(['', '', '', '', '', '']); // Clear OTP inputs
        try {
            // TODO: Implement a proper resend OTP API hook
            // For now, we'll just simulate a successful resend
            await new Promise(resolve => setTimeout(resolve, 1000));
            // const { mutateAsync } = useResendOtp();
            // await mutateAsync({ email });
        } catch (err: any) {
            setError(err.message || 'Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    const handleBack = () => {
        navigate('/signup');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] p-4 fade-in">
            <div className="text-5xl font-bold mb-12 tracking-tight">bread</div>

            <div className="w-full max-w-sm bg-[var(--surface-color)] rounded-2xl p-8 scale-up">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
                    <p className="text-[var(--text-secondary)] text-sm">
                        We've sent a 6-digit code to
                    </p>
                    <p className="text-[var(--primary-color)] text-sm font-medium mt-1">
                        {email}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex gap-2 justify-center">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-14 bg-[var(--surface-light)] text-[var(--text-main)] border border-[var(--border-color)] rounded-xl text-center text-xl font-semibold outline-none focus:border-[var(--primary-color)] transition-colors"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    {error && (
                        <div className="text-[var(--accent-red)] text-sm text-center">
                            {error}
                        </div>
                    )}

                    <Button loading={loading} type="submit">
                        Verify OTP
                    </Button>

                    <div className="flex flex-col gap-2 items-center">
                        {/* <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="text-[var(--text-secondary)] text-sm hover:text-[var(--primary-color)] transition-colors disabled:opacity-50"
                        >
                            {resending ? 'Resending...' : "Didn't receive the code? Resend"}
                        </button> */}

                        <button
                            type="button"
                            onClick={handleBack}
                            className="text-[var(--text-secondary)] text-sm hover:text-[var(--primary-color)] transition-colors"
                        >
                            ← Back to signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpVerification;
