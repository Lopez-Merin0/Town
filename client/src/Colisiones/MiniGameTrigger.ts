import { useEffect, useState } from 'react';

const TRIGGER_AREAS = {
    FirstMinigame: {
        xMin: 211,
        xMax: 246,
        yMin: 500,
        yMax: 535,
    },
    SecondMinigame: { 
        xMin: 718,
        xMax: 750, 
        yMin: 140,
        yMax: 170,
    },
    ThirdMinigame: { 
        xMin: 1159, 
        xMax: 1187, 
        yMin: 635,
        yMax: 670,
    },
    RoomMinigame: {  // Área para ir al cuarto - MOVIDA A ZONA ACCESIBLE
        xMin: 200,   // Más amplio
        xMax: 260,   // Más amplio
        yMin: 260,   // Más abajo, fuera de colisiones
        yMax: 310,   // Área más grande
    },
};

interface UsePopupTriggerProps {
    mapX: number;
    mapY: number;
}

export const usePopupTrigger = ({ mapX, mapY }: UsePopupTriggerProps): string | null => {
    const [activeTrigger, setActiveTrigger] = useState<string | null>(null);

    useEffect(() => {
        let activatedKey: string | null = null;
        
        const checkArea = (area: typeof TRIGGER_AREAS['FirstMinigame']) => {
            const isInside = (
                mapX >= area.xMin &&
                mapX <= area.xMax &&
                mapY >= area.yMin &&
                mapY <= area.yMax
            );
            
            return isInside;
        };

        for (const [key, area] of Object.entries(TRIGGER_AREAS)) {
            if (checkArea(area)) {
                activatedKey = key;
                console.log('🎮 Trigger activado:', key, { mapX, mapY, area });
                break; 
            }
        }
        
        setActiveTrigger(activatedKey);

    }, [mapX, mapY]);

    return activeTrigger;
};