import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    onCheckStatus?: () => void;
    rightElement?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false, rightElement }) => {
    const navigate = useNavigate();

    return (
        <header className="flex w-full items-center justify-between py-4 sm:py-6">
            <button
                onClick={() => showBack ? navigate(-1) : navigate('/')}
                className="flex items-center justify-center rounded-full bg-[var(--color-surface)] p-2 sm:p-3 text-[var(--color-text-muted)] transition-all duration-200 hover:bg-[var(--color-surface)]/80 hover:text-[var(--color-text)] hover:scale-105 active:scale-95 cursor-pointer min-w-[44px] min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
                aria-label={showBack ? "Back" : "Home"}
            >
                {showBack ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                )}
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-text)] text-center truncate px-2">{title}</h1>
            {rightElement ? (
                <div className="flex items-center justify-center min-w-[44px]">{rightElement}</div>
            ) : (
                <div className="min-w-[44px]" />
            )}
        </header>
    );
};

export default Header;
