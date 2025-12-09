# Task 12: Note Notation Setting

## Objective
Add a setting that allows users to switch between two note notation systems across the entire app:
- **Standard/Anglo-Saxon**: C, D, E, F, G, A, B
- **Solfege/Latin**: Do, Re, Mi, Fa, Sol, La, Si

## Tasks

### 12.1 Update Settings Store
- [ ] Add `noteNotation` field to `stores/settingsStore.ts`
- [ ] Type: `'standard' | 'solfege'` (default: `'standard'`)
- [ ] Add `setNoteNotation(notation: NoteNotation): void` action
- [ ] Persist to localStorage via existing storage utilities

### 12.2 Update Storage Utilities
- [ ] Add `noteNotation` to `Settings` interface in `utils/storage.ts`
- [ ] Update `loadSettings()` to handle new field with default fallback
- [ ] Update `saveSettings()` to include new field

### 12.3 Create Note Display Utility
- [ ] Create `utils/noteDisplay.ts` or extend `utils/noteUtils.ts`
- [ ] Create mapping between standard and solfege:
```typescript
const solfegeMap: Record<string, string> = {
  'C': 'Do', 'D': 'Re', 'E': 'Mi', 'F': 'Fa',
  'G': 'Sol', 'A': 'La', 'B': 'Si'
};
```
- [ ] Handle accidentals (C# -> Do#, Bb -> Sib, etc.)
- [ ] Create `getDisplayNote(note: Note, notation: NoteNotation): string` function

### 12.4 Update Settings Modal UI
- [ ] Add notation toggle/selector to `components/common/SettingsModal.tsx`
- [ ] Display options: "C D E" vs "Do Re Mi" (or similar labels)
- [ ] Use toggle switch or segmented control for selection
- [ ] Style consistently with existing sound toggle

### 12.5 Update Components to Use Notation
- [ ] Update `components/game/ScaleDisplay.tsx` to use notation setting
- [ ] Update `components/game/NoteSelector.tsx` to use notation setting
- [ ] Update `components/game/AccidentalSelector.tsx` if needed
- [ ] Update `components/game/ScaleCard.tsx` for home screen display
- [ ] Update any other components displaying note names

### 12.6 Create Custom Hook (Optional)
- [ ] Create `hooks/useNoteDisplay.ts` for convenient access
```typescript
function useNoteDisplay() {
  const notation = useSettingsStore(state => state.noteNotation);
  return (note: Note) => getDisplayNote(note, notation);
}
```

## Data Structures

```typescript
// In types or settingsStore
type NoteNotation = 'standard' | 'solfege';

// Extended Settings interface
interface Settings {
  soundEnabled: boolean;
  volume: number;
  noteNotation: NoteNotation;
}

// Solfege mapping
const SOLFEGE_NAMES: Record<NoteName, string> = {
  'C': 'Do',
  'D': 'Re',
  'E': 'Mi',
  'F': 'Fa',
  'G': 'Sol',
  'A': 'La',
  'B': 'Si'
};
```

## UI Reference
```
┌─────────────────────────────────────────┐
│  Settings                         [X]   │
│                                         │
│  Sound                           [ON]   │
│  Enable or disable all sounds           │
│                                         │
│  Volume: 70%                            │
│  ═══════════●════════                   │
│                                         │
│  Note Notation                          │
│  ┌─────────────┬─────────────┐          │
│  │   C D E     │  Do Re Mi   │          │
│  │  (selected) │             │          │
│  └─────────────┴─────────────┘          │
│                                         │
│  [          Done          ]             │
└─────────────────────────────────────────┘
```

## Acceptance Criteria
- [ ] Setting persists across sessions via localStorage
- [ ] All note displays update immediately when setting changes
- [ ] Scale cards on home screen reflect chosen notation
- [ ] Note selector buttons show correct notation
- [ ] Scale display in practice screen shows correct notation
- [ ] Accidentals display correctly in both systems (C#/Do#, Bb/Sib)
- [ ] Default is standard notation (C, D, E...)

## Files to Update After Completion
- `tasks/progress.md` - Mark task as completed
- `tasks/README.md` - Add task to table if needed

## Estimated Complexity
Medium

## Dependencies
- Task 11 (Local Storage) - Must be complete (it is)
- Task 02 (Data Layer) - Note types must exist (they do)
