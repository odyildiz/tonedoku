# Task 06: Core Game Logic

## Objective
Implement the game logic for generating questions, checking answers, and managing game state.

## Tasks

### 6.1 Question Generation
- [x] Create `utils/questionGenerator.ts`
- [x] Function: `generateQuestions(scale: ScaleDefinition, level: LevelConfig): Question[]`
- [x] Randomly select positions to hide (based on level config)
- [x] Level 1: Only positions 1, 2, 5, 6 (easier middle notes)
- [x] Level 2+: Any position except 0 and 7 (root/octave)
- [x] Generate 8 unique questions per level
- [x] Ensure variety in hidden positions across questions

### 6.2 Question Type Definition
- [x] Add to `types/game.ts`:
```typescript
interface Question {
  scaleNotes: Note[];           // Full 8 notes
  hiddenPositions: number[];    // Indices of hidden notes
  answered: boolean;
  correct: boolean | null;
}

interface GameState {
  scale: ScaleDefinition;
  level: LevelConfig;
  questions: Question[];
  currentQuestionIndex: number;
  selectedNote: NoteName | null;
  selectedAccidental: Accidental;
  answerStatus: 'pending' | 'correct' | 'incorrect';
}
```

### 6.3 Update Game Store
- [x] Update `stores/gameStore.ts`:
  - `initGame(scaleId: string, levelId: number)` - Start new game
  - `selectNote(note: NoteName)` - Select a note
  - `selectAccidental(accidental: Accidental)` - Select accidental
  - `submitAnswer()` - Check answer for current hidden position
  - `nextQuestion()` - Move to next question
  - `previousQuestion()` - Go back (view only)
  - `resetSelection()` - Clear current selection

### 6.4 Answer Checking Logic
- [x] Create `utils/answerChecker.ts`
- [x] Compare selected note+accidental with hidden note
- [x] Handle multi-note levels (check one at a time or all at once?)
- [x] Decision: For multiple missing notes, check one at a time in order

### 6.5 Multi-Note Answer Flow
- [x] For levels with 2+ missing notes:
  - Show first missing slot highlighted
  - User answers first slot
  - If correct, move to next slot
  - If incorrect, show error and reset
  - All slots correct = question complete

### 6.6 Connect Logic to UI
- [x] Wire up store to PracticePage
- [x] Update ScaleDisplay to show current question
- [x] Update selectors to use store state
- [x] Submit button triggers answer check
- [x] Next/Back buttons control question navigation

### 6.7 Edge Cases
- [x] Handle first question (no back)
- [x] Handle last question (different next behavior?)
- [x] Handle page refresh (reload from URL params)

## Acceptance Criteria
- Questions generate correctly for each level
- Hidden positions respect level rules
- Answer checking works correctly
- Multi-note questions work sequentially
- State persists during navigation within level

## Estimated Complexity
High
