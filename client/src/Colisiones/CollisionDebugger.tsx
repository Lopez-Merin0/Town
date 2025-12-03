// CollisionDebugger.tsx (Tu código, el cual está correcto)

import React from 'react';
import { COLLISION_AREAS } from './CollisionAreas';
import { WALKABLE_AREAS } from './WalkableAreas';
import { NPC_TRIGGER_AREAS } from '../NPC/NPCTriggerAreas';

interface CollisionDebuggerProps {
    backgroundTranslateX: number;
    backgroundTranslateY: number;
}

const CollisionDebugger: React.FC<CollisionDebuggerProps> = ({ backgroundTranslateX, backgroundTranslateY }) => {
    const DEBUG_MODE = true;

    if (!DEBUG_MODE) return null;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
            {/* Áreas de colisión (ocultas - sin color) */}
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

            {/* Áreas walkables (visibles - verde) */}
            {WALKABLE_AREAS.map((area, index) => (
                <div
                    key={`walkable-${index}`}
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

            {/* Áreas de trigger de NPCs (verde con borde) */}
            {NPC_TRIGGER_AREAS.map((area, index) => (
                <div
                    key={`npc-trigger-${index}`}
                    style={{
                        position: 'absolute',
                        left: `${area.topLeft.x + backgroundTranslateX}px`,
                        top: `${area.topLeft.y + backgroundTranslateY}px`,
                        width: `${area.bottomRight.x - area.topLeft.x}px`,
                        height: `${area.bottomRight.y - area.topLeft.y}px`,
                        border: `2px dashed ${area.debugColor}`,
                        backgroundColor: 'transparent',
                        pointerEvents: 'none',
                    }}
                >
                    <span style={{
                        position: 'absolute',
                        top: '2px',
                        left: '2px',
                        fontSize: '10px',
                        color: '#000',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        padding: '2px 4px',
                        borderRadius: '3px',
                    }}>
                        NPC: {area.npcId}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CollisionDebugger;