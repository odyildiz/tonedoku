import React from 'react';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface LevelCompleteProps {
    scaleName: string;
    levelNumber: number;
    onPlayAgain: () => void;
    onNextLevel?: () => void;
    hasNextLevel: boolean;
}

const LevelComplete: React.FC<LevelCompleteProps> = React.memo(({
    scaleName,
    levelNumber,
    onPlayAgain,
    onNextLevel,
    hasNextLevel
}) => {
    const navigate = useNavigate();

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-background)]/95 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center max-w-md w-full gap-6 sm:gap-8 text-center">

                {/* Success Icon/Animation */}
                <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[var(--color-success)] opacity-20 duration-1000"></div>
                    <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-success)] shadow-lg ring-4 ring-[var(--color-success)]/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:w-12 sm:h-12 animate-bounce-in">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--color-text)]">
                        Level Complete!
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--color-text-muted)]">
                        You've mastered {scaleName} - Level {levelNumber}
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full sm:w-2/3">
                    {hasNextLevel && onNextLevel && (
                        <Button
                            variant="primary"
                            onClick={onNextLevel}
                            className="w-full py-3 sm:py-4 text-base sm:text-lg shadow-lg shadow-[var(--color-primary)]/20"
                        >
                            Next Level
                        </Button>
                    )}

                    <Button
                        variant="secondary"
                        onClick={onPlayAgain}
                        className="w-full"
                    >
                        Play Again
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="w-full"
                    >
                        Back to Levels
                    </Button>
                </div>
            </div>
        </div>
    );
});

LevelComplete.displayName = 'LevelComplete';

export default LevelComplete;
