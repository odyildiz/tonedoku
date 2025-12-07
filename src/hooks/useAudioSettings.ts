import { useState } from 'react';

export const useAudioSettings = () => {
    const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(() => {
        const saved = localStorage.getItem('tonedoku_audio_enabled');
        return saved === null ? true : saved === 'true';
    });

    const toggleAudio = () => {
        setIsAudioEnabled(prev => {
            const newState = !prev;
            localStorage.setItem('tonedoku_audio_enabled', String(newState));
            return newState;
        });
    };

    return { isAudioEnabled, toggleAudio };
};
