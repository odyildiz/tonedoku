import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import LevelCard from '../components/game/LevelCard';
import { levels } from '../data/levels';
import { majorScales } from '../data/scales';

const LevelSelection: React.FC = () => {
    const { scaleId } = useParams<{ scaleId: string }>();
    const navigate = useNavigate();

    // Validate scaleId exists
    const scale = majorScales.find(s => s.id === scaleId);

    useEffect(() => {
        if (scaleId && !scale) {
            navigate('/', { replace: true });
        }
    }, [scaleId, scale, navigate]);


    const handleLevelSelect = (levelId: number) => {
        if (scaleId) {
            navigate(`/scale/${scaleId}/level/${levelId}`);
        }
    };

    const getLevelLabel = (level: number) => {
        if (level === 1) return 'Easy';
        if (level === 5) return 'Challenge';
        return undefined;
    };

    if (!scale) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="w-full max-w-md px-4 sm:px-6 pb-8 sm:pb-10">
            <Header title={scale.name} />

            <main className="mt-3 sm:mt-4 flex flex-col gap-4 sm:gap-6">
                <div className="text-center">
                    <h2 className="text-lg sm:text-xl font-medium text-[var(--color-text-muted)]">Select Level</h2>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                    {levels.map((levelConfig) => (
                        <LevelCard
                            key={levelConfig.level}
                            level={levelConfig.level}
                            missingNotes={levelConfig.missingNotes}
                            label={getLevelLabel(levelConfig.level)}
                            onClick={() => handleLevelSelect(levelConfig.level)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LevelSelection;

