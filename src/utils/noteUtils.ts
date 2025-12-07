import type { Note, NoteName, Accidental } from '../types/scales';


export const formatNote = (note: Note): string => {
    return note.display;
};

export const compareNotes = (a: Note, b: Note): boolean => {
    return a.name === b.name && a.accidental === b.accidental;
};

export const parseNoteInput = (name: NoteName, accidental: Accidental): Note => {
    let display = name as string;
    if (accidental === 'sharp') {
        display += '#';
    } else if (accidental === 'flat') {
        display += 'b';
    }

    return {
        name,
        accidental,
        display,
    };
};
