import { useEffect, useState } from 'react';
const TRIGGER_AREAS = {
    FirstMinigame: {
        xMin: 211,
        xMax: 246,
        yMin: 517,
        yMax: 517, 
    },
    SecondMinigame: { 
        xMin: 718,
        xMax: 750, 
        yMin: 155,
        yMax: 155, 
    },
    ThirdMinigame: { 
        xMin: 1159, 
        xMax: 1187, 
        yMin: 652,
        yMax: 652, 
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
        
        const checkArea = (area: typeof TRIGGER_AREAS['FirstMinigame']) => (
            mapX >= area.xMin &&
            mapX <= area.xMax &&
            mapY >= area.yMin &&
            mapY <= area.yMax
        );

        for (const [key, area] of Object.entries(TRIGGER_AREAS)) {
            if (checkArea(area)) {
                activatedKey = key;
                break; 
            }
        }
        
        setActiveTrigger(activatedKey);

    }, [mapX, mapY]);

    return activeTrigger;
};