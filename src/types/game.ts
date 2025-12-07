import type { Note, ScaleDefinition, LevelConfig, NoteName, Accidental } from './scales';

export interface Question {
    scaleNotes: Note[];           // Full 8 notes
    hiddenPositions: number[];    // Indices of hidden notes (0-based)
    answered: boolean;
    correct: boolean | null;
    userAnswers?: Map<number, Note>; // To track what user entered for which position
}

export interface GameState {
    // Current Game Configuration
    scale: ScaleDefinition | null;
    level: LevelConfig | null;

    // Game Session Data
    questions: Question[];
    currentQuestionIndex: number;

    // User Input State
    selectedNote: NoteName | null;
    selectedAccidental: Accidental;

    // Feedback State
    answerStatus: 'pending' | 'correct' | 'incorrect';
}
