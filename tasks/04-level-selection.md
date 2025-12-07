# Task 04: Level Selection Screen

## Objective
Create the level selection screen for a chosen scale, showing 5 difficulty levels.

## Tasks

### 4.1 Create Page Component
- [x] Create `pages/LevelSelectPage.tsx`
- [x] Get scale ID from URL params
- [x] Load scale data from configuration
- [x] Display scale name in header (e.g., "C Major")

### 4.2 Create Navigation Header
- [x] Create `components/common/Header.tsx` (reusable)
- [x] Home button (left) - navigates to `/`
- [x] Title (center) - scale name
- [x] Consistent styling across pages

### 4.3 Create Level List
- [x] Create `components/game/LevelCard.tsx`
- [x] Display level number
- [x] Display difficulty indicator (number of missing notes)
- [x] Click navigates to practice screen

### 4.4 Level Card Content
- [x] Level 1 - "1 missing note (Easy)"
- [x] Level 2 - "1 missing note"
- [x] Level 3 - "2 missing notes"
- [x] Level 4 - "3 missing notes"
- [x] Level 5 - "4 missing notes (Challenge)"

### 4.5 Styling
- [x] Vertical list layout
- [x] Card hover/active states
- [x] Visual hierarchy for difficulty

## UI Reference
```
┌─────────────────────────────┐
│  [🏠]       C Major          │
│  ─────────────────────────── │
│                              │
│   Select Level               │
│                              │
│  ┌─────────────────────────┐ │
│  │ Level 1                 │ │
│  │ 1 missing note (Easy)   │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 2                 │ │
│  │ 1 missing note          │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 3                 │ │
│  │ 2 missing notes         │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 4                 │ │
│  │ 3 missing notes         │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 5                 │ │
│  │ 4 missing notes         │ │
│  └─────────────────────────┘ │
└─────────────────────────────┘
```

## Acceptance Criteria
- Scale name displays correctly from URL param
- All 5 levels displayed with correct descriptions
- Home button navigates back to scale selection
- Clicking level navigates to `/scale/:scaleId/level/:levelId`

## Estimated Complexity
Low
