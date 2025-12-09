const STORAGE_KEYS = {
  SETTINGS: 'tonedoku_settings',
  PROGRESS: 'tonedoku_progress',
} as const;

export type NoteNotation = 'standard' | 'solfege';

export interface Settings {
  soundEnabled: boolean;
  volume: number;
  noteNotation: NoteNotation;
}

export interface UserProgress {
  scales: {
    [scaleId: string]: {
      lastPlayedLevel: number;
    };
  };
}

const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  volume: 0.7,
  noteNotation: 'standard',
};

const DEFAULT_PROGRESS: UserProgress = {
  scales: {},
};

function safeParseJSON<T>(json: string | null, defaultValue: T): T {
  if (!json) return defaultValue;

  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Failed to parse stored data:', error);
    return defaultValue;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
}

export function saveSettings(settings: Settings): boolean {
  return safeSetItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function loadSettings(): Settings {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return safeParseJSON(stored, DEFAULT_SETTINGS);
}

export function saveProgress(progress: UserProgress): boolean {
  return safeSetItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
}

export function loadProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return safeParseJSON(stored, DEFAULT_PROGRESS);
}

export function clearAllStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}
