# Tonedoku MVP Tasks

## Overview
This folder contains all tasks required to build the Tonedoku MVP - a music scale learning web app.

## Task List

| # | Task | Description | Complexity | Dependencies |
|---|------|-------------|------------|--------------|
| 01 | [Project Setup](./01-project-setup.md) | Initialize React + TypeScript project | Medium | None |
| 02 | [Data Layer](./02-data-layer.md) | Scale definitions and TypeScript types | Medium | 01 |
| 03 | [Home Screen](./03-home-screen.md) | Scale selection UI | Low-Medium | 01, 02 |
| 04 | [Level Selection](./04-level-selection.md) | Level selection for chosen scale | Low | 01, 02, 03 |
| 05 | [Practice Screen Layout](./05-practice-screen-layout.md) | Practice UI components | Medium | 01, 02 |
| 06 | [Game Logic](./06-game-logic.md) | Question generation and answer checking | High | 02, 05 |
| 07 | [Visual Feedback](./07-visual-feedback.md) | Correct/incorrect animations | Medium | 05, 06 |
| 08 | [Audio System](./08-audio-system.md) | Note and scale playback | High | 02, 06 |
| 09 | [Navigation Flow](./09-navigation-flow.md) | Complete navigation and game flow | Medium | 03, 04, 05, 06 |
| 10 | [Polish & Responsive](./10-polish-responsive.md) | Responsive design and polish | Medium | All above |
| 11 | [Local Storage](./11-local-storage.md) | Settings and progress persistence | Low | 01, 08 |

## Suggested Development Order

### Phase 1: Foundation
1. **Task 01** - Project Setup
2. **Task 02** - Data Layer

### Phase 2: Core UI
3. **Task 03** - Home Screen
4. **Task 04** - Level Selection
5. **Task 05** - Practice Screen Layout

### Phase 3: Game Mechanics
6. **Task 06** - Game Logic
7. **Task 07** - Visual Feedback

### Phase 4: Audio
8. **Task 08** - Audio System

### Phase 5: Integration & Polish
9. **Task 09** - Navigation Flow
10. **Task 10** - Polish & Responsive
11. **Task 11** - Local Storage & Settings

## Technology Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Audio**: Tone.js
- **Routing**: React Router v6

## MVP Scope Summary
- 12 Major scales (all keys)
- 5 levels per scale (1-4 missing notes)
- 8 questions per level
- Visual feedback (red/green)
- Audio playback (found note + full scale)
- Settings (sound on/off)
- Responsive web design

## Out of Scope (Future)
- Lives/attempts system
- Points/scoring
- Other scale types (Minor, Modal, etc.)
- User accounts
- Mobile apps
