# Design Documentation

> **For AI Agents**: Check this file when working on UI components, styling, animations, or user experience. Update this file when design patterns, colors, or layouts change.

## Color Scheme

### Primary Colors

| Element | Color | CSS Variable | Hex Code |
|---------|-------|--------------|----------|
| Primary | Deep Purple | `--color-primary` | #6B4EAA |
| Secondary | Teal | `--color-secondary` | #26A69A |
| Success | Green | `--color-success` | #4CAF50 |
| Error | Red | `--color-error` | #F44336 |
| Background | Off-White | `--color-background` | #FAFAFA |
| Text | Dark Gray | `--color-text` | #212121 |

### Usage Guidelines
- Use CSS custom properties: `var(--color-primary)`
- Defined in `src/index.css`
- Support for future theming/dark mode

## Typography

- Font family: System fonts (Tailwind defaults)
- Monospace for note names in scale display
- Responsive sizing via Tailwind classes

## Layout Specifications

### Main Screen (HomePage)
```
┌─────────────────────────────────┐
│  ⚙️              TONEDOKU        │
│                                  │
│  ───────────────────────────────│
│                                  │
│  ┌─────────────────────────────┐│
│  │ 🎵 MAJOR SCALES             ││
│  └─────────────────────────────┘│
│                                  │
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │  C  │ │  G  │ │  D  │       │
│  └─────┘ └─────┘ └─────┘       │
│  ┌─────┐ ┌─────┐ ┌─────┐       │
│  │  A  │ │  E  │ │  B  │       │
│  └─────┘ └─────┘ └─────┘       │
│  ... (12 scales in grid)        │
│                                  │
└─────────────────────────────────┘
```

### Level Selection
```
┌─────────────────────────────────┐
│  🏠         C Major              │
│  ───────────────────────────────│
│                                  │
│   Select Level                   │
│                                  │
│  ┌─────────────────────────────┐│
│  │ Level 1 - 1 missing note    ││
│  └─────────────────────────────┘│
│  ┌─────────────────────────────┐│
│  │ Level 2 - 1 missing note    ││
│  └─────────────────────────────┘│
│  ... (5 levels)                  │
│                                  │
└─────────────────────────────────┘
```

### Practice Screen
```
┌─────────────────────────────────┐
│  🏠    C Major - Level 1    3/8 │
│  ───────────────────────────────│
│                                  │
│   C   D   E  [?]  G   A   B   C │
│                                  │
│  ───────────────────────────────│
│                                  │
│  ┌───┬───┬───┬───┬───┬───┬───┐ │
│  │ C │ D │ E │ F │ G │ A │ B │ │
│  └───┴───┴───┴───┴───┴───┴───┘ │
│                                  │
│  ┌─────┬─────┬─────┐            │
│  │  ♮  │  ♯  │  ♭  │            │
│  └─────┴─────┴─────┘            │
│                                  │
│        [ SUBMIT ]                │
│                                  │
│  ◀ Back              Next ▶     │
└─────────────────────────────────┘
```

## Component Specifications

### ScaleDisplay
- 8 boxes in horizontal row (responsive wrap on mobile)
- Each box shows note name or `?` for hidden
- Hidden slots have distinct styling (dashed border, muted background)
- Correct answers fill in with success color

### NoteSelector
- 7 buttons: C, D, E, F, G, A, B
- Selected state: primary color highlight
- Touch-friendly: minimum 44x44px tap target

### AccidentalSelector
- 3 buttons: ♮ (Natural), ♯ (Sharp), ♭ (Flat)
- Default selection: Natural
- Selected state: primary color highlight

### Button Component
- Primary variant: filled with primary color
- Secondary variant: outlined
- Disabled state: reduced opacity
- Minimum size: 44x44px for accessibility

## Animation Specifications

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Screen transition | 300ms | ease-in-out | Route change |
| Correct answer | 500ms | bounce | Answer validation |
| Incorrect shake | 400ms | elastic | Wrong answer |
| Note highlight | 200ms | ease-out | Selection change |
| Button press | 100ms | ease-in | Click/tap |

### Feedback Animations

**Correct Answer:**
1. Background flash to success color
2. Bounce animation on filled slot
3. Optional: confetti or celebration

**Incorrect Answer:**
1. Background flash to error color
2. Shake animation on game area
3. Reset to selection state

## Responsive Design

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Mobile Considerations
- Touch targets: minimum 44x44px
- Scale display: stack or wrap on narrow screens
- Bottom navigation for easy thumb reach
- No hover-only interactions

## Accessibility Requirements

### Color
- Color blind friendly: use patterns in addition to colors
- Sufficient contrast ratios (WCAG AA)
- Don't rely solely on color for information

### Keyboard
- Full keyboard navigation support
- Visible focus indicators
- Logical tab order

### Screen Readers
- Semantic HTML elements
- ARIA labels for interactive elements
- Note names announced clearly

### Focus States
- Visible outline on all interactive elements
- Uses `focus-visible` for keyboard-only focus
- Consistent focus styling across components

## Icons and Symbols

### Musical Symbols
- ♮ (Natural): `U+266E`
- ♯ (Sharp): `U+266F`
- ♭ (Flat): `U+266D`

### Navigation Icons
- Home: 🏠 or SVG icon
- Settings: ⚙️ or SVG icon
- Back: ◀ or `←`
- Next: ▶ or `→`

## Note Display Modes

### Standard Notation
- C, D, E, F, G, A, B
- With accidentals: C♯, D♭, etc.

### Solfege Notation (Setting)
- Do, Re, Mi, Fa, Sol, La, Si
- Configurable in settings
