# Task 02: Data Layer & Scale Configuration

## Objective
Create the data structures and configuration for all Major scales with extensibility for future scale types.

## Tasks

### 2.1 Define TypeScript Types
- [ ] Create `types/scales.ts`:
```typescript
type NoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
type Accidental = 'natural' | 'sharp' | 'flat';

interface Note {
  name: NoteName;
  accidental: Accidental;
  display: string;  // e.g., "F#", "Bb", "C"
}

type ScaleCategory = 'major' | 'minor' | 'modal' | 'pentatonic' | 'other';

interface ScaleDefinition {
  id: string;
  name: string;
  category: ScaleCategory;
  notes: Note[];  // 8 notes including octave
}

interface LevelConfig {
  level: number;
  missingNotes: number;
  questionsCount: number;
  allowedPositions?: number[];  // Which positions can be missing
}
```

### 2.2 Create Scale Data
- [ ] Create `data/scales.ts` with all 12 Major scales:
  - C Major: C - D - E - F - G - A - B - C
  - G Major: G - A - B - C - D - E - F# - G
  - D Major: D - E - F# - G - A - B - C# - D
  - A Major: A - B - C# - D - E - F# - G# - A
  - E Major: E - F# - G# - A - B - C# - D# - E
  - B Major: B - C# - D# - E - F# - G# - A# - B
  - F# Major: F# - G# - A# - B - C# - D# - E# - F#
  - F Major: F - G - A - Bb - C - D - E - F
  - Bb Major: Bb - C - D - Eb - F - G - A - Bb
  - Eb Major: Eb - F - G - Ab - Bb - C - D - Eb
  - Ab Major: Ab - Bb - C - Db - Eb - F - G - Ab
  - Db Major: Db - Eb - F - Gb - Ab - Bb - C - Db

### 2.3 Create Level Configuration
- [ ] Create `data/levels.ts`:
  - Level 1: 1 missing note (positions 1, 2, 5, 6 only - easier)
  - Level 2: 1 missing note (positions 1-6 - any except root/octave)
  - Level 3: 2 missing notes
  - Level 4: 3 missing notes
  - Level 5: 4 missing notes
  - 8 questions per level

### 2.4 Create Helper Functions
- [ ] Create `utils/noteUtils.ts`:
  - `formatNote(note: Note): string` - Display formatting
  - `compareNotes(a: Note, b: Note): boolean` - Check equality
  - `parseNoteInput(name: NoteName, accidental: Accidental): Note`

### 2.5 Create Game State Store
- [ ] Create `stores/gameStore.ts` with Zustand:
  - Current scale
  - Current level
  - Current question index
  - Questions for current level (generated)
  - Selected note/accidental
  - Answer status (correct/incorrect/pending)

## Acceptance Criteria
- All 12 Major scales defined with correct notes
- Level configurations match PRD specifications
- TypeScript types are strict and complete
- Helper functions have unit tests (optional for MVP)

## Estimated Complexity
Medium
