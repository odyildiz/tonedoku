
import React from 'react';
import type { ScaleDefinition } from '../../types/scales';

interface ScaleCardProps {
    scale: ScaleDefinition;
    onClick: (scaleId: string) => void;
}

const ScaleCard: React.FC<ScaleCardProps> = React.memo(({ scale, onClick }) => {
    const rootNote = scale.notes[0];

    return (
        <button
            onClick={() => onClick(scale.id)}
            className="group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-surface)] p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--color-primary)]/20 active:translate-y-0 active:scale-95 border border-white/5 hover:border-[var(--color-primary)]/50 touch-manipulation focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative z-10 text-3xl sm:text-4xl font-bold text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)]">
                {rootNote.display}
            </span>

            <span className="relative z-10 mt-1 sm:mt-2 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider transition-colors duration-200 group-hover:text-[var(--color-text)]">
                {scale.category}
            </span>
        </button>
    );
});

ScaleCard.displayName = 'ScaleCard';

export default ScaleCard;
