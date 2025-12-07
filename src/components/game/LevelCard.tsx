import React from 'react';

interface LevelCardProps {
    level: number;
    missingNotes: number;
    label?: string;
    onClick: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, missingNotes, label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group flex w-full flex-col rounded-xl border border-[var(--color-surface)] bg-[var(--color-surface)] p-5 text-left transition-all hover:bg-[var(--color-surface)]/80 hover:border-[var(--color-primary)] active:scale-[0.98] cursor-pointer"
        >
            <span className="mb-1 text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                Level {level}
            </span>
            <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-[var(--color-text)]">
                    {missingNotes} missing note{missingNotes > 1 ? 's' : ''}
                </span>
                {label && (
                    <span className="rounded-full bg-[var(--color-secondary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-secondary)]">
                        {label}
                    </span>
                )}
            </div>
        </button>
    );
};

export default LevelCard;
