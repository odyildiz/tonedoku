
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

            <main className="space-y-8 sm:space-y-10">
                <ScaleCategory
                    title="Major Scales"
                    scales={majorScales}
                    onScaleSelect={handleScaleSelect}
                />

                {/* Mixed Practice Section */}
                <div className="pt-6 sm:pt-8 border-t border-[var(--color-surface)]">
                    <button
                        onClick={() => navigate('/mixed')}
                        className="group w-full rounded-xl border-2 border-[var(--color-primary)]/30 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface)]/50 p-6 sm:p-8 text-left transition-all hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/10 active:scale-[0.99] cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-8 sm:h-8">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 3h5v5M21 3 11 13"></path>
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                                    Mixed Practice
                                </h3>
                                <p className="text-sm sm:text-base text-[var(--color-text-muted)]">
                                    Practice multiple scales at random
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="flex-shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-7 sm:h-7">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </main>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
};

export default HomePage;
