import { create } from 'zustand';
import { loadSettings, saveSettings, type Settings } from '../utils/storage';

interface SettingsState extends Settings {
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  loadFromStorage: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Initial state (will be loaded from storage)
  soundEnabled: true,
  volume: 0.7,

  toggleSound: () => {
    set((state) => {
      const newSettings = {
        soundEnabled: !state.soundEnabled,
        volume: state.volume,
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
      };
      saveSettings(newSettings);
      return { volume: clampedVolume };
    });
  },

  loadFromStorage: () => {
    const settings = loadSettings();
    set(settings);
  },
}));
