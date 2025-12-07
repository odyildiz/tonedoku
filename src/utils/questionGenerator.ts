import type { ScaleDefinition, LevelConfig } from '../types/scales';
import type { Question } from '../types/game';

export const generateQuestions = (scale: ScaleDefinition, level: LevelConfig): Question[] => {
    const { allowedPositions = [], missingNotes, questionsCount } = level;

    // 1. Generate all possible combinations of missing indices
    const combinations: number[][] = [];

    // Helper to generate combinations
    const combine = (start: number, current: number[]) => {
        if (current.length === missingNotes) {
            combinations.push([...current]);
            return;
        }

        for (let i = start; i < allowedPositions.length; i++) {
            combine(i + 1, [...current, allowedPositions[i]]);
        }
    };

    combine(0, []);

    // 2. Shuffle combinations
    for (let i = combinations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
    }

    // 3. Select questions
    const questions: Question[] = [];

    for (let i = 0; i < questionsCount; i++) {
        // Cycle through combinations if we need more than available
        const hiddenPositions = combinations[i % combinations.length];

        questions.push({
            scaleNotes: scale.notes,
            hiddenPositions: hiddenPositions,
            answered: false,
            correct: null,
            userAnswers: new Map() // Initialize empty user answers
        });
    }

    // Shuffle the final list of questions just to be sure (though cycling shuffled combinations is already random-ish)
    // Actually, if we cycle 4 items to get 8, we get A B C D A B C D. 
    // Ideally we want A B C D B D A C...
    // But since the combinations were shuffled, we get random subset.
    // If we have few combinations, repeating them is inevitable.

    return questions;
};
