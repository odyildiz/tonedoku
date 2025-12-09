import React, { useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import ScaleDisplay from '../components/game/ScaleDisplay';
import NoteSelector from '../components/game/NoteSelector';
import AccidentalSelector from '../components/game/AccidentalSelector';
import Button from '../components/common/Button';
import LevelComplete from '../components/game/LevelComplete';
import { useGameStore } from '../stores/gameStore';
import { useAudioSettings } from '../hooks/useAudioSettings';
import { playCorrectSequence, playIncorrectSound, playNote, initAudio, stopAllAudio } from '../utils/audio';
import { mixedLevels } from '../data/mixedLevels';
import type { NoteName } from '../types/scales';
import type { MixedQuestion } from '../types/game';

const MixedPracticePage: React.FC = () => {
    const { levelId } = useParams<{ levelId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        questions,
        currentQuestionIndex,
        selectedNote,
        selectedAccidental,
        answerStatus,
        lastCorrectNote,
        mixedMode,
        mixedLevel,
        currentScaleName,
        initMixedGame,
        selectNote,
        selectAccidental,
        submitAnswer,
        nextQuestion,
        previousQuestion,
        resetSelection,
        resetGame,
        clearLastCorrectNote
    } = useGameStore();

    const { isAudioEnabled, toggleAudio } = useAudioSettings();
    const [isApplauding, setIsApplauding] = React.useState(false);
    const [showCompletion, setShowCompletion] = React.useState(false);

    // Track previous location to detect browser back/forward navigation
    const prevLocationRef = useRef(location.pathname);
    // Track if game was initialized for this session (prevents auto-play on mount)
    const gameInitializedRef = useRef(false);

    // Derived state
    const currentQuestion = questions[currentQuestionIndex] as MixedQuestion;
    const levelConfig = mixedLevels.find(l => l.level === mixedLevel);

    // Handle browser back/forward navigation
    useEffect(() => {
        const currentPath = location.pathname;
        const previousPath = prevLocationRef.current;

        if (currentPath !== previousPath) {
            const mixedPracticePattern = /^\/mixed\/\d+$/;
            const isMixedPracticePage = mixedPracticePattern.test(currentPath);

            if (!isMixedPracticePage) {
                resetGame();
            } else {
                setShowCompletion(false);
                setIsApplauding(false);
            }

            prevLocationRef.current = currentPath;
        }
    }, [location.pathname, resetGame]);

    // Validate URL parameters
    useEffect(() => {
        if (!levelId) {
            navigate('/mixed', { replace: true });
            return;
        }

        const levelNum = parseInt(levelId, 10);
        const validLevel = mixedLevels.find(l => l.level === levelNum);
        if (!validLevel || levelNum < 1 || levelNum > 5) {
            navigate('/mixed', { replace: true });
            return;
        }
    }, [levelId, navigate]);

    // Initialize game
    useEffect(() => {
        if (levelId) {
            const levelNum = parseInt(levelId, 10);
            if (levelNum >= 1 && levelNum <= 5) {
                gameInitializedRef.current = false; // Reset before init
                initMixedGame(levelNum);
                setShowCompletion(false);
                // Mark as initialized after state update
                gameInitializedRef.current = true;
            }
        }
    }, [levelId, initMixedGame]);

    // Cleanup on unmount (when component is removed from DOM)
    useEffect(() => {
        return () => {
            // Stop any playing/scheduled audio when navigating away
            stopAllAudio();
            gameInitializedRef.current = false;
        };
    }, []);

    // Initialize Audio Context on first user interaction
    useEffect(() => {
        const handleInteraction = () => {
            initAudio().catch(console.error);
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    // Audio Feedback & Answer Handling
    useEffect(() => {
        // Don't play audio until game is initialized (prevents auto-play on mount)
        if (!gameInitializedRef.current) return;

        if (answerStatus === 'incorrect') {
            if (isAudioEnabled) playIncorrectSound();

            const timer = setTimeout(() => {
                resetSelection();
            }, 600);
            return () => clearTimeout(timer);
        } else if (answerStatus === 'correct' && currentQuestion && lastCorrectNote) {
            // Last correct answer - play full scale sequence
            if (isAudioEnabled) {
                setIsApplauding(true);
                playCorrectSequence(lastCorrectNote.name, lastCorrectNote.accidental, currentQuestion.scaleNotes);

                const duration = 5000;
                const timer = setTimeout(() => {
                    setIsApplauding(false);
                    clearLastCorrectNote();
                }, duration);
                return () => clearTimeout(timer);
            }
        } else if (lastCorrectNote && answerStatus === 'pending') {
            // Intermediate correct answer - play just the note
            if (isAudioEnabled) {
                playNote(lastCorrectNote.name, lastCorrectNote.accidental, 4, '4n');
                clearLastCorrectNote();
            }
        }
    }, [answerStatus, isAudioEnabled, currentQuestion, resetSelection, lastCorrectNote, clearLastCorrectNote]);

    // Derived state for display - slots calculation using useMemo
    const slots = useMemo(() => {
        if (!currentQuestion) return Array(8).fill({ note: null, isLocked: true, isActive: false });

        const { scaleNotes, hiddenPositions, userAnswers } = currentQuestion;

        const sortedHidden = [...hiddenPositions].sort((a, b) => a - b);
        const activePos = sortedHidden.find(pos => !userAnswers?.has(pos));

        return scaleNotes.map((note, index) => {
            const isHidden = hiddenPositions.includes(index);

            if (!isHidden) {
                return { note: note, isLocked: true, isActive: false };
            }

            if (userAnswers?.has(index)) {
                return { note: userAnswers.get(index) || null, isLocked: true, isActive: false, isUserAnswer: true };
            }

            const isActive = index === activePos;

            let displayNote = null;
            if (isActive && selectedNote) {
                displayNote = {
                    name: selectedNote,
                    accidental: selectedAccidental,
                    display: selectedAccidental === 'sharp' ? `${selectedNote}#` : selectedAccidental === 'flat' ? `${selectedNote}b` : selectedNote
                };
            }

            return { note: displayNote, isLocked: false, isActive };
        });
    }, [currentQuestion, selectedNote, selectedAccidental]);

    // Keyboard Support
    useEffect(() => {
        if (!mixedMode || !levelConfig || !currentQuestion) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const isComplete = currentQuestion.correct === true;
            const canSubmitNow = selectedNote !== null && answerStatus !== 'correct';

            if (isComplete || isApplauding) return;

            const noteKeys: { [key: string]: NoteName } = {
                'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'a': 'A', 'b': 'B'
            };
            const lowerKey = e.key.toLowerCase();
            if (noteKeys[lowerKey]) {
                e.preventDefault();
                selectNote(noteKeys[lowerKey]);
                return;
            }

            if (e.key === '1') {
                e.preventDefault();
                selectAccidental('natural');
                return;
            }
            if (e.key === '2') {
                e.preventDefault();
                selectAccidental('sharp');
                return;
            }
            if (e.key === '3') {
                e.preventDefault();
                selectAccidental('flat');
                return;
            }

            if (e.key === 'Enter' && canSubmitNow) {
                e.preventDefault();
                submitAnswer();
                return;
            }

            if (e.key === 'Escape') {
                e.preventDefault();
                navigate('/mixed');
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [mixedMode, levelConfig, currentQuestion, selectedNote, answerStatus, isApplauding, selectNote, selectAccidental, submitAnswer, navigate]);

    if (!mixedMode || !levelConfig || !currentQuestion) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-[var(--color-text)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin" />
                    <h2 className="text-lg sm:text-xl font-semibold">Loading Mixed Practice...</h2>
                    <Link
                        to="/mixed"
                        className="text-[var(--color-primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] rounded px-2 py-1"
                    >
                        Go Back
                    </Link>
                </div>
            </div>
        );
    }

    const canSubmit = selectedNote !== null && answerStatus !== 'correct';
    const isQuestionComplete = currentQuestion.correct === true;
    const isLevelComplete = currentQuestionIndex === questions.length - 1 && isQuestionComplete;

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            nextQuestion();
        } else {
            setShowCompletion(true);
        }
    };

    const handlePlayAgain = () => {
        if (levelId) {
            initMixedGame(parseInt(levelId, 10));
            setShowCompletion(false);
        }
    };

    const handleNextLevel = () => {
        if (levelId) {
            const nextLevelNum = parseInt(levelId, 10) + 1;
            if (nextLevelNum <= 5) {
                initMixedGame(nextLevelNum);
                setShowCompletion(false);
                navigate(`/mixed/${nextLevelNum}`, { replace: true });
            }
        }
    };

    const hasNextLevel = parseInt(levelId || '0', 10) < 5;

    return (
        <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
            <Header
                title={`Mixed Practice - Level ${levelConfig.level}`}
                showBack
                onCheckStatus={() => { }}
                rightElement={
                    <button
                        onClick={toggleAudio}
                        className="flex items-center justify-center rounded-full bg-[var(--color-surface)] p-2 sm:p-3 hover:bg-[var(--color-surface)]/80 transition-all duration-200 text-[var(--color-text-muted)] hover:text-[var(--color-text)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] min-w-[44px] min-h-[44px] touch-manipulation"
                        title={isAudioEnabled ? "Mute Audio" : "Enable Audio"}
                        aria-label={isAudioEnabled ? "Mute Audio" : "Enable Audio"}
                    >
                        {isAudioEnabled ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                        )}
                    </button>
                }
            />

            {/* Current Scale Name Display */}
            <div className="flex justify-center w-full mb-2">
                <div className="text-base sm:text-lg md:text-xl font-semibold text-[var(--color-primary)] bg-[var(--color-surface)] px-4 py-2 rounded-lg border-2 border-[var(--color-primary)]/20">
                    {currentScaleName}
                </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center w-full mb-2 sm:mb-4">
                <div className="text-sm sm:text-base md:text-lg text-[var(--color-text-muted)] font-mono font-bold bg-[var(--color-surface)] px-3 py-1 rounded-full">
                    {currentQuestionIndex + 1}/{questions.length}
                </div>
            </div>

            <main className="flex-1 flex flex-col items-center justify-between gap-2 sm:gap-4 md:gap-6 py-2 sm:py-4 md:py-6">

                {/* Scale Display */}
                <div className="w-full">
                    <ScaleDisplay
                        slots={slots}
                        answerStatus={answerStatus}
                        onSlotClick={() => { }}
                    />
                </div>

                {/* Feedback */}
                <div className="relative w-full h-6 sm:h-8 flex items-center justify-center">
                    {answerStatus === 'incorrect' && (
                        <div className="absolute text-[var(--color-danger)] font-bold text-base sm:text-lg animate-shake">
                            Incorrect, try again!
                        </div>
                    )}
                    {answerStatus === 'correct' && (
                        <div className="absolute text-[var(--color-success)] font-bold text-base sm:text-lg animate-bounce-in">
                            Correct!
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="w-full max-w-2xl flex flex-col gap-2 sm:gap-4">
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                        <label className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-semibold">Note</label>
                        <NoteSelector
                            selectedNote={selectedNote}
                            onNoteSelect={selectNote}
                            disabled={isQuestionComplete}
                        />
                    </div>

                    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                        <label className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider font-semibold">Accidental</label>
                        <AccidentalSelector
                            selectedAccidental={selectedAccidental}
                            onAccidentalSelect={selectAccidental}
                            disabled={isQuestionComplete}
                        />
                    </div>

                    <div className="flex justify-center mt-1 sm:mt-2">
                        {!isQuestionComplete ? (
                            <Button
                                variant="primary"
                                disabled={!canSubmit}
                                onClick={submitAnswer}
                                className={`w-full max-w-xs text-sm sm:text-base py-2.5 sm:py-3 transition-colors ${answerStatus === 'incorrect' ? 'animate-shake bg-[var(--color-danger)] border-[var(--color-danger)]' : ''}`}
                            >
                                SUBMIT
                            </Button>

                        ) : (
                            <Button
                                variant="success"
                                onClick={handleNext}
                                disabled={isApplauding}
                                className="w-full max-w-xs text-sm sm:text-base py-2.5 sm:py-3 animate-in fade-in zoom-in"
                            >
                                {isLevelComplete ? 'FINISH' : (isApplauding ? 'PLAYING...' : 'NEXT')}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="w-full flex justify-between items-center gap-2">
                    <Button
                        variant="secondary"
                        onClick={previousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                    >
                        <span>◀</span> <span className="hidden sm:inline">Back</span>
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={nextQuestion}
                        disabled={!isQuestionComplete}
                        className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                    >
                        <span className="hidden sm:inline">Next</span> <span>▶</span>
                    </Button>
                </div>

            </main>

            {/* Level Complete Overlay */}
            {showCompletion && (
                <LevelComplete
                    scaleName="Mixed Practice"
                    levelNumber={levelConfig.level}
                    onPlayAgain={handlePlayAgain}
                    onNextLevel={handleNextLevel}
                    hasNextLevel={hasNextLevel}
                    isMixedMode={true}
                />
            )}
        </div>
    );
};

export default MixedPracticePage;
