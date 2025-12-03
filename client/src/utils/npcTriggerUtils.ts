import { NPC_TRIGGER_AREAS, NPCTriggerArea } from '../NPC/NPCTriggerAreas';

export const checkNPCTrigger = (
    characterX: number,
    characterY: number,
    characterSize: number
): string | null => {
    const halfSize = characterSize / 2;
    const charLeft = characterX - halfSize;
    const charRight = characterX + halfSize;
    const charTop = characterY - halfSize;
    const charBottom = characterY + halfSize;

    for (const area of NPC_TRIGGER_AREAS) {
        const areaLeft = area.topLeft.x;
        const areaRight = area.bottomRight.x;
        const areaTop = area.topLeft.y;
        const areaBottom = area.bottomRight.y;

        const isIntersecting = !(
            charRight < areaLeft ||
            charLeft > areaRight ||
            charBottom < areaTop ||
            charTop > areaBottom
        );

        if (isIntersecting) {
            return area.npcId;
        }
    }

    return null;
};
