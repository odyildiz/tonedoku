export type NoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type Accidental = 'natural' | 'sharp' | 'flat';

export interface Note {
    name: NoteName; // e.g. "C"
    accidental: Accidental; // e.g. "sharp"
    display: string;  // e.g., "F#", "Bb", "C"
}

export type ScaleCategory = 'major' | 'minor' | 'modal' | 'pentatonic' | 'other';

export interface ScaleDefinition {
    id: string;
    name: string;
    category: ScaleCategory;
    notes: Note[];  // 8 notes including octave
}

export interface LevelConfig {
    level: number;
    missingNotes: number;
    questionsCount: number;
    allowedPositions?: number[];  // Which positions can be missing (0-indexed or 1-indexed? The task says "positions 1, 2, 5, 6". Let's assume 1-based index or adjust accordingly. Let's stick to the prompt's 1-based index for description but usually array usage is 0-based. I'll make it explicit in comments or data.)
}

export type AnswerStatus = 'pending' | 'correct' | 'incorrect';

export interface Question {
    scaleId: string;
    notes: (Note | null)[]; // null represents a missing note
    missingIndices: number[]; // Indices of the missing notes
}
