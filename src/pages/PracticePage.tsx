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
import { playCorrectSequence, playIncorrectSound, initAudio } from '../utils/audio';
import { majorScales } from '../data/scales';
import { levels } from '../data/levels';
import type { NoteName } from '../types/scales';



const PracticePage: React.FC = () => {
    const { scaleId, levelId } = useParams<{ scaleId: string; levelId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        scale,
        level,
        questions,
        currentQuestionIndex,
        selectedNote,
        selectedAccidental,
        answerStatus,
        initGame,
        selectNote,
        selectAccidental,
        submitAnswer,
        nextQuestion,
        previousQuestion,
        resetSelection,
        resetGame
    } = useGameStore();

    const { isAudioEnabled, toggleAudio } = useAudioSettings();
    const [isApplauding, setIsApplauding] = React.useState(false);
    const [showCompletion, setShowCompletion] = React.useState(false);

    // Track previous location to detect browser back/forward navigation
    const prevLocationRef = useRef(location.pathname);

    // Derived state
    const currentQuestion = questions[currentQuestionIndex];

    // Handle browser back/forward navigation
    useEffect(() => {
        const currentPath = location.pathname;
        const previousPath = prevLocationRef.current;

        // If location changed (browser back/forward), reinitialize or clean up
        if (currentPath !== previousPath) {
            // Check if we're still on a practice page
            const practicePagePattern = /^\/scale\/[^/]+\/level\/\d+$/;
            const isPracticePage = practicePagePattern.test(currentPath);

            if (!isPracticePage) {
                // User navigated away from practice page via browser back/forward
                // Reset game state to clean up
                resetGame();
            } else {
                // User navigated between different practice pages
                // The URL validation and game init effects will handle this
                setShowCompletion(false);
                setIsApplauding(false);
            }

            // Update the previous location reference
            prevLocationRef.current = currentPath;
        }
    }, [location.pathname, resetGame]);

    // Validate URL parameters
    useEffect(() => {
        if (!scaleId) {
            navigate('/', { replace: true });
            return;
        }

        const validScale = majorScales.find(s => s.id === scaleId);
        if (!validScale) {
            navigate('/', { replace: true });
            return;
        }

        if (!levelId) {
            navigate(`/scale/${scaleId}`, { replace: true });
            return;
        }

        const levelNum = parseInt(levelId, 10);
        const validLevel = levels.find(l => l.level === levelNum);
        if (!validLevel || levelNum < 1 || levelNum > 5) {
            navigate(`/scale/${scaleId}`, { replace: true });
            return;
        }
    }, [scaleId, levelId, navigate]);

    // Initialize game
    useEffect(() => {
        if (scaleId && levelId) {
            const levelNum = parseInt(levelId, 10);
            if (levelNum >= 1 && levelNum <= 5) {
                initGame(scaleId, levelNum);
                setShowCompletion(false);
            }
        }
    }, [scaleId, levelId, initGame]);

    // Cleanup on unmount (when component is removed from DOM)
    useEffect(() => {
        return () => {
            // This cleanup runs when the component unmounts
            // (e.g., when navigating away via browser back button to a non-practice page)
            // The resetGame in the location effect above handles most cases,
            // but this ensures cleanup on any unmount scenario
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
        if (answerStatus === 'incorrect') {
            if (isAudioEnabled) playIncorrectSound();

            const timer = setTimeout(() => {
                resetSelection();
            }, 600);
            return () => clearTimeout(timer);
        } else if (answerStatus === 'correct' && currentQuestion) {
            if (isAudioEnabled) {
                // Determine active position to know which note was found
                // Task 8.4: note(1.5) + pause(0.3) + scale(3.2) = 5.0s

                // Actually, logic in store sets answerStatus='correct' when ALL are answered.
                // But we might want to play the sequence for the LAST note found?
                // Or looking at the task: "Correct Answer Audio Sequence... Play found note... Play full scale" (Task 8.4)
                // If we complete the question, we probably found the last missing note.
                // Let's assume we play the sequence for the scale.

                // Which note was "found"? It uses 'selectedNote'.
                // If answerStatus acts on the last submission.

                // We'll just pass the selected note from store if it's there, or the last one from question.
                // But resetSelection might clear `selectedNote`? No, resetSelection is not called on correct.

                // Wait, if answerStatus is 'correct', it means the whole QUESTION is correct?
                // "108: answerStatus: allAnswered ? 'correct' : 'pending',"
                // Yes. So we play the full sequence.

                setIsApplauding(true);
                // 3.2s total duration for scale. + 1.5s note + 0.3s pause = ~5s.
                // Task 8.4: note(1.5) + pause(0.3) + scale(3.2) = 5.0s

                // We need the Note object.
                // userAnswers has it.
                // Let's get the note corresponding to user's last action?
                // It's tricky to get the exact note object without passing it.
                // But we can reconstruct or pick one.
                // Let's just pick the root or the first note if unsure, OR simpler:
                // We know `selectedNote` and `selectedAccidental` are still in store state when correct.

                if (selectedNote && selectedAccidental && scale) {
                    playCorrectSequence(selectedNote, selectedAccidental, scale.notes);
                }

                const duration = 5000; // 5s
                const timer = setTimeout(() => setIsApplauding(false), duration);
                return () => clearTimeout(timer);
            }
        }
    }, [answerStatus, isAudioEnabled, currentQuestion, scale, resetSelection, selectedNote, selectedAccidental]);


    // Derived state for display - slots calculation using useMemo
    const slots = useMemo(() => {
        if (!currentQuestion) return Array(8).fill({ note: null, isLocked: true, isActive: false });

        const { scaleNotes, hiddenPositions, userAnswers } = currentQuestion;

        // Determine active position (first hidden position not answered)
        const sortedHidden = [...hiddenPositions].sort((a, b) => a - b);
        const activePos = sortedHidden.find(pos => !userAnswers?.has(pos));

        return scaleNotes.map((note, index) => {
            const isHidden = hiddenPositions.includes(index);

            if (!isHidden) {
                return { note: note, isLocked: true, isActive: false };
            }

            // It is hidden
            if (userAnswers?.has(index)) {
                return { note: userAnswers.get(index) || null, isLocked: true, isActive: false, isUserAnswer: true };
            }

            // Not answered yet
            const isActive = index === activePos;

            // If active and we have a selection, show it preview?
            // "Show current selection"
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

    // Keyboard Support - must be before early return to maintain hook order
    useEffect(() => {
        if (!scale || !level || !currentQuestion) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const isComplete = currentQuestion.correct === true;
            const canSubmitNow = selectedNote !== null && answerStatus !== 'correct';

            // Don't interfere with keyboard if question is complete or applauding
            if (isComplete || isApplauding) return;

            // Note selection with C, D, E, F, G, A, B keys
            const noteKeys: { [key: string]: NoteName } = {
                'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'a': 'A', 'b': 'B'
            };
            const lowerKey = e.key.toLowerCase();
            if (noteKeys[lowerKey]) {
                e.preventDefault();
                selectNote(noteKeys[lowerKey]);
                return;
            }

            // Accidental selection
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

            // Submit with Enter
            if (e.key === 'Enter' && canSubmitNow) {
                e.preventDefault();
                submitAnswer();
                return;
            }

            // Go home with Escape
            if (e.key === 'Escape') {
                e.preventDefault();
                navigate('/');
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [scale, level, currentQuestion, selectedNote, answerStatus, isApplauding, selectNote, selectAccidental, submitAnswer, navigate]);

    if (!scale || !level || !currentQuestion) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-[var(--color-text)]">
                <div className="flex flex-col items-center gap-4">
                    {/* Loading Spinner */}
                    <div className="w-12 h-12 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin" />
                    <h2 className="text-lg sm:text-xl font-semibold">Loading Game...</h2>
                    <Link
                        to="/"
                        className="text-[var(--color-primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] rounded px-2 py-1"
                    >
                        Go Home
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
        if (scaleId && levelId) {
            initGame(scaleId, parseInt(levelId, 10));
            setShowCompletion(false);
        }
    };

    const handleNextLevel = () => {
        if (scaleId && levelId) {
            const nextLevelNum = parseInt(levelId, 10) + 1;
            if (nextLevelNum <= 5) {
                // Initialize the next level immediately
                initGame(scaleId, nextLevelNum);
                setShowCompletion(false);
                // Then update the URL
                navigate(`/scale/${scaleId}/level/${nextLevelNum}`, { replace: true });
            }
        }
    };


    const hasNextLevel = parseInt(levelId || '0', 10) < 5;

    return (
        <div className="flex flex-col min-h-screen w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
            <Header
                title={`${scale.name} - Level ${level.level}`}
                showBack
                onCheckStatus={() => { }} // Placeholder
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

            {/* Progress Indicator - Centered on all screen sizes */}
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
                        onSlotClick={() => {
                            // Optional: Allow clicking slots to focus them if we supported random access
                        }}

                    />
                </div>

                {/* Feedback - Fixed height container to prevent layout shift */}
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
                        disabled={!isQuestionComplete} // Only allow next if current is done (or allow skipping? usually no in games)
                        className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                    >
                        <span className="hidden sm:inline">Next</span> <span>▶</span>
                    </Button>
                </div>

            </main>

            {/* Level Complete Overlay */}
            {showCompletion && (
                <LevelComplete
                    scaleName={scale.name}
                    levelNumber={level.level}
                    onPlayAgain={handlePlayAgain}
                    onNextLevel={handleNextLevel}
                    hasNextLevel={hasNextLevel}
                />
            )}
        </div>
    );
};

export default PracticePage;

