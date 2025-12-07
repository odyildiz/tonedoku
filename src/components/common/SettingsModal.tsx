import React from 'react';
import { useSettingsStore } from '../../stores/settingsStore';
import Button from './Button';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { soundEnabled, volume, toggleSound, setVolume } = useSettingsStore();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/95 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-[var(--color-surface)] rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-text)]">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full p-2 text-[var(--color-text-muted)] transition-all duration-200 hover:bg-[var(--color-background)] hover:text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] min-w-[44px] min-h-[44px]"
            aria-label="Close settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label
                htmlFor="sound-toggle"
                className="text-base sm:text-lg font-semibold text-[var(--color-text)] block mb-1"
              >
                Sound
              </label>
              <p className="text-sm text-[var(--color-text-muted)]">
                Enable or disable all sounds
              </p>
            </div>
            <button
              id="sound-toggle"
              onClick={toggleSound}
              className={`relative inline-flex h-8 w-14 sm:h-10 sm:w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)] ${
                soundEnabled
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-[var(--color-text-muted)]/30'
              }`}
              role="switch"
              aria-checked={soundEnabled}
              aria-label="Toggle sound"
            >
              <span
                className={`inline-block h-6 w-6 sm:h-8 sm:w-8 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                  soundEnabled ? 'translate-x-7 sm:translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Volume Slider */}
          <div className={`transition-opacity duration-200 ${soundEnabled ? 'opacity-100' : 'opacity-50'}`}>
            <label
              htmlFor="volume-slider"
              className="text-base sm:text-lg font-semibold text-[var(--color-text)] block mb-3"
            >
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              disabled={!soundEnabled}
              className="w-full h-2 bg-[var(--color-background)] rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
              style={{
                background: soundEnabled
                  ? `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${volume * 100}%, var(--color-background) ${volume * 100}%, var(--color-background) 100%)`
                  : undefined,
              }}
            />
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-8">
          <Button variant="primary" onClick={onClose} fullWidth>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
