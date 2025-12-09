import type { Note, NoteName } from '../types/scales';
import type { NoteNotation } from './storage';

const SOLFEGE_NAMES: Record<NoteName, string> = {
  'C': 'Do',
  'D': 'Re',
  'E': 'Mi',
  'F': 'Fa',
  'G': 'Sol',
  'A': 'La',
  'B': 'Si',
};

export function getDisplayNote(note: Note, notation: NoteNotation): string {
  const baseName = notation === 'solfege' ? SOLFEGE_NAMES[note.name] : note.name;

  if (note.accidental === 'sharp') {
    return `${baseName}#`;
  } else if (note.accidental === 'flat') {
    return `${baseName}b`;
  }

  return baseName;
}

export function getDisplayNoteName(noteName: NoteName, notation: NoteNotation): string {
  return notation === 'solfege' ? SOLFEGE_NAMES[noteName] : noteName;
}
