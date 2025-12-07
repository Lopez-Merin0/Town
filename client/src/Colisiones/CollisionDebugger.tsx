import React from 'react';
import { COLLISION_AREAS } from './CollisionAreas';
import { NPC_TRIGGER_AREAS } from '../NPC/NPCTriggerAreas';

interface CollisionDebuggerProps {
    backgroundTranslateX: number;
    backgroundTranslateY: number;
}

// Definir las áreas de trigger de minijuegos para visualización
const MINIGAME_TRIGGER_AREAS = [
    { name: 'FirstMinigame', xMin: 211, xMax: 246, yMin: 500, yMax: 535, color: '#00FF00' },
    { name: 'SecondMinigame', xMin: 718, xMax: 750, yMin: 140, yMax: 170, color: '#0000FF' },
    { name: 'ThirdMinigame', xMin: 1159, xMax: 1187, yMin: 635, yMax: 670, color: '#FF00FF' },
    { name: 'RoomMinigame', xMin: 1050, xMax: 1120, yMin: 790, yMax: 830, color: '#FFA500' },
];

const CollisionDebugger: React.FC<CollisionDebuggerProps> = ({ backgroundTranslateX, backgroundTranslateY }) => {
    const DEBUG_MODE = false; // Cambia a true para ver las áreas de colisión

    if (!DEBUG_MODE) return null;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
            {/* Áreas de colisión */}
            {COLLISION_AREAS.map((area, index) => (
                <div
                    key={`collision-${index}`}
                    style={{
                        position: 'absolute',
                        left: `${area.p1.x + backgroundTranslateX}px`,
                        top: `${area.p1.y + backgroundTranslateY}px`,
                        width: `${area.p2.x - area.p1.x}px`,
                        height: `${area.p4.y - area.p1.y}px`,
                        border: 'none',
                        backgroundColor: 'transparent',
                        pointerEvents: 'none',
                    }}
                />
            ))}

            {/* Áreas de trigger de NPCs */}
            {NPC_TRIGGER_AREAS.map((area, index) => (
                <div
                    key={`npc-trigger-${index}`}
                    style={{
                        position: 'absolute',
                        left: `${area.topLeft.x + backgroundTranslateX}px`,
                        top: `${area.topLeft.y + backgroundTranslateY}px`,
                        width: `${area.bottomRight.x - area.topLeft.x}px`,
                        height: `${area.bottomRight.y - area.topLeft.y}px`,
                        border: 'none',
                        backgroundColor: 'transparent',
                        pointerEvents: 'none',
                    }}
                />
            ))}

            {/* Áreas de trigger de minijuegos */}
            {MINIGAME_TRIGGER_AREAS.map((area, index) => (
                <div
                    key={`minigame-trigger-${index}`}
                    style={{
                        position: 'absolute',
                        left: `${area.xMin + backgroundTranslateX}px`,
                        top: `${area.yMin + backgroundTranslateY}px`,
                        width: `${area.xMax - area.xMin}px`,
                        height: `${area.yMax - area.yMin}px`,
                        border: `3px dashed ${area.color}`,
                        backgroundColor: `${area.color}33`,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                    }}>
                        {area.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollisionDebugger;