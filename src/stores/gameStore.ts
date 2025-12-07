import { create } from 'zustand';
import { majorScales } from '../data/scales';
import { levels } from '../data/levels';
import type { NoteName, Accidental } from '../types/scales';
import type { GameState } from '../types/game';
import { generateQuestions } from '../utils/questionGenerator';
import { checkAnswer } from '../utils/answerChecker';

interface GameActions {
    initGame: (scaleId: string, level: number) => void;
    selectNote: (note: NoteName) => void;
    selectAccidental: (accidental: Accidental) => void;
    submitAnswer: () => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    resetSelection: () => void;
    resetGame: () => void;
}

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>((set, get) => ({
    // Initial State
    scale: null,
    level: null,
    questions: [],
    currentQuestionIndex: 0,
    selectedNote: null,
    selectedAccidental: 'natural',
    answerStatus: 'pending',

    initGame: (scaleId: string, levelId: number) => {
        const scale = majorScales.find(s => s.id === scaleId);
        const level = levels.find(l => l.level === levelId);

        if (!scale || !level) {
            console.error('Invalid scale or level');
            return;
        }

        const questions = generateQuestions(scale, level);

        set({
            scale,
            level,
            questions,
            currentQuestionIndex: 0,
            selectedNote: null,
            selectedAccidental: 'natural',
            answerStatus: 'pending',
        });
    },

    selectNote: (note: NoteName) => {
        set((state) => ({
            selectedNote: note,
            answerStatus: state.answerStatus === 'incorrect' ? 'pending' : state.answerStatus
        }));
    },

    selectAccidental: (accidental: Accidental) => {
        set((state) => ({
            selectedAccidental: accidental,
            answerStatus: state.answerStatus === 'incorrect' ? 'pending' : state.answerStatus
        }));
    },

    submitAnswer: () => {
        const { questions, currentQuestionIndex, selectedNote, selectedAccidental, answerStatus } = get();

        if (!selectedNote || answerStatus === 'correct') return;

        const currentQuestion = questions[currentQuestionIndex];
        const { hiddenPositions, scaleNotes, userAnswers } = currentQuestion;

        const sortedHidden = [...hiddenPositions].sort((a, b) => a - b);

        // Find first position that doesn't have a correct answer in userAnswers
        const activePositionIndex = sortedHidden.find(pos => !userAnswers?.has(pos));

        if (activePositionIndex === undefined) {
            return;
        }

        const targetNote = scaleNotes[activePositionIndex];
        const isCorrect = checkAnswer(targetNote, selectedNote, selectedAccidental);

        if (isCorrect) {
            const newUserAnswers = new Map(userAnswers || []);
            newUserAnswers.set(activePositionIndex, {
                name: selectedNote,
                accidental: selectedAccidental,
                display: selectedAccidental === 'sharp' ? `${selectedNote}#` : selectedAccidental === 'flat' ? `${selectedNote}b` : selectedNote
            });

            const allAnswered = sortedHidden.every(pos => newUserAnswers.has(pos));

            const newQuestions = [...questions];
            newQuestions[currentQuestionIndex] = {
                ...currentQuestion,
                userAnswers: newUserAnswers,
                correct: allAnswered ? true : null,
                answered: allAnswered
            };

            set({
                questions: newQuestions,
                answerStatus: allAnswered ? 'correct' : 'pending',
                selectedNote: allAnswered ? selectedNote : null,
                selectedAccidental: allAnswered ? selectedAccidental : 'natural'
            });

        } else {
            set({ answerStatus: 'incorrect' });
        }
    },

    nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
            const nextIdx = currentQuestionIndex + 1;
            const nextQuestionComplete = questions[nextIdx]?.correct === true;
            set({
                currentQuestionIndex: nextIdx,
                selectedNote: null,
                selectedAccidental: 'natural',
                answerStatus: nextQuestionComplete ? 'correct' : 'pending'
            });
        }
    },

    previousQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex > 0) {
            const prevIdx = currentQuestionIndex - 1;
            const prevQuestionComplete = questions[prevIdx]?.correct === true;
            set({
                currentQuestionIndex: prevIdx,
                selectedNote: null,
                selectedAccidental: 'natural',
                answerStatus: prevQuestionComplete ? 'correct' : 'pending'
            });
        }
    },


    resetSelection: () => {
        set({
            selectedNote: null,
            selectedAccidental: 'natural',
            answerStatus: 'pending'
        });
    },

    resetGame: () => {
        set({
            scale: null,
            level: null,
            questions: [],
            currentQuestionIndex: 0,
            selectedNote: null,
            selectedAccidental: 'natural',
            answerStatus: 'pending',
        });
    }
}));
