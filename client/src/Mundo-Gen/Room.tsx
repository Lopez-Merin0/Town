import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Character from './Character';
import LoadingScreen from '../LogIn/LoadingScreen';
import { useGlobalProgress } from '../contexts/GlobalProgressContext';
import SleepPopup from '../components/Popups/SleepPopup';
import { checkRoomCollision } from '../utils/collisionUtils';
import { checkAllMinigamesCompleted } from '../utils/minigameUtils';
import { ROOM_COLLISION_AREAS } from '../Colisiones/RoomCollisionAreas';
import '../index.css';
import roomBackground from '../assets/mundo/cuarto.jpg';
import ProgressButton from './ProgressButton';
import ConfirmationPopup from '../components/Popups/ConfirmationPopup';

const ROOM_WIDTH = 500;  
const ROOM_HEIGHT = 300; 
const SCALE_FACTOR = 1.8;  // tamaño de la imagen

const BASE_SPRITE_SIZE = 16;
const CHARACTER_SCALE_FACTOR = 6;  // Reducido de 12 a 6 para hacer el personaje mucho más grande
const SCALED_SPRITE_SIZE = BASE_SPRITE_SIZE * CHARACTER_SCALE_FACTOR;

const MOVEMENT_SPEED = 5;
const DEBUG_MODE = false; // Cambiar a true temporalmente para ver qué pasa

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

const Room: React.FC = () => {
    const navigate = useNavigate();
    const { saveProgressToServer } = useGlobalProgress();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [showMapPopup, setShowMapPopup] = useState(false);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [hasShownSavePopup, setHasShownSavePopup] = useState(false);
    const [showSleepPopup, setShowSleepPopup] = useState(false);
    const [hasShownSleepPopup, setHasShownSleepPopup] = useState(false);
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

    const MAX_MAP_WIDTH = ROOM_WIDTH * SCALE_FACTOR;
    const MAX_MAP_HEIGHT = ROOM_HEIGHT * SCALE_FACTOR;

    const [characterState, setCharacterState] = useState<CharacterState>(() => ({
        mapX: 400,  // Posición inicial segura
        mapY: 400,  // Posición inicial segura
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
        // Bloquear movimiento si hay algún popup activo
        if (showSavePopup || showLogoutPopup || showSleepPopup || showMapPopup) {
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
            const MAX_X = MAX_MAP_WIDTH - HALF_SPRITE;
            const MIN_Y = HALF_SPRITE;
            const MAX_Y = MAX_MAP_HEIGHT - HALF_SPRITE;

            const limitedX = Math.max(MIN_X, Math.min(MAX_X, newX));
            const limitedY = Math.max(MIN_Y, Math.min(MAX_Y, newY));

            // Verificar colisiones (áreas donde NO puede pasar)
            const hasCollision = checkRoomCollision(limitedX, limitedY, SCALED_SPRITE_SIZE, ROOM_COLLISION_AREAS, DEBUG_MODE);

            let finalX = limitedX;
            let finalY = limitedY;

            if (hasCollision) {
                // Intentar moverse solo en X
                const tryX = checkRoomCollision(limitedX, prev.mapY, SCALED_SPRITE_SIZE, ROOM_COLLISION_AREAS, DEBUG_MODE);
                // Intentar moverse solo en Y
                const tryY = checkRoomCollision(prev.mapX, limitedY, SCALED_SPRITE_SIZE, ROOM_COLLISION_AREAS, DEBUG_MODE);

                if (!tryX) {
                    finalY = prev.mapY;
                } else if (!tryY) {
                    finalX = prev.mapX;
                } else {
                    finalX = prev.mapX;
                    finalY = prev.mapY;
                }
            }

            return {
                ...prev,
                mapX: finalX,
                mapY: finalY,
                direction,
                isMoving: true,
            };
        });
    }, [MAX_MAP_WIDTH, MAX_MAP_HEIGHT, showSavePopup, showLogoutPopup, showSleepPopup, showMapPopup]);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        // Bloquear movimiento si hay algún popup activo
        if (showSavePopup || showLogoutPopup || showSleepPopup || showMapPopup) {
            event.preventDefault();
            return;
        }

        const key = event.key.toLowerCase();
        if (DIRECTION_MAP[key] !== undefined) {
            setCharacterState((prev) => ({ ...prev, isMoving: false }));
        }
    }, [showSavePopup, showLogoutPopup, showSleepPopup, showMapPopup]);

    useEffect(() => {
        // Detener movimiento cuando aparezca un popup
        if (showSavePopup || showLogoutPopup || showSleepPopup || showMapPopup) {
            setCharacterState(prev => ({ ...prev, isMoving: false, frame: 0 }));
        }
    }, [showSavePopup, showLogoutPopup, showSleepPopup, showMapPopup]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    useEffect(() => {
        const { mapX, mapY } = characterState;
        
        console.log('🔍 Verificando zonas - Posición:', { mapX, mapY });
        
        // Zona de guardado
        const isInSaveZone = mapX >= 500 && mapX <= 620 && mapY >= 280 && mapY <= 320;
        
        if (isInSaveZone && !showSavePopup && !hasShownSavePopup) {
            console.log('💾 Zona de guardado activada');
            setShowSavePopup(true);
            setHasShownSavePopup(true);
        } else if (!isInSaveZone && hasShownSavePopup) {
            setHasShownSavePopup(false);
        }

        // Zona de la cama (dormir) - ÁREA ALREDEDOR de la cama, no sobre ella
        const isNearBed = (
            (mapX >= 50 && mapX <= 100 && mapY >= 280 && mapY <= 375) ||  // Lado izquierdo de la cama
            (mapX >= 250 && mapX <= 300 && mapY >= 280 && mapY <= 375) ||  // Lado derecho de la cama
            (mapX >= 100 && mapX <= 250 && mapY >= 240 && mapY <= 280) ||  // Arriba de la cama
            (mapX >= 100 && mapX <= 250 && mapY >= 375 && mapY <= 420)     // Abajo de la cama
        );
        const allMinigamesCompleted = checkAllMinigamesCompleted();
        
        console.log('🛏️ Verificando cama:', { 
            isNearBed, 
            allMinigamesCompleted,
            showSleepPopup,
            hasShownSleepPopup,
            currentPos: { mapX, mapY }
        });
        
        if (isNearBed && allMinigamesCompleted && !showSleepPopup && !hasShownSleepPopup) {
            console.log('💤 Activando popup de dormir');
            setShowSleepPopup(true);
            setHasShownSleepPopup(true);
        } else if (!isNearBed && hasShownSleepPopup) {
            setHasShownSleepPopup(false);
        }
    }, [characterState.mapX, characterState.mapY, showSavePopup, hasShownSavePopup, showSleepPopup, hasShownSleepPopup]);

    const handleSaveProgress = async () => {
        console.log('=== Iniciando guardado de progreso ===');
        
        const success = await saveProgressToServer();
        
        if (success) {
            alert('¡Progreso guardado exitosamente en la base de datos!');
            setShowSavePopup(false);
        } else {
            alert('No se pudo guardar el progreso. Asegúrate de haber completado al menos un nivel.');
            setShowSavePopup(false);
        }
    };

    if (showIntro) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    return (
        <div
            className="relative w-screen h-screen overflow-hidden"
            style={{ 
                backgroundColor: '#000000',
            }}
        >
            {/* Contenedor de la imagen de fondo del cuarto */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${MAX_MAP_WIDTH}px`,
                    height: `${MAX_MAP_HEIGHT}px`,
                    backgroundImage: `url(${roomBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                }}
            />

            {/* Debug: Mostrar áreas de colisión */}
            {DEBUG_MODE && (
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: `${MAX_MAP_WIDTH}px`, height: `${MAX_MAP_HEIGHT}px`, pointerEvents: 'none', zIndex: 5 }}>
                    {ROOM_COLLISION_AREAS.map((area, index) => (
                        <div
                            key={`collision-${index}`}
                            style={{
                                position: 'absolute',
                                left: `${area.topLeft.x}px`,
                                top: `${area.topLeft.y}px`,
                                width: `${area.bottomRight.x - area.topLeft.x}px`,
                                height: `${area.bottomRight.y - area.topLeft.y}px`,
                                border: '2px solid red',
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                pointerEvents: 'none',
                            }}
                        />
                    ))}
                    
                    {/* Zona de guardado en verde */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '500px',
                            top: '280px',
                            width: '120px',
                            height: '40px',
                            border: '3px solid green',
                            backgroundColor: 'rgba(0, 255, 0, 0.2)',
                            pointerEvents: 'none',
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'lime',
                            padding: '2px 5px',
                            borderRadius: '3px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                        }}>
                            Guardar
                        </div>
                    </div>

                    {/* Zona de dormir en morado - ALREDEDOR de la cama */}
                    {checkAllMinigamesCompleted() && (
                        <>
                            {/* Lado izquierdo */}
                            <div style={{ position: 'absolute', left: '50px', top: '280px', width: '50px', height: '95px', border: '3px solid purple', backgroundColor: 'rgba(147, 112, 219, 0.2)', pointerEvents: 'none' }}>
                                <div style={{ position: 'absolute', top: '5px', left: '5px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#9370DB', padding: '2px 5px', borderRadius: '3px', fontSize: '10px', fontWeight: 'bold' }}>💤</div>
                            </div>
                            {/* Lado derecho */}
                            <div style={{ position: 'absolute', left: '250px', top: '280px', width: '50px', height: '95px', border: '3px solid purple', backgroundColor: 'rgba(147, 112, 219, 0.2)', pointerEvents: 'none' }}>
                                <div style={{ position: 'absolute', top: '5px', left: '5px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#9370DB', padding: '2px 5px', borderRadius: '3px', fontSize: '10px', fontWeight: 'bold' }}>💤</div>
                            </div>
                            {/* Arriba */}
                            <div style={{ position: 'absolute', left: '100px', top: '240px', width: '150px', height: '40px', border: '3px solid purple', backgroundColor: 'rgba(147, 112, 219, 0.2)', pointerEvents: 'none' }}>
                                <div style={{ position: 'absolute', top: '5px', left: '5px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#9370DB', padding: '2px 5px', borderRadius: '3px', fontSize: '10px', fontWeight: 'bold' }}>💤</div>
                            </div>
                            {/* Abajo */}
                            <div style={{ position: 'absolute', left: '100px', top: '375px', width: '150px', height: '45px', border: '3px solid purple', backgroundColor: 'rgba(147, 112, 219, 0.2)', pointerEvents: 'none' }}>
                                <div style={{ position: 'absolute', top: '5px', left: '5px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#9370DB', padding: '2px 5px', borderRadius: '3px', fontSize: '10px', fontWeight: 'bold' }}>💤</div>
                            </div>
                        </>
                    )}
                </div>
            )}

            <Character
                x={(viewport.width / 2) + (characterState.mapX - MAX_MAP_WIDTH / 2) - SCALED_SPRITE_SIZE / 2}
                y={(viewport.height / 2) + (characterState.mapY - MAX_MAP_HEIGHT / 2) - SCALED_SPRITE_SIZE / 2}
                style={{ zIndex: 1, position: 'absolute' }}
                direction={characterState.direction}
                frame={characterState.frame}
            />

            <div className="fixed top-4 right-4 flex space-x-2" style={{ zIndex: 10 }}>
                <button
                    onClick={() => setShowMapPopup(true)}
                    className="kawaii-button py-1 px-2 flex items-center space-x-1"
                    style={{
                        backgroundColor: '#90EE90',
                        color: '#333333',
                        border: '3px solid #32CD32',
                        fontSize: '0.75rem',
                    }}
                    disabled={showLogoutPopup || showSavePopup || showSleepPopup || showMapPopup}
                >
                    <span className="font-bold">IR AL MAPA</span>
                </button>

                <ProgressButton
                    disabled={showLogoutPopup || showSavePopup || showSleepPopup || showMapPopup}
                />

                <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="kawaii-button py-1 px-2 flex items-center space-x-1"
                    style={{
                        backgroundColor: '#ff69b4',
                        color: 'white',
                        border: '3px solid #e04e9e',
                        fontSize: '0.75rem',
                    }}
                    disabled={showLogoutPopup || showSavePopup || showSleepPopup || showMapPopup}
                >
                    <LogOutIcon className="w-3 h-3" />
                    <span className="font-bold">SALIR</span>
                </button>
            </div>

            {showMapPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="kawaii-popup p-6 rounded-lg shadow-lg text-center"
                        style={{
                            backgroundColor: '#fefefe',
                            border: '5px solid #32CD32',
                            boxShadow: '0 8px 0 0 #90EE90',
                            maxWidth: '400px',
                        }}>
                        <p className="text-xl font-bold mb-4" style={{ color: '#333333' }}>
                            ¿Quieres ir al mapa?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    setShowMapPopup(false);
                                    navigate('/world');
                                }}
                                className="kawaii-button py-2 px-4 font-bold"
                                style={{
                                    backgroundColor: '#90EE90',
                                    color: '#333333',
                                    border: '3px solid #32CD32',
                                }}
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={() => setShowMapPopup(false)}
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

            {showLogoutPopup && (
                <ConfirmationPopup 
                    onConfirm={() => {
                        setShowLogoutPopup(false);
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('userData');
                        navigate('/', { replace: true });
                    }} 
                    onCancel={() => setShowLogoutPopup(false)} 
                />
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

            {showSleepPopup && (
                <SleepPopup onClose={() => setShowSleepPopup(false)} />
            )}

            {DEBUG_MODE && (
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
            )}
        </div>
    );
};

export default Room;
