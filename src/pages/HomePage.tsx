
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { majorScales } from '../data/scales';
import ScaleCategory from '../components/game/ScaleCategory';
import SettingsModal from '../components/common/SettingsModal';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleScaleSelect = (scaleId: string) => {
        navigate(`/scale/${scaleId}`);
    };

    return (
        <div className="w-full max-w-6xl p-4 sm:p-6 md:p-8 lg:p-10">
            <header className="mb-8 sm:mb-10 md:mb-12 flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-[var(--color-text)]">
                    TONEDOKU
                </h1>
                <button
                    type="button"
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex items-center justify-center rounded-full bg-[var(--color-surface)] p-2 sm:p-3 text-[var(--color-text-muted)] transition-all duration-200 hover:bg-[var(--color-surface)]/80 hover:text-[var(--color-text)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] min-w-[44px] min-h-[44px] relative z-10"
                    aria-label="Settings"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                </button>
            </header>

            <main>
                <ScaleCategory
                    title="Major Scales"
                    scales={majorScales}
                    onScaleSelect={handleScaleSelect}
                />
            </main>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
};

export default HomePage;
