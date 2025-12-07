# Task 03: Home Screen (Scale Selection)

## Objective
Create the main screen where users can select which Major scale to practice.

## Tasks

### 3.1 Create Page Component
- [x] Create `pages/HomePage.tsx`
- [x] Add header with app title "TONEDOKU"
- [x] Add settings button (placeholder for now)

### 3.2 Create Scale Category Section
- [x] Create `components/game/ScaleCategory.tsx`
- [x] Display "MAJOR SCALES" as category header
- [x] Structure for future categories (extensible)

### 3.3 Create Scale Selection Grid
- [x] Create `components/game/ScaleCard.tsx`
- [x] Display scale root note (C, G, D, etc.)
- [x] Show accidental if applicable (F#, Bb, etc.)
- [x] Hover/active states
- [x] Click navigates to level selection

### 3.4 Layout Implementation
- [x] 4x3 grid layout for 12 scales
- [x] Responsive: 3 columns on desktop, 2 on tablet, 2 on mobile
- [x] Proper spacing and alignment

### 3.5 Styling
- [x] Apply color scheme from PRD
- [x] Card styling with shadows/borders
- [x] Typography hierarchy

## UI Reference
```
┌─────────────────────────────┐
│  [⚙]            TONEDOKU    │
│                              │
│  ─────────────────────────── │
│                              │
│  [ MAJOR SCALES ]            │
│                              │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │  C  │ │  G  │ │  D  │    │
│  └─────┘ └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │  A  │ │  E  │ │  B  │    │
│  └─────┘ └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │  F# │ │  F  │ │  Bb │    │
│  └─────┘ └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │  Eb │ │  Ab │ │  Db │    │
│  └─────┘ └─────┘ └─────┘    │
└─────────────────────────────┘
```

## Acceptance Criteria
- [x] All 12 Major scales displayed in grid
- [x] Clicking a scale navigates to `/scale/:scaleId`
- [x] Responsive layout works on all screen sizes
- [x] Visual design matches PRD color scheme

## Estimated Complexity
Low-Medium
