import type { Note, NoteName, Accidental } from '../types/scales';

export const checkAnswer = (targetNote: Note, inputName: NoteName, inputAccidental: Accidental): boolean => {
    // Compare name
    if (targetNote.name !== inputName) return false;

    // Compare accidental
    // targetNote.accidental might be 'natural', 'sharp', 'flat'
    // inputAccidental is same type
    if (targetNote.accidental !== inputAccidental) return false;

    return true;
};
