// client/src/WorldScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Character from './Character';
import { useNavigate } from 'react-router-dom';

const BACKGROUND_URL = './fondo.jpg';
const MAP_WIDTH = 1024;
const MAP_HEIGHT = 640;
const SCALE_FACTOR = 2;

const BASE_SPRITE_SIZE = 16;
const CHARACTER_SCALE_FACTOR = 5;
const SCALED_SPRITE_SIZE = BASE_SPRITE_SIZE * CHARACTER_SCALE_FACTOR;

const MOVEMENT_SPEED = 5;

const CUSTOM_MAX_X_POS = 1909;
const CUSTOM_MAX_Y_POS = 1200;

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

const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

const WorldScreen: React.FC = () => {
    const navigate = useNavigate();

    const [viewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const MAX_MAP_WIDTH = MAP_WIDTH * SCALE_FACTOR;
    const MAX_MAP_HEIGHT = MAP_HEIGHT * SCALE_FACTOR;

    const [characterState, setCharacterState] = useState<CharacterState>(() => {
        const initialX = 1024;
        const initialY = 545;

        return {
            mapX: initialX,
            mapY: initialY,
            direction: 1,
            frame: 0,
            isMoving: false,
        };
    });

    useEffect(() => {
        let animationInterval: number | null = null;

        if (characterState.isMoving) {
            animationInterval = setInterval(() => {
                setCharacterState(prev => ({
                    ...prev,
                    frame: (prev.frame + 1) % 4,
                }));
            }, 100);
        } else {
            setCharacterState(prev => ({ ...prev, frame: 0 }));
        }

        return () => {
            if (animationInterval) clearInterval(animationInterval);
        };
    }, [characterState.isMoving]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        const direction = DIRECTION_MAP[key];

        if (direction !== undefined) {
            event.preventDefault();

            setCharacterState(prev => {
                let newX = prev.mapX;
                let newY = prev.mapY;

                switch (key) {
                    case 'arrowup': case 'w': newY -= MOVEMENT_SPEED; break;
                    case 'arrowdown': case 's': newY += MOVEMENT_SPEED; break;
                    case 'arrowleft': case 'a': newX -= MOVEMENT_SPEED; break;
                    case 'arrowright': case 'd': newX += MOVEMENT_SPEED; break;
                }

                const HALF_SPRITE = SCALED_SPRITE_SIZE / 2;

                const MIN_X_LIMIT = HALF_SPRITE;
                const MAX_X_LIMIT = CUSTOM_MAX_X_POS - HALF_SPRITE;

                const MIN_Y_LIMIT = HALF_SPRITE;
                const MAX_Y_LIMIT = CUSTOM_MAX_Y_POS - HALF_SPRITE;

                newX = Math.max(MIN_X_LIMIT, Math.min(MAX_X_LIMIT, newX));
                newY = Math.max(MIN_Y_LIMIT, Math.min(MAX_Y_LIMIT, newY));

                return {
                    ...prev,
                    mapX: newX,
                    mapY: newY,
                    direction,
                    isMoving: true
                };
            });
        }
    }, []);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (DIRECTION_MAP[key] !== undefined) {
            setCharacterState(prev => ({ ...prev, isMoving: false }));
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

    const handleLogout = () => {
        navigate('/');
    };

    //Diseñito

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
                        backgroundImage: `url(${BACKGROUND_URL})`,
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

            <h1
                className="absolute top-3 left-3 kawaii-header text-xl"
                style={{ zIndex: 10 }}
            >
                Talkie Town!
            </h1>

            <button
                onClick={handleLogout}
                className="absolute top-3 right-3 kawaii-button py-1 px-2 flex items-center space-x-1"
                style={{
                    zIndex: 10,
                    backgroundColor: '#ff69b4',
                    color: 'white',
                    border: '3px solid #e04e9e',
                    fontSize: '0.75rem'
                }}
            >
                <LogOutIcon className="w-3 h-3" />
                <span className="font-bold">SALIR</span>
            </button>

            <div
                className="absolute top-1 left-1 p-2 text-xs font-bold rounded"
                style={{
                    zIndex: 10,
                    backgroundColor: '#add8e6',
                    color: '#333333',
                    border: '2px solid #6495ed',
                    boxShadow: '2px 2px 0px #6495ed'
                }}
            >
                Pos: ({Math.round(characterState.mapX)}, {Math.round(characterState.mapY)})
            </div>
        </div>
    );
};

export default WorldScreen;