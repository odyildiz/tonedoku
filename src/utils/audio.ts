import * as Tone from 'tone';
import type { NoteName, Accidental } from '../types/scales';
import { useSettingsStore } from '../stores/settingsStore';

let synth: Tone.Sampler | null = null;
let errorSynth: Tone.MembraneSynth | null = null;

// Helper to get current settings
const getSettings = () => {
    const { soundEnabled, volume } = useSettingsStore.getState();
    return { soundEnabled, volume };
};

// Initialize audio context and instruments
export const initAudio = async () => {
    await Tone.start();

    if (!synth) {
        synth = new Tone.Sampler({
            urls: {
                "C3": "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                "A3": "A3.mp3",
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
                "C5": "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                "A5": "A5.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();
    }

    if (!errorSynth) {
        errorSynth = new Tone.MembraneSynth().toDestination();
    }
};

const getNoteString = (note: NoteName, accidental: Accidental, octave: number = 4): string => {
    let acc = '';
    if (accidental === 'sharp') acc = '#';
    if (accidental === 'flat') acc = 'b';
    return `${note}${acc}${octave}`;
};

const noteOrder: NoteName[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const playNote = async (
    note: NoteName,
    accidental: Accidental = 'natural',
    octave: number = 4,
    duration: string | number = '8n',
    time?: number
) => {
    const { soundEnabled, volume } = getSettings();
    if (!soundEnabled) return;

    if (Tone.context.state !== 'running') {
        await initAudio();
    }

    const noteString = getNoteString(note, accidental, octave);
    synth?.triggerAttackRelease(noteString, duration, time, volume);
};

export const playIncorrectSound = async () => {
    const { soundEnabled, volume } = getSettings();
    if (!soundEnabled) return;

    if (Tone.context.state !== 'running') {
        await initAudio();
    }
    // Low pitched dissonance or thud
    errorSynth?.triggerAttackRelease("C1", "8n", undefined, volume);
};

export const playCorrectSequence = async (
    foundNote: NoteName,
    foundAccidental: Accidental,
    scaleNotes: { name: NoteName, accidental: Accidental }[]
) => {
    const { soundEnabled } = getSettings();
    if (!soundEnabled) return;

    if (Tone.context.state !== 'running') {
        await initAudio();
    }
    const now = Tone.now();

    // 1. Optional chime (skipped for now)

    // 2. Play found note sustained (1.5s)
    // For the found note, we default to octave 4 unless we have context.
    // For simply hearing the note, 4 is fine.
    playNote(foundNote, foundAccidental, 4, 1.5, now);

    // 3. Brief pause 0.3s -> starts at now + 1.5

    // 4. Play full scale ascending (0.4s per note)
    let startTime = now + 1.8; // 1.5 (note) + 0.3 (pause)
    const noteDuration = 0.4;

    let currentOctave = 4;
    let previousNoteIndex = -1;

    // Determine initial octave based on first note.
    // If it's a generic scale, we usually start at C4 or appropriate root.
    // We'll reset octave logic for the scale playback.

    scaleNotes.forEach((scaleNote, index) => {
        const noteIndex = noteOrder.indexOf(scaleNote.name);

        // If not the first note, and current index <= previous index, increment octave
        if (index > 0 && noteIndex <= previousNoteIndex) {
            currentOctave++;
        }

        playNote(scaleNote.name, scaleNote.accidental, currentOctave, noteDuration, startTime + (index * noteDuration));
        previousNoteIndex = noteIndex;
    });
};
