# Product Requirements Document: Tonedoku

## 1. Overview

### 1.1 Product Name
**Tonedoku** - Music Scale Learning Game

### 1.2 Product Summary
Tonedoku is an interactive music education web app that helps users learn and memorize musical scales through gamified practice. Users identify missing notes within scales, receiving immediate audio and visual feedback to reinforce learning.

### 1.3 Target Audience
- Music students (beginner to intermediate)
- Self-taught musicians
- Music teachers looking for educational tools
- Anyone interested in learning music theory

---

## 2. Features

### 2.1 Main Screen (Scale Selection)
- Display list of available music scales organized by category
- User can freely select any scale to practice
- Settings button

**Scale Categories (MVP: Major only, extensible for future)**
- Major Scales (12 keys)
- *[Future: Minor Scales]*
- *[Future: Modal Scales]*
- *[Future: Other Scales]*

### 2.2 Scale Practice Screen

#### 2.2.1 Game Board
- Display all 8 notes of the selected scale (root to octave)
- Example: C Major displays `C - D - E - F - G - A - B - C`
- One note slot is empty (the missing note to find)
- Clear visual indication of the empty slot

#### 2.2.2 Note Selection Interface
- **Note Selector**: C, D, E, F, G, A, B
- **Accidental Selector**:
  - Natural (♮)
  - Sharp/Diesis (♯)
  - Flat (♭)
- **Submit Button**: Confirm selection

#### 2.2.3 Feedback System

**On Incorrect Answer:**
- Game field turns red
- Visual shake/warning animation
- Optional: incorrect buzzer sound
- User can try again

**On Correct Answer:**
- Game field turns green
- Play the sound of the found note (sustained)
- Then play each note in the scale sequentially (ascending, all 8 notes)
- Celebration animation
- *[Future: Points/stars can be added here]*

### 2.3 Navigation
- **Back Button**: Return to previous question
- **Next Button**: Proceed to next question (after correct answer)
- **Home Button**: Return to main scale selection screen
- Progress indicator showing current position in level (e.g., "3/8")

---

## 3. Level Structure

### 3.1 Per-Scale Level System
Each scale has its own independent level progression. Users can practice any scale at any time.

### 3.2 Major Scales - Level Structure

Each Major scale (C, G, D, A, E, B, F#, F, Bb, Eb, Ab, Db) has 5 levels:

| Level | Missing Notes | Description |
|-------|---------------|-------------|
| 1 | 1 | Single missing note (easier positions: 2nd, 3rd, 6th, 7th) |
| 2 | 1 | Single missing note (any position except root/octave) |
| 3 | 2 | Two missing notes |
| 4 | 3 | Three missing notes |
| 5 | 4 | Four missing notes (challenge) |

**Questions Per Level:** 8 questions per level

### 3.3 Scale Display Format
All scales display 8 notes (root to octave):

| Scale | Notes |
|-------|-------|
| C Major | C - D - E - F - G - A - B - C |
| G Major | G - A - B - C - D - E - F# - G |
| D Major | D - E - F# - G - A - B - C# - D |
| A Major | A - B - C# - D - E - F# - G# - A |
| E Major | E - F# - G# - A - B - C# - D# - E |
| B Major | B - C# - D# - E - F# - G# - A# - B |
| F# Major | F# - G# - A# - B - C# - D# - E# - F# |
| F Major | F - G - A - Bb - C - D - E - F |
| Bb Major | Bb - C - D - Eb - F - G - A - Bb |
| Eb Major | Eb - F - G - Ab - Bb - C - D - Eb |
| Ab Major | Ab - Bb - C - Db - Eb - F - G - Ab |
| Db Major | Db - Eb - F - Gb - Ab - Bb - C - Db |

---

## 4. Available Scales (MVP)

### 4.1 Major Scales (12 keys)
- C Major
- G Major
- D Major
- A Major
- E Major
- B Major
- F# Major (Gb Major)
- F Major
- Bb Major
- Eb Major
- Ab Major
- Db Major

### 4.2 Future Scale Types (Extensible Structure)
The codebase will be structured to easily add:
- Natural Minor Scales
- Harmonic Minor Scales
- Melodic Minor Scales
- Modal Scales (Dorian, Phrygian, Lydian, Mixolydian, Locrian)
- Pentatonic Scales
- Blues Scales
- Exotic Scales

---

## 5. Technical Requirements

### 5.1 Platform Requirements

**Web Only (MVP)**
- Modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Responsive design for desktop and tablet
- Mobile-friendly touch interface

### 5.2 Technology Stack
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS or styled-components
- **Audio**: Tone.js or Howler.js
- **State Management**: React Context or Zustand
- **Build Tool**: Vite

### 5.3 Audio Requirements
- **Format**: MP3 for compatibility
- **Sample Rate**: 44.1kHz minimum
- **Note Samples**: Piano notes for at least 2 octaves (C3-C5)
- **Playback**:
  - Single note: 1-2 second sustained
  - Scale sequence: 0.4 second per note
- **Audio Library**: Tone.js (synthesis) or Howler.js (samples)

### 5.4 Data Storage

**Local Storage (MVP)**
- Current level per scale
- Settings and preferences

**Extensible for Future:**
- User accounts and cloud sync
- Progress tracking and statistics
- Scoring and achievements

### 5.5 Performance Requirements
- **Load Time**: < 3 seconds initial load
- **Audio Latency**: < 100ms from interaction to sound
- **Animation**: 60 FPS for all transitions

### 5.6 Accessibility
- Color blind friendly indicators (patterns in addition to colors)
- Keyboard navigation support
- Screen reader support for note names
- Focus indicators for interactive elements

---

## 6. User Interface Specifications

### 6.1 Color Scheme
| Element | Color | Hex Code |
|---------|-------|----------|
| Primary | Deep Purple | #6B4EAA |
| Secondary | Teal | #26A69A |
| Success | Green | #4CAF50 |
| Error | Red | #F44336 |
| Background | Off-White | #FAFAFA |
| Text | Dark Gray | #212121 |

### 6.2 Screen Layouts

#### Main Screen
```
┌─────────────────────────────┐
│  ⚙️              TONEDOKU    │
│                              │
│  ─────────────────────────── │
│                              │
│  ┌─────────────────────────┐ │
│  │ 🎵 MAJOR SCALES         │ │
│  └─────────────────────────┘ │
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
│                              │
└─────────────────────────────┘
```

#### Scale Level Selection
```
┌─────────────────────────────┐
│  🏠         C Major          │
│  ─────────────────────────── │
│                              │
│   Select Level               │
│                              │
│  ┌─────────────────────────┐ │
│  │ Level 1 - 1 missing     │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 2 - 1 missing     │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 3 - 2 missing     │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 4 - 3 missing     │ │
│  └─────────────────────────┘ │
│  ┌─────────────────────────┐ │
│  │ Level 5 - 4 missing     │ │
│  └─────────────────────────┘ │
│                              │
└─────────────────────────────┘
```

#### Practice Screen
```
┌─────────────────────────────┐
│  🏠    C Major - Level 1  3/8│
│  ─────────────────────────── │
│                              │
│   C   D   E  [?]  G   A   B   C  │
│                              │
│  ─────────────────────────── │
│                              │
│   ┌───┬───┬───┬───┬───┬───┬───┐ │
│   │ C │ D │ E │ F │ G │ A │ B │ │
│   └───┴───┴───┴───┴───┴───┴───┘ │
│                              │
│   ┌─────┬─────┬─────┐        │
│   │  ♮  │  ♯  │  ♭  │        │
│   └─────┴─────┴─────┘        │
│                              │
│        [ SUBMIT ]            │
│                              │
│  ◀ Back          Next ▶      │
└─────────────────────────────┘
```

### 6.3 Animation Specifications
| Animation | Duration | Easing |
|-----------|----------|--------|
| Screen transition | 300ms | ease-in-out |
| Correct answer | 500ms | bounce |
| Incorrect shake | 400ms | elastic |
| Note highlight | 200ms | ease-out |
| Button press | 100ms | ease-in |

---

## 7. Audio Feedback Flow

### 7.1 Correct Answer Sequence
1. **Success chime** (0.3s)
2. **Found note plays** (1.5s sustained)
3. **Brief pause** (0.3s)
4. **Scale plays ascending** - all 8 notes (0.4s per note = 3.2s total)

### 7.2 Incorrect Answer Sequence
1. **Error buzzer** (0.3s)
2. **Visual feedback** (red flash + shake)
3. **Reset to selection state** (user can try again)

---

## 8. Project Structure (Extensibility)

### 8.1 Scale Configuration
Scales should be defined in a configuration file for easy extension:

```typescript
// Example structure for future extensibility
interface ScaleDefinition {
  id: string;
  name: string;
  category: ScaleCategory;
  notes: string[];  // 8 notes including octave
  levels: LevelConfig[];
}

type ScaleCategory = 'major' | 'minor' | 'modal' | 'pentatonic' | 'other';

interface LevelConfig {
  level: number;
  missingNotes: number;
  questionsCount: number;
}
```

### 8.2 Gamification Hooks (Future)
Structure code to easily add:
- Points/scoring system
- Lives/attempts system
- Achievements
- Progress tracking
- Leaderboards

---

## 9. Future Enhancements

### Phase 2
- Additional scale types (Minor, Modal)
- Scoring system
- Lives/attempts
- Progress persistence

### Phase 3
- User accounts
- Achievements and badges
- Statistics and analytics
- Ear training mode

### Phase 4
- Mobile apps (React Native)
- Multiple instrument sounds
- Social features

---

## 10. Development Milestones

### Milestone 1: Core MVP
- Main screen with 12 Major scales
- Scale selection screen
- Level selection screen
- Practice screen with note selection
- Correct/incorrect feedback (visual)
- Navigation (Back, Next, Home)

### Milestone 2: Audio
- Note playback for correct answers
- Scale sequence playback
- Sound effects (success/error)

### Milestone 3: Polish
- Animations and transitions
- Responsive design
- Local storage for progress
- Accessibility features

---

## Appendix A: Scale Reference

### Major Scale Formula
W - W - H - W - W - W - H
(W = Whole step, H = Half step)

### Note Order
C - C#/Db - D - D#/Eb - E - F - F#/Gb - G - G#/Ab - A - A#/Bb - B - C

### Enharmonic Equivalents
- C# = Db
- D# = Eb
- F# = Gb
- G# = Ab
- A# = Bb
