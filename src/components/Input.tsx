import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ type = 'text', placeholder, value, onChange, icon, ...props }) => {
    return (
        <div className="w-full">
            <div className="relative flex items-center">
                <input
                    type={type}
                    className="w-full bg-[var(--surface-color)] text-[var(--text-main)] border border-[var(--border-color)] rounded-xl px-4 py-3 outline-none focus:border-[var(--primary-color)] transition-colors placeholder:text-[var(--text-secondary)]"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                {icon && <div className="absolute right-4 text-[var(--text-secondary)]">{icon}</div>}
            </div>
        </div>
    );
};

export default Input;
