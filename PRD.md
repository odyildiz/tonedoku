# Product Requirements Document: Tonedoku

> **For AI Agents**: Check this file to understand product features, user stories, and what to build. For technical implementation details, see [docs/TECHNICAL.md](docs/TECHNICAL.md). For UI specifications, see [docs/DESIGN.md](docs/DESIGN.md).

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
- Settings button for preferences

**Scale Categories (MVP: Major only, extensible for future)**
- Major Scales (12 keys)
- *[Future: Minor Scales]*
- *[Future: Modal Scales]*
- *[Future: Other Scales]*

### 2.2 Scale Practice Screen

#### 2.2.1 Game Board
- Display all 8 notes of the selected scale (root to octave)
- Example: C Major displays `C - D - E - F - G - A - B - C`
- One or more note slots are empty (the missing notes to find)
- Clear visual indication of empty slots

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
- Error buzzer sound
- User can try again

**On Correct Answer:**
- Game field turns green
- Play the sound of the found note (sustained)
- Then play each note in the scale sequentially (ascending, all 8 notes)
- Celebration animation

### 2.3 Navigation
- **Back Button**: Return to previous question
- **Next Button**: Proceed to next question (after correct answer)
- **Home Button**: Return to main scale selection screen
- Progress indicator showing current position in level (e.g., "3/8")

### 2.4 Mixed Practice Mode
- Practice multiple scales together in one session
- Questions draw from selected scale pool
- Helps reinforce learning across different keys

### 2.5 Settings
- Audio on/off toggle
- Volume control
- Note notation preference (Standard: C-D-E / Solfege: Do-Re-Mi)

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

## 4. Available Scales

### 4.1 Major Scales (12 keys) - MVP
- C Major, G Major, D Major, A Major, E Major, B Major
- F# Major (Gb Major), F Major, Bb Major, Eb Major, Ab Major, Db Major

### 4.2 Future Scale Types (Extensible Structure)
The codebase is structured to easily add:
- Natural Minor Scales
- Harmonic Minor Scales
- Melodic Minor Scales
- Modal Scales (Dorian, Phrygian, Lydian, Mixolydian, Locrian)
- Pentatonic Scales
- Blues Scales
- Exotic Scales

---

## 5. Audio Feedback Flow

### 5.1 Correct Answer Sequence
1. **Success chime** (0.3s)
2. **Found note plays** (1.5s sustained)
3. **Brief pause** (0.3s)
4. **Scale plays ascending** - all 8 notes (0.4s per note = 3.2s total)

### 5.2 Incorrect Answer Sequence
1. **Error buzzer** (0.3s)
2. **Visual feedback** (red flash + shake)
3. **Reset to selection state** (user can try again)

---

## 6. User Stories

### As a music student:
- I want to select a scale to practice so I can focus on specific keys
- I want immediate feedback when I answer so I know if I'm correct
- I want to hear the notes played so I can associate sounds with note names
- I want difficulty levels so I can progress from easy to challenging

### As a self-taught musician:
- I want to practice all 12 major keys so I become fluent in all scales
- I want mixed practice so I can test my knowledge across scales
- I want to switch between notation systems (standard/solfege)

### As a music teacher:
- I want my students to have a tool that reinforces scale knowledge
- I want progressive difficulty so students can build confidence
- I want audio playback so students develop ear-note associations

---

## Appendix A: Scale Reference

### Major Scale Formula
W - W - H - W - W - W - H
(W = Whole step, H = Half step)

### Note Order (Chromatic)
C - C#/Db - D - D#/Eb - E - F - F#/Gb - G - G#/Ab - A - A#/Bb - B - C

### Enharmonic Equivalents
- C# = Db
- D# = Eb
- F# = Gb
- G# = Ab
- A# = Bb
