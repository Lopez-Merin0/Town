// CollisionDebugger.tsx (Tu código, el cual está correcto)

import React from 'react';
import { COLLISION_AREAS, CollisionArea, Point } from './CollisionAreas'; 

interface CollisionDebuggerProps {
    backgroundTranslateX: number;
    backgroundTranslateY: number;
}

const getAABBFromFourPoints = (area: CollisionArea) => {
    const allX = [area.p1.x, area.p2.x, area.p3.x, area.p4.x];
    const allY = [area.p1.y, area.p2.y, area.p3.y, area.p4.y];

    const x_min = Math.min(...allX);
    const x_max = Math.max(...allX);
    const y_min = Math.min(...allY);
    const y_max = Math.max(...allY);

    return {
        x: x_min,
        y: y_min,
        width: x_max - x_min,
        height: y_max - y_min,
    };
};

const CollisionDebugger: React.FC<CollisionDebuggerProps> = ({ backgroundTranslateX, backgroundTranslateY }) => {
    return (
        <>
            {COLLISION_AREAS.map((area, index) => {
                const aabb = getAABBFromFourPoints(area);
                const color = area.debugColor || '#FF0000';

                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            zIndex: 99, 
                            pointerEvents: 'none',
                            
                            // Fondo: color definido + opacidad
                            backgroundColor: `${color}30`, 
                            
                            // Borde/Recuadro: el color definido (opaco)
                            border: `3px solid ${color}`,  
                            
                            // Posición ajustada por el desplazamiento del mapa (cámara)
                            transform: `translate(${backgroundTranslateX + aabb.x}px, ${backgroundTranslateY + aabb.y}px)`,
                            
                            width: aabb.width,
                            height: aabb.height,
                        }}
                    />
                );
            })}
        </>
    );
};

export default CollisionDebugger;