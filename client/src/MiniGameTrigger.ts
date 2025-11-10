import { useEffect, useState } from 'react';
const TRIGGER_AREAS = {
    FirstMinigame: {
        xMin: 1169,
        xMax: 1209,
        yMin: 535,
        yMax: 535, 
    },
    SecondMinigame: { 
        xMin: 965,
        xMax: 1005, 
        yMin: 530,
        yMax: 530, 
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