import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { useSignup } from '../api/auth';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { mutateAsync } = useSignup();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            mutateAsync(formData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] p-4 fade-in">
            <div className="text-5xl font-bold mb-12 tracking-tight">bread</div>

            <form
                className="w-full max-w-sm bg-[var(--surface-color)] rounded-2xl p-8 flex flex-col gap-4 scale-up"
                onSubmit={handleSubmit}
            >
                <Input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
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
                    Sign up
                </Button>
            </form>

            <div className="mt-6 text-[var(--text-secondary)] flex items-center gap-2">
                Already have an account?
                <Button variant="link" onClick={() => navigate('/login')}>
                    Log in
                </Button>
            </div>
        </div>
    );
};

export default Signup;
