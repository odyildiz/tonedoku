# Code Patterns and Conventions

> **For AI Agents**: Check this file when writing new code to ensure consistency with existing patterns. Update this file when new patterns are established or conventions change.

## TypeScript Patterns

### Type Definitions

All types are defined in `src/types/` directory:

```typescript
// Note types (src/types/scales.ts)
type NoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
type Accidental = 'natural' | 'sharp' | 'flat';

interface Note {
  name: NoteName;
  accidental: Accidental;
}

// Scale types
type ScaleCategory = 'major' | 'minor' | 'modal' | 'pentatonic' | 'other';

interface ScaleDefinition {
  id: string;
  name: string;
  category: ScaleCategory;
  notes: Note[];  // 8 notes (root to octave)
}
```

### Game State Types (src/types/game.ts)

```typescript
interface Question {
  scaleId: string;
  scaleName: string;
  scaleNotes: Note[];
  hiddenPositions: number[];  // 0-indexed positions
  targetNotes: Map<number, Note>;
}

type AnswerStatus = 'pending' | 'correct' | 'incorrect';
```

## React Patterns

### Functional Components Only

All components are functional with hooks. No class components.

```typescript
// Good
export function NoteSelector({ onSelect }: NoteSelectorProps) {
  const [selected, setSelected] = useState<NoteName | null>(null);
  // ...
}

// Avoid
class NoteSelector extends React.Component { ... }
```

### Component Organization

```typescript
// 1. Imports
import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';

// 2. Types/Interfaces
interface Props {
  onSelect: (note: NoteName) => void;
}

// 3. Component
export function ComponentName({ onSelect }: Props) {
  // 3a. Hooks
  const store = useGameStore();
  const [local, setLocal] = useState();

  // 3b. Handlers
  const handleClick = () => { ... };

  // 3c. Render
  return ( ... );
}
```

### Custom Hooks Pattern

Place in `src/hooks/` directory:

```typescript
// src/hooks/useAudioSettings.ts
export function useAudioSettings() {
  const { audioEnabled, volume } = useSettingsStore();

  const playNote = useCallback((note: Note) => {
    if (audioEnabled) {
      audio.playNote(note, volume);
    }
  }, [audioEnabled, volume]);

  return { playNote, audioEnabled };
}
```

## Zustand Store Patterns

### Store Structure

```typescript
// src/stores/gameStore.ts
interface GameState {
  // State
  questions: Question[];
  currentQuestionIndex: number;

  // Actions
  initGame: (scale: ScaleDefinition, level: number) => void;
  submitAnswer: (position: number) => void;
  nextQuestion: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  questions: [],
  currentQuestionIndex: 0,

  // Actions
  initGame: (scale, level) => {
    const questions = generateQuestions(scale, level);
    set({ questions, currentQuestionIndex: 0 });
  },

  submitAnswer: (position) => {
    // Access current state with get()
    const { questions, currentQuestionIndex } = get();
    // ...
  },
}));
```

### Persisted Settings Pattern

```typescript
// src/stores/settingsStore.ts
export const useSettingsStore = create<SettingsState>((set) => ({
  audioEnabled: safeParseJSON(localStorage.getItem('audio'), true),
  volume: safeParseJSON(localStorage.getItem('volume'), 0.8),

  setAudioEnabled: (enabled) => {
    set({ audioEnabled: enabled });
    safeSetItem('audio', JSON.stringify(enabled));
  },
}));
```

## Utility Function Patterns

### Pure Functions in utils/

All utility functions should be pure (no side effects except audio):

```typescript
// src/utils/answerChecker.ts
export function checkAnswer(userAnswer: Note, targetNote: Note): boolean {
  return userAnswer.name === targetNote.name
      && userAnswer.accidental === targetNote.accidental;
}
```

### Safe Storage Access

```typescript
// src/utils/storage.ts
export function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (value === null) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('localStorage unavailable:', e);
  }
}
```

## Data Configuration Patterns

### Scale Definitions (src/data/scales.ts)

```typescript
export const MAJOR_SCALES: ScaleDefinition[] = [
  {
    id: 'c-major',
    name: 'C Major',
    category: 'major',
    notes: [
      { name: 'C', accidental: 'natural' },
      { name: 'D', accidental: 'natural' },
      // ... 8 notes total
    ],
  },
  // ...
];
```

### Level Configurations (src/data/levels.ts)

```typescript
export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    missingNotes: 1,
    questionsCount: 8,
    allowedPositions: [1, 2, 5, 6],  // Easier positions
  },
  {
    level: 2,
    missingNotes: 1,
    questionsCount: 8,
    allowedPositions: [1, 2, 3, 4, 5, 6],  // All except root/octave
  },
  // ...
];
```

## Styling Patterns

### Tailwind CSS Classes

Use Tailwind utility classes directly in JSX:

```tsx
<button
  className="px-4 py-2 bg-primary text-white rounded-lg
             hover:bg-primary-dark transition-colors
             min-h-[44px] min-w-[44px]"
  onClick={handleClick}
>
  Submit
</button>
```

### CSS Custom Properties

For theming, use CSS variables defined in `index.css`:

```css
/* src/index.css */
:root {
  --color-primary: #6B4EAA;
  --color-success: #4CAF50;
  --color-error: #F44336;
}
```

```tsx
// In component
<div style={{ backgroundColor: 'var(--color-success)' }}>
```

### Responsive Design

Mobile-first approach with Tailwind breakpoints:

```tsx
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
```

## Naming Conventions

### Files
- Components: PascalCase (`NoteSelector.tsx`)
- Utilities: camelCase (`questionGenerator.ts`)
- Types: camelCase (`scales.ts`)
- Stores: camelCase with `Store` suffix (`gameStore.ts`)

### Variables and Functions
- camelCase for variables and functions
- PascalCase for components and types
- UPPER_SNAKE_CASE for constants

### Component Props
- Props interface: `ComponentNameProps`
- Event handlers: `onAction` (e.g., `onSelect`, `onSubmit`)

## Error Handling Patterns

### Try-Catch for External Operations

```typescript
// Audio, localStorage, etc.
try {
  await Tone.start();
} catch (error) {
  console.error('Audio initialization failed:', error);
}
```

### Fallback Values

```typescript
const setting = safeParseJSON(stored, defaultValue);
```

## Import Organization

```typescript
// 1. React/external libraries
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Stores
import { useGameStore } from '../stores/gameStore';

// 3. Components
import { Button } from '../components/common/Button';

// 4. Utils
import { playNote } from '../utils/audio';

// 5. Types
import type { Note, NoteName } from '../types/scales';

// 6. Data
import { MAJOR_SCALES } from '../data/scales';
```
