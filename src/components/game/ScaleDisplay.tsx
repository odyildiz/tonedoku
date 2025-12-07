import React from 'react';
import type { Note } from '../../types/scales';

interface ScaleSlotProps {
    note: Note | null;
    isLocked: boolean;
    isActive?: boolean;
    isUserAnswer?: boolean;
    onClick?: () => void;
}

const ScaleSlot: React.FC<ScaleSlotProps> = ({ note, isLocked, isActive, isUserAnswer, onClick }) => {
    // Determine styles based on state - Responsive sizing: smaller on mobile
    let baseStyles = "flex items-center justify-center w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-18 rounded-lg text-lg sm:text-xl md:text-2xl font-bold transition-all border-2 duration-300 touch-manipulation";

    if (isLocked) {
        if (isUserAnswer) {
            // Correctly answered slot
            baseStyles += " bg-[var(--color-success)]/10 border-[var(--color-success)] text-[var(--color-success)] animate-bounce-in";
        } else {
            // Pre-filled stable notes
            baseStyles += " border-transparent bg-transparent text-[var(--color-text)]";
        }
    } else {
        // User interactive slots - ensure minimum touch target size (44px)
        baseStyles += " cursor-pointer shadow-sm min-w-[44px] min-h-[44px]";
        if (note) {
            // User 'pending' selection (in-progress)
            baseStyles += " bg-[var(--color-surface)] border-[var(--color-primary)] text-[var(--color-primary)]";
        } else {
            // Empty slot waiting for input
            baseStyles += " bg-[var(--color-surface)] border-dashed border-[var(--color-text-muted)] text-[var(--color-text-muted)]";
        }
    }

    if (isActive) {
        baseStyles += " ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--color-background)] scale-110";
    }

    return (
        <div className={baseStyles} onClick={isLocked ? undefined : onClick}>
            {note ? note.display : '?'}
        </div>
    );
};

interface ScaleDisplayProps {
    slots: {
        note: Note | null;
        isLocked: boolean;
        isActive?: boolean;
        isUserAnswer?: boolean;
    }[];
    onSlotClick?: (index: number) => void;
    answerStatus?: 'pending' | 'correct' | 'incorrect';
}

const ScaleDisplay: React.FC<ScaleDisplayProps> = ({ slots, onSlotClick, answerStatus }) => {
    let containerStyles = "flex w-full items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 py-4 sm:py-6 md:py-8 overflow-x-auto rounded-xl transition-colors duration-300 px-2";

    // Add background feedback based on status
    if (answerStatus === 'correct') {
        containerStyles += " bg-[var(--color-success)]/5 ring-2 ring-[var(--color-success)]/20";
    } else if (answerStatus === 'incorrect') {
        containerStyles += " bg-[var(--color-error)]/5 ring-2 ring-[var(--color-error)]/20 animate-shake";
    }

    return (
        <div className={containerStyles}>
            {slots.map((slot, index) => (
                <ScaleSlot
                    key={index}
                    note={slot.note}
                    isLocked={slot.isLocked}
                    isActive={slot.isActive}
                    isUserAnswer={slot.isUserAnswer}
                    onClick={() => onSlotClick?.(index)}
                />
            ))}
        </div>
    );
};

export default ScaleDisplay;

