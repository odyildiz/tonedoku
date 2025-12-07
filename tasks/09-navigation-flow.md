# Task 09: Navigation & Game Flow

## Objective
Implement complete navigation flow between screens and within the practice session.

## Tasks

### 9.1 Route Configuration
- [ ] Verify routes are set up:
  - `/` → HomePage
  - `/scale/:scaleId` → LevelSelectPage
  - `/scale/:scaleId/level/:levelId` → PracticePage

### 9.2 Home Button Behavior
- [ ] From LevelSelectPage: Navigate to `/`
- [ ] From PracticePage: Show confirmation if mid-game?
- [ ] Or: Just navigate directly (simpler for MVP)

### 9.3 Back Button (Practice Screen)
- [ ] Go to previous question
- [ ] Disabled on question 1
- [ ] Show previous question in view mode (already answered)
- [ ] Don't allow re-answering previous questions

### 9.4 Next Button (Practice Screen)
- [ ] Disabled until current question is complete
- [ ] Go to next question
- [ ] On last question: Show completion or navigate somewhere

### 9.5 Level Completion Flow
- [ ] After question 8/8 is answered correctly:
  - Option A: Show completion message, then back to level select
  - Option B: Auto-navigate to level select
  - Option C: Show "Play Again" or "Next Level" options
- [ ] For MVP: Show simple completion, button to go back

### 9.6 Create Completion Modal/Screen
- [ ] Create `components/game/LevelComplete.tsx`
- [ ] Display "Level Complete!" message
- [ ] "Back to Levels" button
- [ ] "Play Again" button (restart same level)

### 9.7 URL State Handling
- [ ] Handle direct URL access (bookmark/refresh)
- [ ] Validate scaleId exists, redirect if not
- [ ] Validate levelId is 1-5, redirect if not
- [ ] Generate questions on page load if needed

### 9.8 Browser Back Button
- [ ] Handle browser back/forward navigation
- [ ] Ensure state is consistent with URL

## Navigation Map
```
┌──────────────┐
│   HomePage   │ ◄────────────────────────┐
│   (/)        │                          │
└──────┬───────┘                          │
       │ Click scale                      │
       ▼                                  │
┌──────────────┐                          │
│ LevelSelect  │ ◄─────────┐              │
│ (/scale/:id) │           │              │
└──────┬───────┘           │              │
       │ Click level       │ Home         │ Home
       ▼                   │              │
┌──────────────┐           │              │
│ PracticePage │───────────┴──────────────┘
│ (/scale/     │
│  :id/level/  │ ◄──┐
│  :lvl)       │    │ Back/Next (within level)
└──────────────┘────┘
```

## Acceptance Criteria
- All navigation paths work correctly
- Back/Next within practice work as expected
- Level completion shows appropriate feedback
- Direct URL access works
- Browser back/forward work correctly

## Estimated Complexity
Medium
