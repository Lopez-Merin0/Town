export interface Point {
    x: number;
    y: number;
}

export interface CollisionArea {
    p1: Point;
    p2: Point;
    p3: Point;
    p4: Point;
    debugColor: string; 
}

interface SimpleCollisionArea {
    topLeft: Point;
    bottomRight: Point;
    debugColor: string;
}

const createRectangle = (area: SimpleCollisionArea): CollisionArea => {
    return {
        p1: { x: area.topLeft.x, y: area.topLeft.y },          
        p2: { x: area.bottomRight.x, y: area.topLeft.y },       
        p3: { x: area.bottomRight.x, y: area.bottomRight.y },   
        p4: { x: area.topLeft.x, y: area.bottomRight.y },      
        debugColor: area.debugColor,
    };
};

const SIMPLE_COLLISION_AREAS: SimpleCollisionArea[] = [
    
    // Mi casa (arriba-izquierda, casa azul grande)
    {
        topLeft: { x: 140, y: 80 },
        bottomRight: { x: 340, y: 260 },
        debugColor: '#FF0000',
    },

    // Casa verde (izquierda-centro, casa pequeña verde)
    {
        topLeft: { x: 140, y: 340 },
        bottomRight: { x: 280, y: 480 },
        debugColor: '#FF0000',
    },

    // Casa morada inferior izquierda
    {
        topLeft: { x: 140, y: 580 },
        bottomRight: { x: 280, y: 720 },
        debugColor: '#FF0000',
    },

    // Casa verde superior derecha
    {
        topLeft: { x: 700, y: 80 },
        bottomRight: { x: 840, y: 220 },
        debugColor: '#FF0000',
    },

    // GYM (gimnasio rojo - centro)
    {
        topLeft: { x: 560, y: 280 },
        bottomRight: { x: 780, y: 460 },
        debugColor: '#FF0000',
    },

    // SHOP (tienda verde - derecha-arriba)
    {
        topLeft: { x: 980, y: 140 },
        bottomRight: { x: 1120, y: 280 },
        debugColor: '#FF0000',
    },

    // Casa morada (derecha-abajo)
    {
        topLeft: { x: 1000, y: 520 },
        bottomRight: { x: 1140, y: 660 },
        debugColor: '#FF0000',
    },

    // Casa pequeña centro-inferior (cerca del río)
    {
        topLeft: { x: 560, y: 540 },
        bottomRight: { x: 700, y: 680 },
        debugColor: '#FF0000',
    },
];

export const COLLISION_AREAS: CollisionArea[] = SIMPLE_COLLISION_AREAS.map(createRectangle);