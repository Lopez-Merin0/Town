import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Character from './Character';
import CollisionDebugger from '../Colisiones/CollisionDebugger';
import { usePopupTrigger } from '../Colisiones/MiniGameTrigger';
import LoadingScreen from '../LogIn/LoadingScreen';
import NPCDialoguePopup from '../NPC/NPCDialoguePopup';
import { NPC_LIST, NPCDialogue } from '../NPC/NPCConfig';
import ProgressButton from './ProgressButton';
import ConfirmationPopup from '../components/Popups/ConfirmationPopup';
import MiniGameConfirmationPopup from '../components/Popups/MiniGameConfirmationPopup';
import LockedMinigamePopup from '../components/Popups/LockedMinigamePopup';
import { checkCollision } from '../utils/collisionUtils';
import { checkMinigameUnlocked } from '../utils/minigameUtils';
import { checkNPCTrigger } from '../utils/npcTriggerUtils';
import '../index.css';
import { COLLISION_AREAS } from '../Colisiones/CollisionAreas';
import background from '../assets/mundo/fondo.jpeg';

const DEBUG_MODE = false;

const BACKGROUND_URL = background;

const MAP_WIDTH = 1024;
const MAP_HEIGHT = 640;
const SCALE_FACTOR = 1.4;

const BASE_SPRITE_SIZE = 16;
const CHARACTER_SCALE_FACTOR = 1;
const SCALED_SPRITE_SIZE = BASE_SPRITE_SIZE * CHARACTER_SCALE_FACTOR;

const MOVEMENT_SPEED = 3.5;
const CUSTOM_MAX_X_POS = 1344;
const CUSTOM_MAX_Y_POS = 840;

const MINIGAME_ROUTES: { [key: string]: string } = {
    FirstMinigame: '/primer mini juego',
    SecondMinigame: '/segundo mini juego',
    ThirdMinigame: '/tercer mini juego',
    RoomMinigame: '/room',
};

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

    const [showIntro, setShowIntro] = useState(true);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [miniGamePopupState, setMiniGamePopupState] = useState<{ isVisible: boolean; targetRoute: string; gameName: string; } | null>(null);
    const [npcDialogue, setNpcDialogue] = useState<{ npcName: string; dialogue: NPCDialogue } | null>(null);
    const [hasShownPopupForTrigger, setHasShownPopupForTrigger] = useState<string | null>(null);
    const [lockedMessage, setLockedMessage] = useState<string | null>(null);
    const [currentNPCTrigger, setCurrentNPCTrigger] = useState<string | null>(null);
    const [lastNPCTrigger, setLastNPCTrigger] = useState<string | null>(null);

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

    const [characterState, setCharacterState] = useState<CharacterState>(() => {
        const savedPosition = localStorage.getItem('worldCharacterPosition');
        if (savedPosition) {
            try {
                const parsed = JSON.parse(savedPosition);
                return {
                    mapX: parsed.mapX || 1070,
                    mapY: parsed.mapY || 810,
                    direction: parsed.direction || 1,
                    frame: 0,
                    isMoving: false,
                };
            } catch (error) {
                console.error('Error al parsear posición guardada:', error);
            }
        }
        return { mapX: 1070, mapY: 810, direction: 1, frame: 0, isMoving: false };
    });

    useEffect(() => {
        const positionData = {
            mapX: characterState.mapX,
            mapY: characterState.mapY,
            direction: characterState.direction,
        };
        localStorage.setItem('worldCharacterPosition', JSON.stringify(positionData));
    }, [characterState.mapX, characterState.mapY, characterState.direction]);

    const isPopupTriggered: string | null = usePopupTrigger({
        mapX: characterState.mapX,
        mapY: characterState.mapY,
    });

    useEffect(() => {
        if (isPopupTriggered && !miniGamePopupState && !showLogoutPopup && !lockedMessage && isPopupTriggered !== hasShownPopupForTrigger) {
            const targetRoute = MINIGAME_ROUTES[isPopupTriggered];
            if (targetRoute) {
                const { unlocked, message } = checkMinigameUnlocked(isPopupTriggered);
                
                if (!unlocked) {
                    setLockedMessage(message);
                    setHasShownPopupForTrigger(isPopupTriggered);
                } else {
                    setCharacterState(prev => ({ ...prev, isMoving: false }));
                    const gameName = targetRoute.replace('/', '');
                    setMiniGamePopupState({ isVisible: true, targetRoute, gameName });
                    setHasShownPopupForTrigger(isPopupTriggered);
                }
            }
        }
        
        if (!isPopupTriggered && hasShownPopupForTrigger) {
            setHasShownPopupForTrigger(null);
        }
    }, [isPopupTriggered, miniGamePopupState, showLogoutPopup, hasShownPopupForTrigger, lockedMessage]);

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

    useEffect(() => {
        const triggeredNPC = checkNPCTrigger(
            characterState.mapX,
            characterState.mapY,
            SCALED_SPRITE_SIZE
        );

        setCurrentNPCTrigger(triggeredNPC);

        if (triggeredNPC && 
            triggeredNPC !== lastNPCTrigger && 
            !npcDialogue && 
            !miniGamePopupState && 
            !showLogoutPopup) {
            
            const npc = NPC_LIST.find(n => n.id === triggeredNPC);
            if (npc) {
                const randomDialogue = npc.dialogues[Math.floor(Math.random() * npc.dialogues.length)];
                setCharacterState(prev => ({ ...prev, isMoving: false }));
                
                setNpcDialogue({
                    npcName: npc.name,
                    dialogue: randomDialogue
                });
                setLastNPCTrigger(triggeredNPC);
            }
        }

        if (!triggeredNPC && lastNPCTrigger) {
            setLastNPCTrigger(null);
        }
    }, [characterState.mapX, characterState.mapY, lastNPCTrigger, npcDialogue, miniGamePopupState, showLogoutPopup]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const isAnyPopupOpen = showIntro || showLogoutPopup || !!miniGamePopupState || !!npcDialogue || !!lockedMessage;
        if (isAnyPopupOpen) {
            event.preventDefault();
            event.stopPropagation();
            setCharacterState(prev => ({ ...prev, isMoving: false }));
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
            const limitedX = Math.max(HALF_SPRITE, Math.min(CUSTOM_MAX_X_POS - HALF_SPRITE, newX));
            const limitedY = Math.max(HALF_SPRITE, Math.min(CUSTOM_MAX_Y_POS - HALF_SPRITE, newY));

            const hasCollision = checkCollision(limitedX, limitedY, SCALED_SPRITE_SIZE, COLLISION_AREAS, DEBUG_MODE);

            let finalX = limitedX;
            let finalY = limitedY;

            if (hasCollision) {
                const tryX = checkCollision(limitedX, prev.mapY, SCALED_SPRITE_SIZE, COLLISION_AREAS, DEBUG_MODE);
                const tryY = checkCollision(prev.mapX, limitedY, SCALED_SPRITE_SIZE, COLLISION_AREAS, DEBUG_MODE);

                if (!tryX) {
                    finalY = prev.mapY;
                } else if (!tryY) {
                    finalX = prev.mapX;
                } else {
                    finalX = prev.mapX;
                    finalY = prev.mapY;
                }
            }

            return { ...prev, mapX: finalX, mapY: finalY, direction, isMoving: true };
        });
    }, [showIntro, showLogoutPopup, miniGamePopupState, npcDialogue, lockedMessage]);

    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        const isAnyPopupOpen = showIntro || showLogoutPopup || !!miniGamePopupState || !!npcDialogue || !!lockedMessage;
        if (isAnyPopupOpen) {
            event.preventDefault();
            event.stopPropagation();
            setCharacterState(prev => ({ ...prev, isMoving: false }));
            return;
        }
        const key = event.key.toLowerCase();
        if (DIRECTION_MAP[key] !== undefined) {
            setCharacterState((prev) => ({ ...prev, isMoving: false }));
        }
    }, [showIntro, showLogoutPopup, miniGamePopupState, npcDialogue, lockedMessage]);

    useEffect(() => {
        if (npcDialogue || miniGamePopupState || showLogoutPopup || lockedMessage) {
            setCharacterState(prev => ({ ...prev, isMoving: false, frame: 0 }));
        }
    }, [npcDialogue, miniGamePopupState, showLogoutPopup, lockedMessage]);

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

    const handleConfirmMinigame = () => {
        if (miniGamePopupState) {
            setCharacterState(prev => ({
                ...prev,
                mapY: prev.mapY + 30, 
                isMoving: false
            }));

            const positionData = {
                mapX: characterState.mapX,
                mapY: characterState.mapY + 30, // Guardar la nueva posición
                direction: characterState.direction,
            };
            localStorage.setItem('worldCharacterPosition', JSON.stringify(positionData));
            
            setMiniGamePopupState(null);
            
            setTimeout(() => {
                navigate(miniGamePopupState.targetRoute);
            }, 100);
        }
    };

    if (showIntro) {
        return <LoadingScreen onAnimationEnd={() => setShowIntro(false)} />;
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden" style={{ backgroundColor: '#4c965c' }}>
            <CollisionDebugger
                backgroundTranslateX={backgroundTranslateX}
                backgroundTranslateY={backgroundTranslateY}
            />

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
                        imageRendering: 'auto',
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

            <div className="fixed top-4 right-4 flex space-x-2" style={{ zIndex: 10 }}>
                <ProgressButton
                    disabled={showLogoutPopup || !!miniGamePopupState}
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
                    disabled={showLogoutPopup || !!miniGamePopupState}
                >
                    <LogOutIcon className="w-3 h-3" />
                    <span className="font-bold">SALIR</span>
                </button>
            </div>

            {DEBUG_MODE && (
                <div className="fixed bottom-4 left-4 p-2 text-xs font-bold rounded" style={{ zIndex: 10, backgroundColor: '#add8e6', color: '#333333', border: '2px solid #6495ed', boxShadow: '2px 2px 0px #6495ed' }}>
                    Pos: ({Math.round(characterState.mapX)}, {Math.round(characterState.mapY)})
                </div>
            )}

            {showLogoutPopup && <ConfirmationPopup onConfirm={() => { setShowLogoutPopup(false); navigate('/'); }} onCancel={() => setShowLogoutPopup(false)} />}
            {miniGamePopupState?.isVisible && <MiniGameConfirmationPopup minigameName={miniGamePopupState.gameName} onConfirm={handleConfirmMinigame} onCancel={() => setMiniGamePopupState(null)} />}
            {lockedMessage && <LockedMinigamePopup message={lockedMessage} onClose={() => setLockedMessage(null)} />}
            {npcDialogue && <NPCDialoguePopup npcName={npcDialogue.npcName} text={npcDialogue.dialogue.text} image={npcDialogue.dialogue.image} onClose={() => setNpcDialogue(null)} />}
        </div>
    );
};

export default WorldScreen;