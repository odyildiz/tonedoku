import React from 'react';
import type { Accidental } from '../../types/scales';

interface AccidentalSelectorProps {
    selectedAccidental: Accidental;
    onAccidentalSelect: (accidental: Accidental) => void;
    disabled?: boolean;
}

const ACCIDENTALS: { value: Accidental; label: string; symbol: string }[] = [
    { value: 'natural', label: 'Natural', symbol: '♮' },
    { value: 'sharp', label: 'Sharp', symbol: '♯' },
    { value: 'flat', label: 'Flat', symbol: '♭' },
];

const AccidentalSelector: React.FC<AccidentalSelectorProps> = React.memo(({ selectedAccidental, onAccidentalSelect, disabled = false }) => {
    return (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 py-1 sm:py-2">
            {ACCIDENTALS.map((acc) => (
                <button
                    key={acc.value}
                    onClick={() => !disabled && onAccidentalSelect(acc.value)}
                    disabled={disabled}
                    className={`
                        min-w-[44px] min-h-[44px] w-14 h-14 sm:w-16 sm:h-16 rounded-lg text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-200 flex items-center justify-center touch-manipulation
                        active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]
                        ${selectedAccidental === acc.value
                            ? 'bg-[var(--color-primary)] text-white shadow-lg border-2 border-[var(--color-primary)] scale-105'
                            : 'bg-[var(--color-surface)] text-[var(--color-text)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:scale-105'
                        } ${disabled ? 'opacity-50 cursor-not-allowed hover:border-[var(--color-border)] hover:scale-100 active:scale-100' : ''}
                    `}
                    aria-label={acc.label}
                >
                    {acc.symbol}
                </button>
            ))}
        </div>
    );
});

AccidentalSelector.displayName = 'AccidentalSelector';

export default AccidentalSelector;
