import { create } from 'zustand';
import { loadSettings, saveSettings, type Settings, type NoteNotation } from '../utils/storage';

interface SettingsState extends Settings {
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  setNoteNotation: (notation: NoteNotation) => void;
  loadFromStorage: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Initial state (will be loaded from storage)
  soundEnabled: true,
  volume: 0.7,
  noteNotation: 'standard',

  toggleSound: () => {
    set((state) => {
      const newSettings = {
        soundEnabled: !state.soundEnabled,
        volume: state.volume,
        noteNotation: state.noteNotation,
      };
      saveSettings(newSettings);
      return { soundEnabled: !state.soundEnabled };
    });
  },

  setVolume: (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    set(() => {
      const newSettings = {
        soundEnabled: get().soundEnabled,
        volume: clampedVolume,
        noteNotation: get().noteNotation,
      };
      saveSettings(newSettings);
      return { volume: clampedVolume };
    });
  },

  setNoteNotation: (notation: NoteNotation) => {
    set(() => {
      const newSettings = {
        soundEnabled: get().soundEnabled,
        volume: get().volume,
        noteNotation: notation,
      };
      saveSettings(newSettings);
      return { noteNotation: notation };
    });
  },

  loadFromStorage: () => {
    const settings = loadSettings();
    set(settings);
  },
}));
