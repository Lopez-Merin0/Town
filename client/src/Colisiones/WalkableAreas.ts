export interface Point {
    x: number;
    y: number;
}

export interface WalkableArea {
    topLeft: Point;
    bottomRight: Point;
    name: string;
    debugColor: string;
}

export const WALKABLE_AREAS: WalkableArea[] = [
    // ========== ÁREAS VERDES TRANSITABLES ==========
    
    // Área izquierda completa (jardín oeste)
    {
        topLeft: { x: 0, y: 0 },
        bottomRight: { x: 400, y: 896 },
        name: 'Jardín Oeste',
        debugColor: '#00FF00',
    },

    // Puente superior (sobre el río)
    {
        topLeft: { x: 400, y: 280 },
        bottomRight: { x: 540, y: 360 },
        name: 'Puente Norte',
        debugColor: '#00FF00',
    },

    // Puente inferior (sobre el río)
    {
        topLeft: { x: 400, y: 480 },
        bottomRight: { x: 540, y: 560 },
        name: 'Puente Sur',
        debugColor: '#00FF00',
    },

    // Área derecha completa (jardín este)
    {
        topLeft: { x: 540, y: 0 },
        bottomRight: { x: 1434, y: 896 },
        name: 'Jardín Este',
        debugColor: '#00FF00',
    },

    // Caminos entre edificios - izquierda superior
    {
        topLeft: { x: 340, y: 80 },
        bottomRight: { x: 400, y: 260 },
        name: 'Camino Norte-Oeste',
        debugColor: '#00FF00',
    },

    // Caminos entre edificios - izquierda centro
    {
        topLeft: { x: 280, y: 340 },
        bottomRight: { x: 400, y: 480 },
        name: 'Camino Centro-Oeste',
        debugColor: '#00FF00',
    },

    // Caminos entre edificios - izquierda inferior
    {
        topLeft: { x: 280, y: 580 },
        bottomRight: { x: 400, y: 720 },
        name: 'Camino Sur-Oeste',
        debugColor: '#00FF00',
    },
];
