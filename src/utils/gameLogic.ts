import type { ScaleDefinition, LevelConfig, Question, Note } from '../types/scales';

/**
 * Generates a question (missing notes) based on the scale and level configuration.
 * @param scale The full scale definition
 * @param levelConfig The configuration for the current level
 * @returns A Question object with missing notes replaced by null
 */
export const generateQuestion = (scale: ScaleDefinition, levelConfig: LevelConfig): Question => {
    // 1. Determine which positions to hide
    const numMissing = levelConfig.missingNotes;
    const allowed = levelConfig.allowedPositions || [1, 2, 3, 4, 5, 6];

    // Shuffle the allowed positions to pick random ones
    // We use a simple Fisher-Yates shuffle approximation or just random selection
    const availablePositions = [...allowed];
    const missingIndices: number[] = [];

    // Select 'numMissing' unique positions from 'availablePositions'
    for (let i = 0; i < numMissing; i++) {
        if (availablePositions.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        missingIndices.push(availablePositions[randomIndex]);
        availablePositions.splice(randomIndex, 1);
    }

    // Sort indices just for consistency (optional)
    missingIndices.sort((a, b) => a - b);

    // 2. Create the notes array with nulls
    const questionNotes: (Note | null)[] = scale.notes.map((note, index) => {
        if (missingIndices.includes(index)) {
            return null;
        }
        return note;
    });

    return {
        scaleId: scale.id,
        notes: questionNotes,
        missingIndices: missingIndices
    };
};
