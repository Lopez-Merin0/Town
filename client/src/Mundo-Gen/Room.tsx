import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Character from './Character';
import '../index.css';
import roomBackground from '../assets/mundo/cuarto.jpg';

const ROOM_WIDTH = 1024;
const ROOM_HEIGHT = 640;
const SCALE_FACTOR = 2;

const BASE_SPRITE_SIZE = 16;
const CHARACTER_SCALE_FACTOR = 5;
const SCALED_SPRITE_SIZE = BASE_SPRITE_SIZE * CHARACTER_SCALE_FACTOR;

const MOVEMENT_SPEED = 5;

const DIRECTION_MAP: { [key: string]: number } = {
    'arrowup': 0, 'w': 0,
    'arrowdown': 1, 's': 1,
    'arrowleft': 2, 'a': 2,
    'arrowright': 3, 'd': 3,
};

interface CharacterState {
    mapX: number;
    mapY: number;
    direction: number;
    frame: number;
    isMoving: boolean;
}

const Room: React.FC = () => {
    const navigate = useNavigate();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const [viewport, setViewport] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const MAX_MAP_WIDTH = ROOM_WIDTH * SCALE_FACTOR;
    const MAX_MAP_HEIGHT = ROOM_HEIGHT * SCALE_FACTOR;

    const [characterState, setCharacterState] = useState<CharacterState>(() => ({
        mapX: MAX_MAP_WIDTH / 2,
        mapY: MAX_MAP_HEIGHT / 2,
        direction: 1,
        frame: 0,
        isMoving: false,
    }));

    useEffect(() => {
        let interval: number | null = null;
        if (characterState.isMoving) {
            interval = window.setInterval(() => {
                setCharacterState((prev) => ({ ...prev, frame: (prev.frame + 1) % 4 }));
            }, 100);
        } else {
            setCharacterState((prev) => ({ ...prev, frame: 0 }));
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [characterState.isMoving]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        const direction = DIRECTION_MAP[key];
        if (direction === undefined) return;

        event.preventDefault();
        setCharacterState((prev) => {
            let newX = prev.mapX;
            let newY = prev.mapY;

            switch (key) {
                case 'arrowup': case 'w': newY -= MOVEMENT_SPEED; break;
                case 'arrowdown': case 's': newY += MOVEMENT_SPEED; break;
                case 'arrowleft': case 'a': newX -= MOVEMENT_SPEED; break;
                case 'arrowright': case 'd': newX += MOVEMENT_SPEED; break;
            }

            const HALF_SPRITE = SCALED_SPRITE_SIZE / 2;
            const MIN_X = HALF_SPRITE;
            const MAX_X = MAX_MAP_WIDTH - HALF_SPRITE;
            const MIN_Y = HALF_SPRITE;
            const MAX_Y = MAX_MAP_HEIGHT - HALF_SPRITE;

            const limitedX = Math.max(MIN_X, Math.min(MAX_X, newX));
            const limitedY = Math.max(MIN_Y, Math.min(MAX_Y, newY));

            return {
                ...prev,
                mapX: limitedX,
                mapY: limitedY,
                direction,
                isMoving: true,
            };
        });
    }, [MAX_MAP_WIDTH, MAX_MAP_HEIGHT]);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (DIRECTION_MAP[key] !== undefined) {
            setCharacterState((prev) => ({ ...prev, isMoving: false }));
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    const halfScreenW = viewport.width / 2;
    const halfScreenH = viewport.height / 2;

    const backgroundTranslateX = Math.max(
        Math.min(halfScreenW - characterState.mapX, 0),
        viewport.width - MAX_MAP_WIDTH
    );
    const backgroundTranslateY = Math.max(
        Math.min(halfScreenH - characterState.mapY, 0),
        viewport.height - MAX_MAP_HEIGHT
    );

    return (
        <div
            className="relative w-screen h-screen overflow-hidden"
            style={{ backgroundColor: '#4c965c' }}
        >
            <div
                style={{
                    position: 'absolute',
                    zIndex: 0,
                    border: '5px solid #ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 0 0 #ff69b4',
                    overflow: 'hidden',
                    transform: `translate(${backgroundTranslateX}px, ${backgroundTranslateY}px)`,
                    transition: 'transform 0.1s linear',
                    width: `${MAX_MAP_WIDTH}px`,
                    height: `${MAX_MAP_HEIGHT}px`,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${roomBackground})`,
                        backgroundSize: '100% 100%',
                        imageRendering: 'pixelated',
                    }}
                />
            </div>

            <Character
                x={characterState.mapX + backgroundTranslateX - SCALED_SPRITE_SIZE / 2}
                y={characterState.mapY + backgroundTranslateY - SCALED_SPRITE_SIZE / 2}
                style={{ zIndex: 1, position: 'absolute' }}
                direction={characterState.direction}
                frame={characterState.frame}
            />

            <h1 className="absolute top-3 left-3 kawaii-header text-xl" style={{ zIndex: 10 }}>
                Mi Cuarto
            </h1>

            <button
                onClick={() => setShowLogoutPopup(true)}
                className="absolute top-3 right-3 kawaii-button py-1 px-2 flex items-center space-x-1"
                style={{
                    zIndex: 10,
                    backgroundColor: '#ff69b4',
                    color: 'white',
                    border: '3px solid #e04e9e',
                    fontSize: '0.75rem',
                }}
            >
                <span className="font-bold">IR AL MUNDO</span>
            </button>

            {showLogoutPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="kawaii-popup p-6 rounded-lg shadow-lg text-center"
                        style={{
                            backgroundColor: '#fefefe',
                            border: '5px solid #6495ed',
                            boxShadow: '0 8px 0 0 #add8e6',
                            maxWidth: '400px',
                        }}>
                        <p className="text-xl font-bold mb-4" style={{ color: '#333333' }}>
                            ¿Quieres salir al mundo?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    setShowLogoutPopup(false);
                                    navigate('/world');
                                }}
                                className="kawaii-button py-2 px-4 font-bold"
                                style={{
                                    backgroundColor: '#ff69b4',
                                    color: 'white',
                                    border: '3px solid #e04e9e',
                                }}
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => setShowLogoutPopup(false)}
                                className="kawaii-button py-2 px-4 font-bold"
                                style={{
                                    backgroundColor: '#add8e6',
                                    color: '#333333',
                                    border: '3px solid #6495ed',
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div
                className="absolute top-1 left-1 p-2 text-xs font-bold rounded"
                style={{
                    zIndex: 10,
                    backgroundColor: '#add8e6',
                    color: '#333333',
                    border: '2px solid #6495ed',
                    boxShadow: '2px 2px 0px #6495ed',
                }}
            >
                Pos: ({Math.round(characterState.mapX)}, {Math.round(characterState.mapY)})
            </div>
        </div>
    );
};

export default Room;
