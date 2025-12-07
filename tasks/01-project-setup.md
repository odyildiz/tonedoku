# Task 01: Project Setup

## Objective
Initialize the React + TypeScript project with all required dependencies and folder structure.

## Tasks

### 1.1 Initialize Project
- [x] Create Vite + React + TypeScript project
- [x] Configure TypeScript strict mode
- [x] Set up ESLint and Prettier

### 1.2 Install Dependencies
- [x] Install Tailwind CSS and configure
- [x] Install React Router for navigation
- [x] Install Zustand for state management
- [x] Install Tone.js for audio synthesis

### 1.3 Create Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/          # Buttons, cards, etc.
│   └── game/            # Game-specific components
├── pages/               # Page components
├── data/                # Scale definitions, constants
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores
├── types/               # TypeScript interfaces
├── utils/               # Helper functions
└── styles/              # Global styles
```

### 1.4 Configure Routing
- [x] Set up React Router with routes:
  - `/` - Home (scale selection)
  - `/scale/:scaleId` - Level selection
  - `/scale/:scaleId/level/:levelId` - Practice screen

### 1.5 Set Up Base Styles
- [x] Configure Tailwind with color scheme from PRD
- [x] Create CSS variables for theme colors
- [x] Set up base typography

## Acceptance Criteria
- Project runs with `npm run dev`
- All dependencies installed and working
- Routing navigates between empty page components
- Tailwind classes apply correctly

## Estimated Complexity
Medium
