# Architecture Documentation

> **For AI Agents**: Check this file when working on system structure, data flow, component organization, or state management changes. Update this file when architectural changes are made.

## System Overview

Tonedoku is a single-page application (SPA) built with React 19 and deployed to GitHub Pages. The application follows a unidirectional data flow pattern with Zustand for state management.

## Directory Structure

```
src/
├── App.tsx              # Router setup with BrowserRouter (base: /tonedoku/)
├── main.tsx             # React entry point with StrictMode
├── index.css            # Global styles and CSS custom properties
│
├── pages/               # Route components (5 routes)
│   ├── HomePage.tsx           # Main scale selection screen
│   ├── LevelSelection.tsx     # Choose difficulty level for a scale
│   ├── PracticePage.tsx       # Single scale practice gameplay
│   ├── MixedLevelSelection.tsx # Mixed practice level selection
│   └── MixedPracticePage.tsx  # Multi-scale practice gameplay
│
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Header.tsx         # App header with navigation
│   │   ├── Button.tsx         # Styled button component
│   │   └── SettingsModal.tsx  # Settings overlay
│   └── game/            # Game-specific components
│       ├── ScaleDisplay.tsx      # Display 8-note scale with hidden slots
│       ├── NoteSelector.tsx      # C-D-E-F-G-A-B note buttons
│       ├── AccidentalSelector.tsx # Natural/Sharp/Flat buttons
│       ├── ScaleCategory.tsx     # Scale grouping UI
│       ├── ScaleCard.tsx         # Individual scale selection card
│       ├── LevelCard.tsx         # Level difficulty card
│       └── LevelComplete.tsx     # Completion feedback screen
│
├── stores/              # Zustand state management
│   ├── gameStore.ts           # Game state (questions, selections, status)
│   └── settingsStore.ts       # User settings with localStorage persistence
│
├── utils/               # Pure utility functions
│   ├── audio.ts               # Tone.js synthesis & playback
│   ├── storage.ts             # localStorage helpers (safeParseJSON, safeSetItem)
│   ├── questionGenerator.ts   # Generate questions for single scale
│   ├── mixedQuestionGenerator.ts # Generate questions for mixed practice
│   ├── answerChecker.ts       # Validate user answers
│   ├── gameLogic.ts           # Game flow control logic
│   ├── noteUtils.ts           # Note name conversions
│   └── noteDisplay.ts         # Display formatting utilities
│
├── hooks/               # Custom React hooks
│   ├── useAudioSettings.ts    # Audio settings subscription
│   └── useNoteDisplay.ts      # Note display formatting
│
├── types/               # TypeScript interfaces
│   ├── scales.ts              # ScaleDefinition, Note, Accidental, NoteName
│   └── game.ts                # GameState, Question, MixedQuestion
│
└── data/                # Configuration data
    ├── scales.ts              # 12 major scale definitions
    ├── levels.ts              # 5 difficulty level configurations
    └── mixedLevels.ts         # Mixed practice configurations
```

## Routing Architecture

```
/                           → HomePage (scale selection)
/scale/:scaleId             → LevelSelection (difficulty picker)
/scale/:scaleId/level/:level → PracticePage (gameplay)
/mixed                      → MixedLevelSelection
/mixed/level/:level         → MixedPracticePage
```

Router uses `BrowserRouter` with `basename="/tonedoku"` for GitHub Pages deployment.

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interaction                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Page Components                              │
│  (HomePage, LevelSelection, PracticePage, Mixed*)               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │ gameStore │  │ settings  │  │  Router   │
    │ (Zustand) │  │  Store    │  │  Params   │
    └─────┬─────┘  └─────┬─────┘  └───────────┘
          │              │
          │              └──────► localStorage
          ▼
    ┌───────────────────────────────────────┐
    │           Game Components              │
    │  (ScaleDisplay, NoteSelector, etc.)   │
    └─────────────────┬─────────────────────┘
                      │
                      ▼
    ┌───────────────────────────────────────┐
    │            Utils Layer                 │
    │  (questionGenerator, answerChecker,   │
    │   audio, noteUtils)                   │
    └─────────────────┬─────────────────────┘
                      │
                      ▼
    ┌───────────────────────────────────────┐
    │            Tone.js Audio              │
    └───────────────────────────────────────┘
```

## State Management

### gameStore (src/stores/gameStore.ts)

Manages all game-related state:

```typescript
interface GameState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedNote: NoteName | null;
  selectedAccidental: Accidental;
  userAnswers: Map<number, Note>;  // position → user's answer
  answerStatus: 'pending' | 'correct' | 'incorrect';
  isLevelComplete: boolean;
}
```

Key actions:
- `initGame(scale, level)` - Initialize questions for a scale/level
- `setSelectedNote(note)` - Update note selection
- `setSelectedAccidental(accidental)` - Update accidental selection
- `submitAnswer(position)` - Submit answer for a position
- `nextQuestion()` - Advance to next question
- `resetGame()` - Clear game state

### settingsStore (src/stores/settingsStore.ts)

Manages persisted user preferences:

```typescript
interface SettingsState {
  audioEnabled: boolean;
  volume: number;  // 0.0 to 1.0
  noteNotation: 'standard' | 'solfege';
}
```

All settings auto-persist to localStorage via subscription.

## Question Generation Flow

1. `initGame()` called with scale and level
2. `questionGenerator` creates questions based on level config:
   - Level determines `missingNotes` count and `allowedPositions`
   - Generates all valid combinations of hidden positions
   - Shuffles and limits to `questionsCount` (typically 8)
3. Each `Question` contains:
   - `scaleId`, `scaleName` - Identify the scale
   - `scaleNotes` - Full 8-note array
   - `hiddenPositions` - Array of indices to hide (0-7)
   - `targetNotes` - Map of position → correct Note

## Answer Validation Flow

1. User selects note (C-B) and accidental (natural/sharp/flat)
2. User submits answer for a specific position
3. `answerChecker` compares:
   - `userAnswer.name === targetNote.name`
   - `userAnswer.accidental === targetNote.accidental`
4. Both must match for correct answer
5. On correct: audio plays note + scale sequence
6. On incorrect: error sound + visual feedback

## Audio System Architecture

```
┌─────────────────────────────────────────┐
│              audio.ts                    │
├─────────────────────────────────────────┤
│  initAudio()     - Lazy init Tone.js    │
│  playNote()      - Single note playback │
│  playScale()     - Sequential scale     │
│  playErrorSound() - Error feedback      │
├─────────────────────────────────────────┤
│  Sampler (Piano) │ MembraneSynth (Error)│
└─────────────────────────────────────────┘
```

Audio context is lazy-initialized on first user interaction to comply with browser autoplay policies.

## Component Hierarchy

```
App
├── Header (common)
│   └── SettingsModal
├── Routes
│   ├── HomePage
│   │   ├── ScaleCategory
│   │   └── ScaleCard
│   ├── LevelSelection
│   │   └── LevelCard
│   ├── PracticePage
│   │   ├── ScaleDisplay
│   │   ├── NoteSelector
│   │   ├── AccidentalSelector
│   │   ├── Button (Submit)
│   │   └── LevelComplete
│   └── Mixed* (similar structure)
```

## Extension Points

### Adding New Scale Types
1. Add category to `ScaleCategory` enum in `types/scales.ts`
2. Add scale definitions to `data/scales.ts`
3. Level structure automatically applies

### Adding New Game Modes
1. Create new page component in `pages/`
2. Add route to `App.tsx`
3. Create question generator if needed in `utils/`
4. Reuse existing game components where possible

### Adding New Settings
1. Add to `SettingsState` interface in `settingsStore.ts`
2. Add UI control to `SettingsModal.tsx`
3. Settings auto-persist via existing subscription
