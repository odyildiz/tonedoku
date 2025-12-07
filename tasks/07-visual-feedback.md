# Task 07: Visual Feedback System

## Objective
Implement visual feedback for correct and incorrect answers.

## Tasks

### 7.1 Correct Answer Feedback
- [x] Turn game field/scale display green
- [x] Highlight the correctly answered note
- [x] Success animation (scale up + fade or glow)
- [x] Enable "Next" button
- [x] Duration: ~500ms before allowing next

### 7.2 Incorrect Answer Feedback
- [x] Turn game field/scale display red
- [x] Shake animation on the scale display
- [x] Shake animation on submit button
- [x] Reset selection after animation
- [x] Allow user to try again immediately

### 7.3 Create Animation Utilities
- [x] Create CSS animations or use Tailwind animate classes:
  - `shake` - horizontal shake for errors
  - `pulse-success` - green pulse for correct
  - `bounce-in` - for celebrations

### 7.4 Visual States for Scale Display
- [x] Default state: neutral colors
- [x] Pending answer: normal display
- [x] Correct: green background/border
- [x] Incorrect: red background/border + shake

### 7.5 Visual States for Note Slots
- [x] Filled slot: show note with normal styling
- [x] Empty slot (to answer): highlighted border, [?] placeholder
- [x] Currently answering: emphasized highlight
- [x] Answered correctly: green checkmark or fill

### 7.6 Button States
- [x] Submit: disabled when no selection, enabled otherwise
- [x] Next: disabled until question complete, enabled after
- [x] Back: disabled on first question
- [x] Visual distinction for disabled state

### 7.7 Timing & Transitions
- [x] Incorrect shake: 400ms
- [x] Correct celebration: 500ms
- [x] Screen transitions: 300ms
- [x] Use CSS transitions for smooth effects


## Animation Specifications (from PRD)
| Animation | Duration | Easing |
|-----------|----------|--------|
| Screen transition | 300ms | ease-in-out |
| Correct answer | 500ms | bounce |
| Incorrect shake | 400ms | elastic |
| Note highlight | 200ms | ease-out |
| Button press | 100ms | ease-in |

## Acceptance Criteria
- Incorrect answers show red + shake
- Correct answers show green + celebration
- Animations are smooth (60fps)
- User can retry after incorrect answer
- Next button enables after correct answer

## Estimated Complexity
Medium
