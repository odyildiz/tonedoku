import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import { mixedLevels } from '../data/mixedLevels';

const MixedLevelSelection: React.FC = () => {
    const navigate = useNavigate();

    const handleLevelSelect = (levelId: number) => {
        navigate(`/mixed/${levelId}`);
    };

    const getLevelLabel = (level: number) => {
        switch (level) {
            case 1:
                return 'Easy';
            case 2:
                return 'Medium';
            case 3:
                return 'Hard';
            case 4:
                return 'Expert';
            case 5:
                return 'Master';
            default:
                return undefined;
        }
    };

    return (
        <div className="w-full max-w-md px-4 sm:px-6 pb-8 sm:pb-10">
            <Header title="Mixed Practice" />

            <main className="mt-3 sm:mt-4 flex flex-col gap-4 sm:gap-6">
                <div className="text-center">
                    <h2 className="text-lg sm:text-xl font-medium text-[var(--color-text-muted)]">
                        Practice scales at random!
                    </h2>
                    <p className="text-sm text-[var(--color-text-muted)] mt-2">
                        Each level includes multiple scales shuffled together
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                    {mixedLevels.map((levelConfig) => (
                        <button
                            key={levelConfig.level}
                            onClick={() => handleLevelSelect(levelConfig.level)}
                            className="group flex w-full flex-col rounded-xl border border-[var(--color-surface)] bg-[var(--color-surface)] p-5 text-left transition-all hover:bg-[var(--color-surface)]/80 hover:border-[var(--color-primary)] active:scale-[0.98] cursor-pointer"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                                    Level {levelConfig.level}
                                </span>
                                {getLevelLabel(levelConfig.level) && (
                                    <span className="rounded-full bg-[var(--color-secondary)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-secondary)]">
                                        {getLevelLabel(levelConfig.level)}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-lg font-semibold text-[var(--color-text)]">
                                    {levelConfig.scaleCount} scales, {levelConfig.missingNotes} missing note{levelConfig.missingNotes > 1 ? 's' : ''}
                                </span>
                                <span className="text-xs text-[var(--color-text-muted)]">
                                    {levelConfig.questionsCount} questions total
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MixedLevelSelection;
