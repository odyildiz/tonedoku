import React from 'react';
import type { NoteName } from '../../types/scales';

interface NoteSelectorProps {
    selectedNote: NoteName | null;
    onNoteSelect: (note: NoteName) => void;
    disabled?: boolean;
}

const NOTES: NoteName[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const NoteSelector: React.FC<NoteSelectorProps> = React.memo(({ selectedNote, onNoteSelect, disabled = false }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 py-1 sm:py-2">
            {NOTES.map((note) => (
                <button
                    key={note}
                    onClick={() => !disabled && onNoteSelect(note)}
                    disabled={disabled}
                    className={`
                        min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full text-base sm:text-lg font-bold transition-all duration-200 touch-manipulation
                        active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]
                        ${selectedNote === note
                            ? 'bg-[var(--color-primary)] text-white shadow-lg scale-110'
                            : 'bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface)]/80 hover:scale-105'
                        } ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : ''}
                    `}
                >
                    {note}
                </button>
            ))}
        </div>
    );
});

NoteSelector.displayName = 'NoteSelector';

export default NoteSelector;
