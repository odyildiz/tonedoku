import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'success';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "rounded-lg px-4 py-2 sm:px-6 sm:py-3 font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[44px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)]";

    const variants = {
        primary: "bg-[var(--color-primary)] text-white hover:opacity-90 shadow-lg shadow-[var(--color-primary)]/20 focus:ring-[var(--color-primary)]",
        secondary: "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface)]/80 focus:ring-[var(--color-text-muted)]",
        outline: "border-2 border-[var(--color-text-muted)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] focus:ring-[var(--color-text-muted)]",
        success: "bg-[var(--color-success)] text-white hover:opacity-90 shadow-lg shadow-[var(--color-success)]/20 focus:ring-[var(--color-success)]"
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
