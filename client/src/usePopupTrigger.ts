//Solo es el de FirstMinigame
import { useEffect, useState } from 'react';

const TRIGGER_AREA = {
    xMin: 1169,
    xMax: 1209,
    yMin: 535,
    yMax: 535,
};

interface UsePopupTriggerProps {
    mapX: number;
    mapY: number;
}

//hook
export const usePopupTrigger = ({ mapX, mapY }: UsePopupTriggerProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const isInTriggerArea = 
            mapX >= TRIGGER_AREA.xMin &&
            mapX <= TRIGGER_AREA.xMax &&
            mapY >= TRIGGER_AREA.yMin &&
            mapY <= TRIGGER_AREA.yMax;
        
        setIsPopupOpen(isInTriggerArea);

    }, [mapX, mapY]);

    return isPopupOpen;
};