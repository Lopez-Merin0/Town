import { CollisionArea } from '../Colisiones/CollisionAreas';
import type { RoomCollisionArea } from '../Colisiones/RoomCollisionAreas';

export const checkCollision = (
    nextX: number,
    nextY: number,
    scaledSpriteSize: number,
    areas: CollisionArea[],
    debugMode: boolean = false
): boolean => {
    if (debugMode) return false;

    const HALF_SPRITE = scaledSpriteSize / 2;

    const playerBox = {
        left: nextX - HALF_SPRITE,
        right: nextX + HALF_SPRITE,
        top: nextY - HALF_SPRITE,
        bottom: nextY + HALF_SPRITE,
    };

    for (const area of areas) {
        const allX = [area.p1.x, area.p2.x, area.p3.x, area.p4.x];
        const allY = [area.p1.y, area.p2.y, area.p3.y, area.p4.y];

        const x_min = Math.min(...allX);
        const x_max = Math.max(...allX);
        const y_min = Math.min(...allY);
        const y_max = Math.max(...allY);

        const areaBox = {
            left: x_min,
            right: x_max,
            top: y_min,
            bottom: y_max,
        };

        const isColliding = (
            playerBox.left < areaBox.right &&
            playerBox.right > areaBox.left &&
            playerBox.top < areaBox.bottom &&
            playerBox.bottom > areaBox.top
        );

        if (isColliding) {
            return true;
        }
    }
    return false;
};

export const checkRoomCollision = (
    characterX: number,
    characterY: number,
    characterSize: number,
    collisionAreas: RoomCollisionArea[],
    debug: boolean = false
): boolean => {
    const halfSize = characterSize / 2;
    const charLeft = characterX - halfSize;
    const charRight = characterX + halfSize;
    const charTop = characterY - halfSize;
    const charBottom = characterY + halfSize;

    for (const area of collisionAreas) {
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
            if (debug) {
                console.log('🔴 Colisión detectada en Room:', { characterX, characterY, area });
            }
            return true;
        }
    }

    return false;
};
