import type { Note, ScaleDefinition, LevelConfig, NoteName, Accidental } from './scales';

export interface Question {
    scaleNotes: Note[];           // Full 8 notes
    hiddenPositions: number[];    // Indices of hidden notes (0-based)
    answered: boolean;
    correct: boolean | null;
    userAnswers?: Map<number, Note>; // To track what user entered for which position
}

export interface MixedLevelConfig {
    level: number;
    missingNotes: number;
    questionsCount: number;
    scaleCount: number; // How many different scales to include
    allowedPositions?: number[];
}

export interface MixedQuestion extends Question {
    scaleName: string; // Display which scale this question is from
    scaleId: string;   // Scale ID for reference
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
    lastCorrectNote: { name: NoteName; accidental: Accidental } | null;

    // Mixed Practice Mode
    mixedMode: boolean;
    mixedLevel: number | null;
    currentScaleName: string | null; // For display during mixed mode
}
