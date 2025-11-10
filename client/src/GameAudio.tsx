import React, { useEffect, useRef, useCallback } from 'react';

const AUDIO_PATHS = {
    BGM: './bg.mp3',
    CLICK_SFX: './click.mp3',
};

interface GameAudioProps {
    isMusicEnabled: boolean;

    musicVolume?: number;
    sfxVolume?: number;
}


const GameAudio: React.FC<GameAudioProps> = ({
    isMusicEnabled,
    musicVolume = 0.3,
    sfxVolume = 0.7,
}) => {
    const bgmRef = useRef<HTMLAudioElement>(null);
    const sfxRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const bgm = bgmRef.current;
        if (!bgm) return;

        bgm.volume = isMusicEnabled ? musicVolume : 0;
        bgm.loop = true;

        if (isMusicEnabled) {
            bgm.play().catch(error => {
                console.warn("La reproducción automática de BGM fue bloqueada. El usuario debe interactuar primero.", error);
            });
        } else {
            bgm.pause();
        }
    }, [isMusicEnabled, musicVolume]);

    useEffect(() => {
        if (bgmRef.current) {
            bgmRef.current.volume = isMusicEnabled ? musicVolume : 0;
        }
    }, [musicVolume, isMusicEnabled]);

    const playClickSFX = useCallback(() => {
        const sfx = sfxRef.current;
        if (sfx && isMusicEnabled) {
            sfx.volume = sfxVolume;
            sfx.currentTime = 0;
            sfx.play().catch(error => {
                console.error("Fallo al reproducir el SFX de click:", error);
            });
        }
    }, [isMusicEnabled, sfxVolume]);

    useEffect(() => {
        const handleClickGlobal = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'BUTTON' || target.closest('button')) {
                playClickSFX();
            } else if (target.tagName === 'A' || target.closest('a')) {
                playClickSFX();
            }
        };

        document.addEventListener('click', handleClickGlobal);

        return () => {
            document.removeEventListener('click', handleClickGlobal);
        };
    }, [playClickSFX]);

    return (
        <div style={{ display: 'none' }}>
            <audio
                ref={bgmRef}
                src={AUDIO_PATHS.BGM}
                preload="auto"
                loop
            />

            <audio
                ref={sfxRef}
                src={AUDIO_PATHS.CLICK_SFX}
                preload="auto"
            />
        </div>
    );
};

export default GameAudio;