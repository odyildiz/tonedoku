# Task 13: Mixed Practice Screen

## Objective
Create a new practice mode where users can practice multiple scales randomly. Each time the screen is opened, questions will draw from different scales at random, helping users develop broader scale recognition skills.

## Tasks

### 13.1 Create Mixed Practice Level Configuration
- [ ] Create `data/mixedLevels.ts` or extend `data/levels.ts`
- [ ] Define mixed practice levels:
```typescript
export const mixedLevels: MixedLevelConfig[] = [
  { level: 1, missingNotes: 1, questionsCount: 8, scaleCount: 4 },  // Easy: 4 random scales
  { level: 2, missingNotes: 1, questionsCount: 10, scaleCount: 6 }, // Medium: 6 random scales
  { level: 3, missingNotes: 2, questionsCount: 10, scaleCount: 8 }, // Hard: 8 random scales
  { level: 4, missingNotes: 2, questionsCount: 12, scaleCount: 10 },// Expert: 10 scales
  { level: 5, missingNotes: 3, questionsCount: 12, scaleCount: 12 },// Master: All 12 scales
];
```

### 13.2 Add TypeScript Types
- [ ] Add to `types/scales.ts` or `types/game.ts`:
```typescript
interface MixedLevelConfig {
  level: number;
  missingNotes: number;
  questionsCount: number;
  scaleCount: number; // How many different scales to include
  allowedPositions?: number[];
}

interface MixedQuestion extends Question {
  scaleName: string; // Display which scale this question is from
}
```

### 13.3 Create Mixed Question Generator
- [ ] Create `utils/mixedQuestionGenerator.ts` or extend `utils/questionGenerator.ts`
- [ ] `generateMixedQuestions(level: MixedLevelConfig): MixedQuestion[]`
- [ ] Randomly select `scaleCount` scales from all available
- [ ] Distribute questions across selected scales
- [ ] Shuffle final question order for variety

### 13.4 Create Mixed Level Selection Page
- [ ] Create `pages/MixedLevelSelection.tsx`
- [ ] Display 5 levels with difficulty indicators
- [ ] Show level info (missing notes, number of scales involved)
- [ ] Navigation: clicking level goes to mixed practice
- [ ] Route: `/mixed` or `/practice/mixed`

### 13.5 Create Mixed Practice Page
- [ ] Create `pages/MixedPracticePage.tsx` or extend `PracticePage.tsx`
- [ ] Similar layout to regular practice screen
- [ ] Display current scale name above the scale display
- [ ] Show which scale the current question is testing
- [ ] Progress indicator shows question count
- [ ] Randomize scale selection on each page load

### 13.6 Update Game Store for Mixed Mode
- [ ] Add mixed practice state to `stores/gameStore.ts`:
```typescript
interface GameState {
  // Existing fields...
  mixedMode: boolean;
  mixedLevel: number | null;
  currentScaleName: string | null; // For display during mixed mode
}
```
- [ ] Add actions: `startMixedGame`, `resetMixedGame`

### 13.7 Add Navigation Entry Point
- [ ] Add "Mixed Practice" button/card to `pages/HomePage.tsx`
- [ ] Position below or alongside the Major Scales section
- [ ] Distinct styling to differentiate from single-scale practice
- [ ] Route to mixed level selection

### 13.8 Update Routing
- [ ] Add routes in `App.tsx`:
  - `/mixed` - Mixed level selection
  - `/mixed/:level` - Mixed practice page

### 13.9 Create Mixed Level Complete Component
- [ ] Create or extend `components/game/LevelComplete.tsx`
- [ ] Show summary: scales practiced, accuracy
- [ ] Options: "Play Again" (re-randomize), "Back to Mixed Levels", "Home"

### 13.10 Visual Feedback for Scale Changes
- [ ] Optional: Subtle animation/transition when scale changes between questions
- [ ] Clear visual indicator of current scale being tested
- [ ] Consider color coding or icon per scale family

## UI Reference

### Home Screen Addition
```
┌─────────────────────────────────────┐
│  [⚙]                    TONEDOKU    │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [ MAJOR SCALES ]                   │
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │  C  │ │  G  │ │  D  │ │  A  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│           ... more scales ...       │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  ┌─────────────────────────────────┐│
│  │      🎲  MIXED PRACTICE         ││
│  │   Practice random scales        ││
│  └─────────────────────────────────┘│
│                                     │
└─────────────────────────────────────┘
```

### Mixed Level Selection
```
┌─────────────────────────────────────┐
│  [←]     MIXED PRACTICE             │
│                                     │
│  Practice scales at random!         │
│                                     │
│  ┌─────────────────────────────────┐│
│  │  Level 1 - Easy                 ││
│  │  4 scales, 1 missing note       ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │  Level 2 - Medium               ││
│  │  6 scales, 1 missing note       ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │  Level 3 - Hard                 ││
│  │  8 scales, 2 missing notes      ││
│  └─────────────────────────────────┘│
│           ... more levels ...       │
└─────────────────────────────────────┘
```

### Mixed Practice Screen
```
┌─────────────────────────────────────┐
│  [←]      Question 3/10     [🔊]    │
│                                     │
│        ── G Major ──                │
│                                     │
│  ┌───┬───┬───┬───┬───┬───┬───┬───┐ │
│  │ G │ A │ B │ ? │ D │ E │ ? │ G │ │
│  └───┴───┴───┴───┴───┴───┴───┴───┘ │
│                                     │
│     [ C ] [ D ] [ E ] [ F ]         │
│     [ G ] [ A ] [ B ]               │
│                                     │
│     [ ♮ ] [ ♯ ] [ ♭ ]               │
│                                     │
│          [ SUBMIT ]                 │
│                                     │
│       ●●●○○○○○○○ Progress           │
└─────────────────────────────────────┘
```

## Data Structures

```typescript
interface MixedLevelConfig {
  level: number;
  missingNotes: number;
  questionsCount: number;
  scaleCount: number;
  allowedPositions?: number[];
}

interface MixedQuestion extends Question {
  scaleName: string;
  scaleId: string;
}

// Extended game state
interface MixedGameState {
  mixedLevel: number;
  questions: MixedQuestion[];
  currentQuestionIndex: number;
  selectedScales: string[]; // IDs of randomly selected scales
}
```

## Acceptance Criteria
- [ ] Mixed Practice accessible from home screen
- [ ] 5 levels with increasing difficulty
- [ ] Scales are randomly selected each time level is started
- [ ] Current scale name is clearly displayed during practice
- [ ] Questions are shuffled across different scales
- [ ] Level completion shows summary and replay options
- [ ] State resets properly when re-entering mixed practice
- [ ] Existing single-scale practice remains unaffected

## Files to Update After Completion
- `tasks/progress.md` - Mark task as completed with subtasks
- `tasks/README.md` - Add task to table if needed

## Estimated Complexity
High

## Dependencies
- Task 02 (Data Layer) - Scale definitions
- Task 05 (Practice Screen Layout) - Reuse components
- Task 06 (Game Logic) - Question generation base
- Task 09 (Navigation) - Routing patterns
