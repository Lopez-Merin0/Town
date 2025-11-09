import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Character from './Character'; 

import { usePopupTrigger } from './usePopupTrigger';
import FirstMinigame from './FirstMinigame'; 
import LoadingScreen from './LoadingScreen'; 
import './index.css'; 
import { COLLISION_AREAS, CollisionArea } from './CollisionAreas';

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

const checkCollision = (
    nextX: number,
    nextY: number,
    scaledSpriteSize: number,
    areas: CollisionArea[]
): boolean => {
    // El 'hitbox' del personaje es su posición central (nextX, nextY)
    const HALF_SPRITE = scaledSpriteSize / 2;

    const playerBox = {
        left: nextX - HALF_SPRITE,
        right: nextX + HALF_SPRITE,
        top: nextY - HALF_SPRITE,
        bottom: nextY + HALF_SPRITE,
    };

    for (const area of areas) {

        const allX = [area.p1.x, area.p2.x, area.p3.x, area.p4.x];
        const allY = [area.p1.y, area.p2.y, area.p3.y, area.p4.y];

        const x_min = Math.min(...allX);
        const x_max = Math.max(...allX);
        const y_min = Math.min(...allY);
        const y_max = Math.max(...allY);

        const areaBox = {
            left: x_min,
            right: x_max,
            top: y_min,
            bottom: y_max,
        };

        const isColliding = (
            playerBox.left < areaBox.right &&
            playerBox.right > areaBox.left &&
            playerBox.top < areaBox.bottom &&
            playerBox.bottom > areaBox.top
        );

        if (isColliding) {
            return true;
        }
    }
    return false;
};

const WorldScreen: React.FC = () => {
    const navigate = useNavigate();

    const [showIntro, setShowIntro] = useState(true);

    const [viewport, setViewport] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768,
    });

    useEffect(() => {
        const onResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const MAX_MAP_WIDTH = MAP_WIDTH * SCALE_FACTOR;
    const MAX_MAP_HEIGHT = MAP_HEIGHT * SCALE_FACTOR;

    const [characterState, setCharacterState] = useState<CharacterState>(() => ({
        mapX: 1070, 
        mapY: 780,
        direction: 1,
        frame: 0,
        isMoving: false,
    }));

    const isPopupTriggered = usePopupTrigger({
        mapX: characterState.mapX,
        mapY: characterState.mapY,
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (isPopupTriggered) setIsPopupOpen(true);
    }, [isPopupTriggered]);

    const handleClosePopup = () => setIsPopupOpen(false);

    // animación del monito 
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
        if (isPopupOpen || showIntro) {
            event.preventDefault();
            return;
        }
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
            const MAX_X = CUSTOM_MAX_X_POS - HALF_SPRITE;
            const MIN_Y = HALF_SPRITE;
            const MAX_Y = CUSTOM_MAX_Y_POS - HALF_SPRITE;

            // 1. Aplicar los límites del mapa (Boundary Check)
            const limitedX = Math.max(MIN_X, Math.min(MAX_X, newX));
            const limitedY = Math.max(MIN_Y, Math.min(MAX_Y, newY));

            // 2. Verificar Colisión contra Áreas (Collision Check)
            const hasCollision = checkCollision(
                limitedX,
                limitedY,
                SCALED_SPRITE_SIZE,
                COLLISION_AREAS
            );

            let finalX = limitedX;
            let finalY = limitedY;

            if (hasCollision) {
                // Lógica de Deslizamiento (Intenta mover solo en un eje si el movimiento completo falla)

                // Intento solo en X (mantener Y anterior):
                const tryX = checkCollision(limitedX, prev.mapY, SCALED_SPRITE_SIZE, COLLISION_AREAS);
                // Intento solo en Y (mantener X anterior):
                const tryY = checkCollision(prev.mapX, limitedY, SCALED_SPRITE_SIZE, COLLISION_AREAS);

                if (!tryX) {
                    finalX = limitedX;
                    finalY = prev.mapY; // Deslizamiento horizontal
                } else if (!tryY) {
                    finalX = prev.mapX;
                    finalY = limitedY; // Deslizamiento vertical
                } else {
                    // Si choca en ambos, no se mueve
                    finalX = prev.mapX;
                    finalY = prev.mapY;
                }
            }

            const movementStopped = finalX === prev.mapX && finalY === prev.mapY;

            return {
                ...prev,
                mapX: finalX,
                mapY: finalY,
                direction,
                isMoving: !movementStopped,
            };
        });
    }, [isPopupOpen, showIntro]);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (isPopupOpen || showIntro) return;
        const key = event.key.toLowerCase();
        if (DIRECTION_MAP[key] !== undefined) {
            setCharacterState((prev) => ({ ...prev, isMoving: false }));
        }
    }, [isPopupOpen, showIntro]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    // Lógica para centrar el mapa alrededor del personaje
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

    const handleLogout = () => navigate('/');

    // 🌟 Renderizado Condicional del LoadingScreen
    if (showIntro) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

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

            {/* Personaje */}
            {!isPopupOpen && (
                <Character
                    x={characterState.mapX + backgroundTranslateX - SCALED_SPRITE_SIZE / 2}
                    y={characterState.mapY + backgroundTranslateY - SCALED_SPRITE_SIZE / 2}
                    style={{ zIndex: 1, position: 'absolute' }}
                    direction={characterState.direction}
                    frame={characterState.frame}
                />
            )}

            {/* UI fija */}
            <h1 className="absolute top-3 left-3 kawaii-header text-xl" style={{ zIndex: 10 }}>
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
                    fontSize: '0.75rem',
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
                    boxShadow: '2px 2px 0px #6495ed',
                }}
            >
                Pos: ({Math.round(characterState.mapX)}, {Math.round(characterState.mapY)})
            </div>

            <FirstMinigame
                isOpen={isPopupOpen}
                title="Primer Mini-juego"
                message="Es en donde debe de elegir una opcion"
                onClose={handleClosePopup}
            />
        </div>
    );
};

export default WorldScreen;