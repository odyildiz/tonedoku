# Task 11: Local Storage & Settings

## Objective
Implement local storage for user preferences and basic progress tracking.

## Tasks

### 11.1 Settings Storage
- [ ] Create `stores/settingsStore.ts`
- [ ] Settings to store:
  - `soundEnabled: boolean` (default: true)
  - `volume: number` (default: 0.7, range 0-1)

### 11.2 Settings UI
- [ ] Create `components/common/SettingsModal.tsx`
- [ ] Sound on/off toggle
- [ ] Volume slider (optional for MVP)
- [ ] Trigger from settings button on home page

### 11.3 Progress Storage (Basic)
- [ ] Store last played level per scale (optional for MVP)
- [ ] Structure for future expansion:
```typescript
interface UserProgress {
  scales: {
    [scaleId: string]: {
      lastPlayedLevel: number;
      // Future: completedLevels, bestScores, etc.
    }
  }
}
```

### 11.4 LocalStorage Utilities
- [ ] Create `utils/storage.ts`
- [ ] `saveSettings(settings: Settings): void`
- [ ] `loadSettings(): Settings`
- [ ] `saveProgress(progress: UserProgress): void`
- [ ] `loadProgress(): UserProgress`
- [ ] Handle localStorage errors gracefully

### 11.5 Persistence Integration
- [ ] Load settings on app start
- [ ] Save settings on change
- [ ] Apply sound setting to audio system

### 11.6 Storage Keys
- [ ] `tonedoku_settings` - User preferences
- [ ] `tonedoku_progress` - Game progress (future)

## Data Structures
```typescript
interface Settings {
  soundEnabled: boolean;
  volume: number;
}

interface UserProgress {
  scales: {
    [scaleId: string]: {
      lastPlayedLevel: number;
    }
  }
}
```

## Acceptance Criteria
- Sound setting persists across sessions
- Settings modal opens and saves correctly
- App handles missing/corrupt localStorage gracefully
- Structure ready for future progress tracking

## Estimated Complexity
Low
