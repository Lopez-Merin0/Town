import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Character from './Character';
import '../index.css';
import roomBackground from '../assets/mundo/cuarto.jpg';

const ROOM_WIDTH = 500;  // Reducido de 1024
const ROOM_HEIGHT = 300; // Reducido de 640
const SCALE_FACTOR = 1.5;

const BASE_SPRITE_SIZE = 16;
const CHARACTER_SCALE_FACTOR = 8;
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
    const [showSavePopup, setShowSavePopup] = useState(false);

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

    // Detectar cuando el personaje llega a la zona de guardado
    useEffect(() => {
        const { mapX, mapY } = characterState;
        const isInSaveZone = mapX >= 425 && mapX <= 530 && mapY >= 220 && mapY <= 240;
        
        if (isInSaveZone && !showSavePopup) {
            setShowSavePopup(true);
        }
    }, [characterState.mapX, characterState.mapY, showSavePopup]);

    const handleSaveProgress = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');
            
            if (!authToken || !userData) {
                alert('No hay sesión activa');
                return;
            }

            const parsedUserData = JSON.parse(userData);
            const userId = parsedUserData.id || parsedUserData._id;

            // Obtener progreso de los minijuegos desde localStorage
            const minigame1Progress = localStorage.getItem('minigameProgress');
            const minigame2Progress = localStorage.getItem('minigame2Progress');
            const minigame3Progress = localStorage.getItem('minigame3Progress');

            const response = await fetch('http://localhost:5000/api/save-progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    userId,
                    minigame1Progress: minigame1Progress ? JSON.parse(minigame1Progress) : null,
                    minigame2Progress: minigame2Progress ? JSON.parse(minigame2Progress) : null,
                    minigame3Progress: minigame3Progress ? JSON.parse(minigame3Progress) : null,
                })
            });

            if (response.ok) {
                alert('¡Progreso guardado exitosamente!');
                setShowSavePopup(false);
            } else {
                alert('Error al guardar el progreso');
            }
        } catch (error) {
            console.error('Error saving progress:', error);
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div
            className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: '#FBF0DF' }}
        >
            <div
                style={{
                    position: 'relative',
                    zIndex: 0,
                    border: '5px solid #ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 8px 0 0 #ff69b4',
                    overflow: 'hidden',
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

                <Character
                    x={characterState.mapX - SCALED_SPRITE_SIZE / 2}
                    y={characterState.mapY - SCALED_SPRITE_SIZE / 2}
                    style={{ zIndex: 1, position: 'absolute' }}
                    direction={characterState.direction}
                    frame={characterState.frame}
                />
            </div>

            <div 
                style={{
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    zIndex: 10,
                }}
            >
                <h1 className="kawaii-header text-xl" style={{ margin: 0 }}>
                    Mi Cuartito
                </h1>
            </div>

            <div 
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 10,
                }}
            >
                <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="kawaii-button py-1 px-2 flex items-center space-x-1"
                    style={{
                        backgroundColor: '#ff69b4',
                        color: 'white',
                        border: '3px solid #e04e9e',
                        fontSize: '0.75rem',
                    }}
                >
                    <span className="font-bold">SALIR</span>
                </button>
            </div>

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
                            ¿Quieres salir?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    setShowLogoutPopup(false);
                                    localStorage.removeItem('authToken');
                                    localStorage.removeItem('userData');
                                    navigate('/', { replace: true });
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

            {showSavePopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="kawaii-popup p-6 rounded-lg shadow-lg text-center"
                        style={{
                            backgroundColor: '#fefefe',
                            border: '5px solid #6495ed',
                            boxShadow: '0 8px 0 0 #add8e6',
                            maxWidth: '400px',
                        }}>
                        <p className="text-xl font-bold mb-4" style={{ color: '#333333' }}>
                            ¿Quieres guardar tu progreso?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleSaveProgress}
                                className="kawaii-button py-2 px-4 font-bold"
                                style={{
                                    backgroundColor: '#90EE90',
                                    color: '#333333',
                                    border: '3px solid #32CD32',
                                }}
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setShowSavePopup(false)}
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