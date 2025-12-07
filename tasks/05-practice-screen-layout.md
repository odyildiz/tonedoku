# Task 05: Practice Screen Layout

## Objective
Create the main practice screen layout with all UI components (without game logic).

## Tasks

### 5.1 Create Page Component
- [ ] Create `pages/PracticePage.tsx`
- [ ] Get scale ID and level ID from URL params
- [ ] Set up basic layout structure

### 5.2 Create Practice Header
- [ ] Home button (left)
- [ ] Scale name + Level (center) - e.g., "C Major - Level 1"
- [ ] Progress indicator (right) - e.g., "3/8"

### 5.3 Create Scale Display Component
- [ ] Create `components/game/ScaleDisplay.tsx`
- [ ] Display 8 note slots in a row
- [ ] Each slot shows note name or empty placeholder [?]
- [ ] Visual distinction for missing note slots
- [ ] Responsive sizing

### 5.4 Create Note Selector Component
- [ ] Create `components/game/NoteSelector.tsx`
- [ ] 7 note buttons: C, D, E, F, G, A, B
- [ ] Grid layout (7 columns or 4+3 rows)
- [ ] Selected state styling
- [ ] Click handler (store selection)

### 5.5 Create Accidental Selector Component
- [ ] Create `components/game/AccidentalSelector.tsx`
- [ ] 3 buttons: ♮ (Natural), ♯ (Sharp), ♭ (Flat)
- [ ] Default to Natural
- [ ] Selected state styling
- [ ] Click handler (store selection)

### 5.6 Create Submit Button
- [ ] Create `components/common/Button.tsx` (reusable)
- [ ] Primary styled "SUBMIT" button
- [ ] Disabled state when no note selected
- [ ] Click handler placeholder

### 5.7 Create Navigation Footer
- [ ] Back button (left) - previous question
- [ ] Next button (right) - next question (disabled until correct)
- [ ] Proper disabled states

### 5.8 Assemble Layout
- [ ] Stack components vertically
- [ ] Proper spacing between sections
- [ ] Center content with max-width

## UI Reference
```
┌─────────────────────────────┐
│  [🏠]  C Major - Lvl 1  3/8  │
│  ─────────────────────────── │
│                              │
│   C   D   E  [?]  G   A   B   C  │
│                              │
│  ─────────────────────────── │
│                              │
│  ┌───┬───┬───┬───┬───┬───┬───┐ │
│  │ C │ D │ E │ F │ G │ A │ B │ │
│  └───┴───┴───┴───┴───┴───┴───┘ │
│                              │
│     ┌─────┬─────┬─────┐      │
│     │  ♮  │  ♯  │  ♭  │      │
│     └─────┴─────┴─────┘      │
│                              │
│         [ SUBMIT ]           │
│                              │
│  [◀ Back]        [Next ▶]    │
└─────────────────────────────┘
```

## Acceptance Criteria
- All UI components render correctly
- Note and accidental selection works (visual only)
- Navigation buttons present
- Responsive on all screen sizes
- No game logic yet - just layout

## Estimated Complexity
Medium
