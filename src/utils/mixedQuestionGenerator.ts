import type { ScaleDefinition } from '../types/scales';
import type { MixedLevelConfig, MixedQuestion } from '../types/game';

/**
 * Generates questions for mixed practice mode where questions come from multiple randomly selected scales
 * @param allScales - All available scales to choose from
 * @param level - Mixed level configuration
 * @returns Array of mixed questions with scale information
 */
export const generateMixedQuestions = (
    allScales: ScaleDefinition[],
    level: MixedLevelConfig
): MixedQuestion[] => {
    const { scaleCount, missingNotes, questionsCount, allowedPositions = [] } = level;

    // 1. Randomly select scaleCount scales from all available scales
    const shuffledScales = [...allScales].sort(() => Math.random() - 0.5);
    const selectedScales = shuffledScales.slice(0, Math.min(scaleCount, allScales.length));

    // 2. Generate all possible combinations of missing indices
    const combinations: number[][] = [];

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

    // 3. Shuffle combinations
    for (let i = combinations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
    }

    // 4. Distribute questions across selected scales
    const questions: MixedQuestion[] = [];
    const questionsPerScale = Math.ceil(questionsCount / selectedScales.length);

    for (let scaleIndex = 0; scaleIndex < selectedScales.length; scaleIndex++) {
        const scale = selectedScales[scaleIndex];

        // Calculate how many questions for this scale
        const remainingQuestions = questionsCount - questions.length;
        const numQuestionsForThisScale = Math.min(questionsPerScale, remainingQuestions);

        for (let i = 0; i < numQuestionsForThisScale; i++) {
            // Cycle through combinations if needed
            const combinationIndex = (scaleIndex * questionsPerScale + i) % combinations.length;
            const hiddenPositions = combinations[combinationIndex];

            questions.push({
                scaleNotes: scale.notes,
                hiddenPositions: hiddenPositions,
                answered: false,
                correct: null,
                userAnswers: new Map(),
                scaleName: scale.name,
                scaleId: scale.id,
            });
        }
    }

    // 5. Shuffle the final question order for variety
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions;
};
