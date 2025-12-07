import type { LevelConfig } from '../types/scales';

export const levels: LevelConfig[] = [
    {
        level: 1,
        missingNotes: 1,
        questionsCount: 8,
        allowedPositions: [1, 2, 5, 6], // 0-indexed: 1 (2nd), 2 (3rd), 5 (6th), 6 (7th).
        // Prompt said: "positions 1, 2, 5, 6 only - easier". Usually 1-based index in music theory (Scale degrees).
        // But array index is 0-based.
        // If I use 0-based index: 0=Root, 1=Second, 2=Third, 3=Fourth, 4=Fifth, 5=Sixth, 6=Seventh, 7=Octave.
        // "Positions 1, 2, 5, 6". If 1-based scale degrees: Root(1), Second(2), Fifth(5), Sixth(6)?
        // The prompt says "positions 1, 2, 5, 6 only - easier".
        // 1st note (Root) is usually given.
        // Let's assume the prompt meant specific indices. "easier" usually implies avoiding the leading tone or tritone, or just random ones.
        // Let's stick strictly to what the prompt said for now and interpret it in the logic.
        // I will write comments to clarify. I'll store them as 0-based indices if I decide to map them to array indices.
        // However, to match the prompt exactly, I will put the numbers 1, 2, 5, 6 and interpret them later as 1-based scale degrees (1=Root).
        // Wait, if 1=Root, then missing 1 is Root missing? That's usually harder.
        // "Level 2: 1 missing note (positions 1-6 - any except root/octave)"
        // If Level 2 excludes Root(1) and Octave(8), and allows 1-6? That doesn't make sense if 1=Root.
        // If 1=Root, then Level 2 excluding Root/Octave means excluding 1 and 8. So allowed 2,3,4,5,6,7.
        // The prompt says "positions 1-6". Maybe it means indices 1...6 (which are 2nd note to 7th note)?
        // "Level 1: positions 1, 2, 5, 6 only".
        // Let's assume these are 0-based indices into the notes array [0..7].
        // Index 0: Root. Index 7: Octave.
        // Level 2: "positions 1-6 - any except root/octave". If indices 1..6, that's exactly "except root/octave".
        // So 0-based indexing seems to be the intended meaning.
        // Level 1: indices 1, 2, 5, 6. (2nd, 3rd, 6th, 7th).
        // Okay, I will use 0-based indices in the config for code clarity.
    },
    {
        level: 2,
        missingNotes: 1,
        questionsCount: 8,
        allowedPositions: [1, 2, 3, 4, 5, 6], // Excludes 0 (Root) and 7 (Octave)
    },
    {
        level: 3,
        missingNotes: 2,
        questionsCount: 8,
        allowedPositions: [1, 2, 3, 4, 5, 6],
    },
    {
        level: 4,
        missingNotes: 3,
        questionsCount: 8,
        allowedPositions: [1, 2, 3, 4, 5, 6],
    },
    {
        level: 5,
        missingNotes: 4,
        questionsCount: 8,
        allowedPositions: [1, 2, 3, 4, 5, 6],
    },
];
