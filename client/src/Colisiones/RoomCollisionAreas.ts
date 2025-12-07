export interface Point {
    x: number;
    y: number;
}

export interface RoomCollisionArea {
    topLeft: Point;
    bottomRight: Point;
}

// Define las áreas donde el personaje NO puede caminar (paredes, muebles, etc.)
export const ROOM_COLLISION_AREAS: RoomCollisionArea[] = [
    // Pared superior
    {
        topLeft: { x: 0, y: 0 },
        bottomRight: { x: 900, y: 50 },
    },
    
    // Pared inferior
    {
        topLeft: { x: 0, y: 490 },
        bottomRight: { x: 900, y: 540 },
    },
    
    // Pared izquierda
    {
        topLeft: { x: 0, y: 0 },
        bottomRight: { x: -10, y: 540 },
    },

    // Pared derecha
    {
        topLeft: { x: 872, y: 280 },
        bottomRight: { x: 852, y: 440 },
    },
    
    // zona superior
    {
        topLeft: { x: 80, y: 100 },
        bottomRight: { x: 800, y: 230 },
    },

    // cama (colisión restaurada)
    {
        topLeft: { x: 100, y: 280 },
        bottomRight: { x: 250, y: 375 },
    },
];
