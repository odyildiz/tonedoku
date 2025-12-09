# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation Structure

This project uses modular documentation. **Check the relevant file before making changes and update it when code changes affect documented items.**

| Document | Purpose | When to Check/Update |
|----------|---------|---------------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System structure, data flow, component hierarchy | Changing component structure, state management, routing, or data flow |
| [docs/TECHNICAL.md](docs/TECHNICAL.md) | Tech stack, dependencies, build config, performance | Adding dependencies, changing build config, deployment issues |
| [docs/DESIGN.md](docs/DESIGN.md) | UI/UX specs, colors, layouts, animations, accessibility | Changing UI components, styling, animations, adding new screens |
| [docs/PATTERNS.md](docs/PATTERNS.md) | Code conventions, TypeScript patterns, file organization | Writing new code, adding components, creating utilities |
| [PRD.md](PRD.md) | Product requirements, features, user stories | Understanding what to build, feature specifications |

### Tasks (tasks/ directory)

| Document | Purpose | When to Check/Update |
|----------|---------|---------------------|
| [tasks/README.md](tasks/README.md) | Task list, dependencies, backlog, roadmap | Understanding task order, finding work to do |
| [tasks/progress.md](tasks/progress.md) | Progress tracking, known issues, tech debt | Before/after implementing, tracking completion |
| [tasks/XX-*.md](tasks/) | Individual task files with acceptance criteria | Implementing specific features |

## Quick Reference

### Build Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # TypeScript compile + Vite production build
npm run lint       # ESLint code quality check
npm run preview    # Preview production build locally
npm run deploy     # Build and deploy to GitHub Pages
```

### Tech Stack
- **React 19** + React Router DOM (5 routes)
- **Zustand** for state (gameStore, settingsStore)
- **Tone.js** for audio synthesis
- **Tailwind CSS** + CSS custom properties
- **Vite** → GitHub Pages at `/tonedoku/`

### Directory Structure

```
src/
├── pages/          # Route components
├── components/     # common/ and game/ subdirectories
├── stores/         # Zustand stores
├── utils/          # Pure utility functions
├── hooks/          # Custom React hooks
├── types/          # TypeScript interfaces
└── data/           # Scale and level configurations
```

## Agent Instructions

### Before Making Changes
1. Identify which documentation applies to your task
2. Read the relevant doc file(s) to understand current patterns
3. Follow established conventions from PATTERNS.md

### After Making Changes
1. **Update documentation** if your changes affect:
   - Component structure → ARCHITECTURE.md
   - Dependencies or build → TECHNICAL.md
   - UI/styling/animations → DESIGN.md
   - New patterns established → PATTERNS.md
   - Task completion → tasks/progress.md (mark checkboxes)
   - New feature ideas → tasks/README.md (add to backlog)

2. **Keep docs in sync** - documentation should always reflect the current codebase state

### Common Tasks Reference

| Task | Primary Doc | Also Check |
|------|-------------|------------|
| Add new component | PATTERNS.md | ARCHITECTURE.md, DESIGN.md |
| Add new route/page | ARCHITECTURE.md | DESIGN.md |
| Change state management | ARCHITECTURE.md | PATTERNS.md |
| Add dependency | TECHNICAL.md | - |
| Fix styling/UI | DESIGN.md | - |
| Add new scale type | PRD.md | ARCHITECTURE.md |
| Implement feature | tasks/XX-*.md | PRD.md, tasks/progress.md |
| Check what to build next | tasks/README.md | tasks/progress.md |
| Complete a task | tasks/progress.md | Mark subtasks, update status |
