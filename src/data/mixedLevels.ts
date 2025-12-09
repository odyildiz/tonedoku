import type { MixedLevelConfig } from '../types/game';

export const mixedLevels: MixedLevelConfig[] = [
    {
        level: 1,
        missingNotes: 1,
        questionsCount: 8,
        scaleCount: 4, // Easy: 4 random scales
        allowedPositions: [1, 2, 5, 6], // Same as regular Level 1 - easier positions
    },
    {
        level: 2,
        missingNotes: 1,
        questionsCount: 10,
        scaleCount: 6, // Medium: 6 random scales
        allowedPositions: [1, 2, 3, 4, 5, 6], // Excludes root and octave
    },
    {
        level: 3,
        missingNotes: 2,
        questionsCount: 10,
        scaleCount: 8, // Hard: 8 random scales
        allowedPositions: [1, 2, 3, 4, 5, 6],
    },
    {
        level: 4,
        missingNotes: 2,
        questionsCount: 12,
        scaleCount: 10, // Expert: 10 random scales
        allowedPositions: [1, 2, 3, 4, 5, 6],
    },
    {
        level: 5,
        missingNotes: 3,
        questionsCount: 12,
        scaleCount: 12, // Master: All 12 scales
        allowedPositions: [1, 2, 3, 4, 5, 6],
    },
];
