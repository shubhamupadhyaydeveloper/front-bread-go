import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'link';
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    loading = false,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold text-[0.95rem] transition-all duration-200 ease-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

    const variantStyles = {
        primary: 'px-6 h-12 rounded-full bg-[var(--text-main)] text-[var(--bg-color)] hover:bg-[#e5e5e5] hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] w-full',
        secondary: 'px-6 h-12 rounded-full bg-[var(--surface-light)] text-[var(--text-main)] border border-[var(--border-color)] hover:bg-[var(--border-color)] w-full',
        ghost: 'p-2 h-auto w-auto bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-white/5',
        link: 'p-0 h-auto w-auto bg-transparent text-[var(--text-secondary)] font-normal hover:text-[var(--text-main)] hover:underline'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? '...' : children}
        </button>
    );
};

export default Button;
