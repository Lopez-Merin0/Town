import { CollisionArea } from '../Colisiones/CollisionAreas';

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
