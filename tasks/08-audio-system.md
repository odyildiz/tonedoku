# Task 08: Audio System

## Objective
Implement audio playback for notes and feedback sounds.

## Tasks

### 8.1 Set Up Audio Engine
- [x] Create `utils/audio.ts` or `hooks/useAudio.ts`
- [x] Initialize Tone.js synthesizer
- [x] Create piano-like sound (or use sampler)
- [x] Handle audio context initialization (user interaction required)

### 8.2 Note Playback
- [x] Function: `playNote(note: Note, octave: number, duration: number)`
- [x] Map note names to frequencies/pitches
- [x] Handle sharps and flats correctly
- [x] Default octave: 4 (middle C area)

### 8.3 Scale Sequence Playback
- [x] Function: `playScale(notes: Note[], tempo: number)`
- [x] Play each note sequentially with timing
- [x] 0.4 seconds per note (from PRD)
- [x] Total duration: ~3.2 seconds for 8 notes

### 8.4 Correct Answer Audio Sequence
- [x] Create `playCorrectSequence(foundNote: Note, scaleNotes: Note[])`
- [x] 1. Optional success chime (0.3s)
- [x] 2. Play found note sustained (1.5s)
- [x] 3. Brief pause (0.3s)
- [x] 4. Play full scale ascending (0.4s per note)

### 8.5 Incorrect Answer Audio
- [x] Create `playIncorrectSound()`
- [x] Short error buzzer or low tone
- [x] Duration: ~0.3s
- [x] Optional: can be disabled in settings

### 8.6 Audio Settings
- [x] Create audio on/off toggle (store in localStorage)
- [x] Respect device volume
- [x] Handle audio context resume after tab switch

### 8.7 Integrate with Game Flow
- [x] Trigger correct audio after correct answer
- [x] Trigger incorrect audio after wrong answer
- [x] Wait for audio to complete before enabling Next
- [x] Handle rapid clicking (don't overlap sounds)

### 8.8 Note to Frequency Mapping
```typescript
// Reference frequencies (A4 = 440Hz)
const noteFrequencies = {
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  // ... etc
};
```

## Audio Flow (from PRD)
### Correct Answer:
1. Success chime (0.3s)
2. Found note plays (1.5s sustained)
3. Brief pause (0.3s)
4. Scale plays ascending (0.4s × 8 = 3.2s)

### Incorrect Answer:
1. Error buzzer (0.3s)
2. Visual feedback (red flash)
3. Reset to selection

## Acceptance Criteria
- Notes play with correct pitch
- Scale plays in correct sequence with timing
- Correct answer triggers full audio sequence
- Incorrect answer plays error sound
- Audio can be muted
- No audio overlap issues

## Estimated Complexity
High
