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
    
    // Casa azul
    {
        topLeft: { x: 172, y: 73 },
        bottomRight: { x: 291, y: 202 },
        debugColor: '#FF0000',
    },

    // Casa teal - Nivel #1
    {
        topLeft: { x: 162, y: 377 },
        bottomRight: { x: 302, y: 496 },
        debugColor: '#FF0000',
    },

    // Casa morada pequeña
    {
        topLeft: { x: 158, y: 671 },
        bottomRight: { x: 305, y: 794 },
        debugColor: '#FF0000',
    },

    // Casa verde larga - Nivel #2
    {
        topLeft: { x: 669, y: 24 },
        bottomRight: { x: 876, y: 139 },
        debugColor: '#FF0000',
    },

    // GYM 
    {
        topLeft: { x: 659, y: 290 },
        bottomRight: { x: 869, y: 433 },
        debugColor: '#FF0000',
    },

    // SHOP
    {
        topLeft: { x: 1068, y: 125 },
        bottomRight: { x: 1222, y: 234 },
        debugColor: '#FF0000',
    },

    // Casa morada larga - Nivel #3
    {
        topLeft: { x: 1033, y: 507 },
        bottomRight: { x: 1236, y: 636 },
        debugColor: '#FF0000',
    },

    // Casa verde pequeña
    {
        topLeft: { x: 680, y: 594 },
        bottomRight: { x: 827, y: 755 },
        debugColor: '#FF0000',
    },
];

export const COLLISION_AREAS: CollisionArea[] = SIMPLE_COLLISION_AREAS.map(createRectangle);